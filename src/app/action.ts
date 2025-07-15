"use server";
import { neon } from "@neondatabase/serverless";
import { Book } from "@/types/Book";

export const loadBooks = async (): Promise<Book[]> => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const rows = await sql`SELECT * FROM books ORDER BY id ASC LIMIT 20`;

    return rows.map(row => ({
        id: row.id,
        title: row.title,
        authors: row.authors,
        isbn10: row.isbn10,
        isbn13: row.isbn13,
        count: row.count,
        borrowedCount: row.borrowed_count,
    }));
}