import { returnBook } from "../../../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../../../db/user";

export const POST = async (req: Request) => {
    const { barcode } = await req.json();
    if (!barcode) {
        return new Response(JSON.stringify({ message: "Barcode is required" }), { status: 400 });
    }
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) {
        return new Response(JSON.stringify({ message: "User not logged in" }), { status: 401 });
    }
    try {
        const result = await returnBook(loggedInUser.id, barcode);
        if (!result) {
            return new Response(JSON.stringify({ message: "Failed to return book" }), { status: 500 });
        }
        return new Response(JSON.stringify({ message: "Book returned successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}