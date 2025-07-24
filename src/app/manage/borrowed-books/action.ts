import { BorrowedBookWithUser } from '@/types/BorrowedBook';
import { neon } from '@neondatabase/serverless';

export const getAllBorrowedBooks = async (): Promise<BorrowedBookWithUser[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Optimized query with proper joins and indexes
    const rows = await sql`
        SELECT 
            bb.id,
            b.title,
            b.authors,
            bb.borrowed_at as "borrowedAt",
            u.name as "borrowerName",
            u.email as "borrowerEmail",
            bb.book_copy_id as "bookCopyId",
            bc.qr_code as "qrCode"
        FROM borrowed_books bb
        INNER JOIN book_copies bc ON bb.book_copy_id = bc.id
        INNER JOIN books b ON bc.book_id = b.id
        INNER JOIN library_users u ON bb.user_id = u.id
        WHERE bb.returned_at IS NULL
        ORDER BY bb.borrowed_at DESC;
    `;

    return rows.map(row => ({
        id: row.id,
        title: row.title,
        authors: row.authors,
        borrowedDate: row.borrowedAt,
        borrowerName: row.borrowerName,
        borrowerEmail: row.borrowerEmail,
        bookCopyId: row.bookCopyId,
        qrCode: row.qrCode
    }));
}