import { getBorrowedBooks } from "../../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../../db/user";

export const GET = async () => {
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
        const books = await getBorrowedBooks(user.id);
        return new Response(JSON.stringify(books), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching borrowed books:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch borrowed books" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
