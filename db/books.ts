import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { Book } from '../types/Book';

const getBooksFirstPage = async (sql: NeonQueryFunction<false, false>, size: number): Promise<Book[]> => {
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

const getBooks = async (size: number, lastSeenId?: string): Promise<Book[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    return lastSeenId 
        ? await getBooksAfterCursor(sql, size, lastSeenId)
        : await getBooksFirstPage(sql, size);
}

export { getBooks };