import { borrowBook } from "../../../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../../../db/user";

export const POST = async (req: Request) => {
    const { barcode } = await req.json();
    const user = await getLoggedInUser();
    if (!user) {
        return new Response(JSON.stringify({ message: "User not logged in" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    if (!user.isAdmin) {
        return new Response(JSON.stringify({ message: "Unauthorized action" }), {
            status: 403,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    try {
        await borrowBook(user.id, barcode);
        return new Response(JSON.stringify({ message: "Borrowed book successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error borrowing book:", error);
        return new Response(JSON.stringify({ message: "Failed to borrow book" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}