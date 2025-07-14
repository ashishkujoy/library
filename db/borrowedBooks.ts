import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { pool } from '../src/app/lib/db';
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

export const getBorrowedBooks = async (size: number, lastSeenId?: string): Promise<BorrowedBook[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);

    return lastSeenId
        ? await getBorrowedBooksAfterCursor(sql, size, lastSeenId)
        : await getBorrowedBooksFirstPage(sql, size);
}

export const checkBookCopyAvailability = async (qrCode: string): Promise<{ available: boolean; }> => {
    const sql = neon(`${process.env.DATABASE_URL}`);

    try {
        const result = await sql`
            SELECT bc.borrowed
            FROM book_copies bc
            WHERE bc.qr_code = ${qrCode}
            LIMIT 1
        `;

        if (result.length === 0) {
            return { available: false };
        }

        const bookCopy = result[0];
        return { available: !bookCopy.borrowed };
    } catch (error) {
        console.error('Error checking book copy availability:', error);
        return { available: false };
    }
};

type BorrowBookResponse = {
    success: boolean;
    message: string;
    borrowedBookId?: number;
}

export const borrowBook = async (userId: number, qrCode: string): Promise<BorrowBookResponse> => {
    const client = await pool.connect();

    try {
        // Start transaction
        await client.query('BEGIN');

        // 1. Check if the book copy exists and is not already borrowed
        const copyResult = await client.query(`
            SELECT bc.id, bc.book_id, bc.borrowed, b.title 
            FROM book_copies bc
            JOIN books b ON bc.book_id = b.id
            WHERE bc.qr_code = $1
        `, [qrCode]);

        if (copyResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return { success: false, message: 'Book copy not found' };
        }

        const bookCopy = copyResult.rows[0];

        if (bookCopy.borrowed) {
            await client.query('ROLLBACK');
            return { success: false, message: 'Book copy is already borrowed' };
        }

        // 2. Create entry in borrowed_books table
        const borrowResult = await client.query(`
            INSERT INTO borrowed_books (book_copy_id, user_id, borrowed_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            RETURNING id
        `, [bookCopy.id, userId]);

        const borrowedBookId = borrowResult.rows[0].id;

        // 3. Update book_copies table to mark as borrowed
        await client.query(`
            UPDATE book_copies 
            SET borrowed = TRUE 
            WHERE id = $1
        `, [bookCopy.id]);

        // 4. Update books table to increment borrowed_count
        await client.query(`
            UPDATE books 
            SET borrowed_count = borrowed_count + 1 
            WHERE id = $1
        `, [bookCopy.book_id]);

        // Commit transaction
        await client.query('COMMIT');

        return {
            success: true,
            message: `Successfully borrowed "${bookCopy.title}"`,
            borrowedBookId
        };

    } catch (error) {
        // Rollback transaction on error
        await client.query('ROLLBACK');
        console.error('Error borrowing book:', error);
        return {
            success: false,
            message: 'Failed to borrow book. Please try again.'
        };
    } finally {
        // Release the client back to the pool
        client.release();
    }
};
