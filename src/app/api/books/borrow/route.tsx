import { borrowBook } from "../../../../../db/borrowedBooks";
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
    console.log("Borrowing book for user:", user.name, "with barcode:", barcode);

    try {
        const result = await borrowBook(user.id, barcode);
        if (!result.success) {
            console.error("Failed to borrow book:", result.message);
            return new Response(JSON.stringify({ message: result.message }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        
        // Invalidate cache after successful borrow operation
        await invalidateBooksCache();
        
        console.log("Book borrowed successfully for user:", user.name, "with barcode:", barcode);
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