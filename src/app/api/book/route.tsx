import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { Book } from "../../../../types/Book";

type SQL = NeonQueryFunction<false, false>;

const findBookByIsbn = async (sql: SQL, isbn: string): Promise<Book> => {
    const rows = await sql`SELECT * FROM books WHERE isbn10 = ${isbn} OR isbn13 = ${isbn} LIMIT 1`;
    if (rows.length === 0) {
        throw new Error("Book not found");
    }
    console.log("Book found:", rows[0]);
    return {
        id: rows[0].id,
        title: rows[0].title,
        authors: rows[0].authors,
        isbn10: rows[0].isbn10,
        isbn13: rows[0].isbn13,
        borrowedCount: 0,
        count: 0,
    }
}

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const barcode = searchParams.get("barcode");
    if (!barcode) {
        return new Response("Barcode query parameter is required", { status: 400 });
    }
    const sql = neon(`${process.env.DATABASE_URL}`);
    try {
        const book = await findBookByIsbn(sql, barcode);
        return new Response(JSON.stringify(book), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching book by ISBN:", error);
        return new Response("Book Not found", { status: 404 });
    }
}