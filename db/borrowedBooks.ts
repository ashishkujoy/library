import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { BorrowedBook } from '../types/BorrowedBook';

const getBorrowedBooksFirstPage = async (sql: NeonQueryFunction<false, false>, size: number): Promise<BorrowedBook[]> => {
    // For demo purposes, let's create some mock data
    // In a real application, you would have a borrowings table with foreign keys to books and users
    const books = await sql`
        SELECT 
            id,
            title,
            authors,
            isbn10,
            isbn13,
            -- Mock borrowed date (random dates in the past 6 months)
            (CURRENT_DATE - INTERVAL '1 day' * (RANDOM() * 180)::int) as borrowed_date,
            -- Mock due date (2 weeks from borrowed date)
            (CURRENT_DATE - INTERVAL '1 day' * (RANDOM() * 180)::int + INTERVAL '14 days') as due_date
        FROM books 
        WHERE borrowed_count > 0
        ORDER BY id 
        LIMIT ${size}
    `;
    
    return books.map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        isbn10: book.isbn10,
        isbn13: book.isbn13,
        borrowedDate: book.borrowed_date,
        dueDate: book.due_date,
    })) as BorrowedBook[];
};

const getBorrowedBooksAfterCursor = async (sql: NeonQueryFunction<false, false>, size: number, lastSeenId: string): Promise<BorrowedBook[]> => {
    const books = await sql`
        SELECT 
            id,
            title,
            authors,
            isbn10,
            isbn13,
            -- Mock borrowed date (random dates in the past 6 months)
            (CURRENT_DATE - INTERVAL '1 day' * (RANDOM() * 180)::int) as borrowed_date,
            -- Mock due date (2 weeks from borrowed date)
            (CURRENT_DATE - INTERVAL '1 day' * (RANDOM() * 180)::int + INTERVAL '14 days') as due_date
        FROM books 
        WHERE id > ${parseInt(lastSeenId)} AND borrowed_count > 0
        ORDER BY id 
        LIMIT ${size}
    `;
    
    return books.map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        isbn10: book.isbn10,
        isbn13: book.isbn13,
        borrowedDate: book.borrowed_date,
        dueDate: book.due_date,
    })) as BorrowedBook[];
};

const getBorrowedBooks = async (size: number, lastSeenId?: string): Promise<BorrowedBook[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    return lastSeenId 
        ? await getBorrowedBooksAfterCursor(sql, size, lastSeenId)
        : await getBorrowedBooksFirstPage(sql, size);
}

export { getBorrowedBooks };
