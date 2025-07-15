import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { Book } from '../types/Book';
import { OnboardBookReqBody } from '../types/OnboardBookReqBody';

type SQL = NeonQueryFunction<false, false>;

const getBooksFirstPage = async (sql: SQL, size: number): Promise<Book[]> => {
    const books = await sql`
        SELECT 
            id,
            title,
            authors,
            isbn10,
            isbn13,
            count,
            borrowed_count as "borrowedCount"
        FROM books 
        ORDER BY id 
        LIMIT ${size}
    `;
    return books as Book[];
};

const getBooksAfterCursor = async (sql: NeonQueryFunction<false, false>, size: number, lastSeenId: string): Promise<Book[]> => {
    const books = await sql`
        SELECT 
            id,
            title,
            authors,
            isbn10,
            isbn13,
            count,
            borrowed_count as "borrowedCount"
        FROM books 
        WHERE id > ${parseInt(lastSeenId)}
        ORDER BY id 
        LIMIT ${size}
    `;
    return books as Book[];
};

export const getBooks = async (size: number, lastSeenId?: string): Promise<Book[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);

    return lastSeenId
        ? await getBooksAfterCursor(sql, size, lastSeenId)
        : await getBooksFirstPage(sql, size);
}

const findExistingBookId = async (sql: SQL, isbn10?: string, isbn13?: string): Promise<number | undefined> => {
    const query = isbn10 ?
        sql`SELECT id FROM books WHERE isbn10 = ${isbn10} LIMIT 1` :
        sql`SELECT id FROM books WHERE isbn13 = ${isbn13} LIMIT 1`;

    const rows = await query;
    return rows[0]?.id;
}

const createBook = async (sql: SQL, req: OnboardBookReqBody): Promise<number> => {
    const { title, authors, isbn10, isbn13 } = req;
    const result = await sql`
        INSERT INTO books (title, authors, isbn10, isbn13)
        VALUES (${title}, ${authors}, ${isbn10}, ${isbn13})
        RETURNING id
    `;
    return result[0].id;
}

const addCopies = async (sql: SQL, bookId: number, copies: string[]) => {
    for (const copy of copies) {
        await sql`
            INSERT INTO book_copies (book_id, qr_code)
            VALUES (${bookId}, ${copy})
            ON CONFLICT (qr_code) DO NOTHING
        `;
    }
    if (copies.length > 0) {
        await sql`
            UPDATE books 
            SET count = count + ${copies.length} 
            WHERE id = ${bookId}
        `;
    }
}

export const onboardBook = async (req: OnboardBookReqBody) => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const existingBookId = await findExistingBookId(sql, req.isbn10, req.isbn13);
    const bookId = existingBookId ?? await createBook(sql, req);

    await addCopies(sql, bookId, req.copies);
}
