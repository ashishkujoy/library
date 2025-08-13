import { returnBook } from "../../../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../../../db/user";
import { invalidateBooksCache } from "../../../action";

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

    try {
        // Assuming returnBook is a function that handles the logic of returning a book
        await returnBook(user.id, barcode);
        
        // Invalidate cache after successful return operation
        await invalidateBooksCache();
        
        return new Response(JSON.stringify({ message: "Returned book successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error returning book:", error);
        return new Response(JSON.stringify({ message: "Failed to return book" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
