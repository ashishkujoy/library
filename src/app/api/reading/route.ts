import { getBorrowedBooks } from "../../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../../db/user";

export async function GET() {
    const startTime = Date.now();
    console.log(`[API] GET /api/reading - Request started`);
    
    try {
        // Check user authentication
        const user = await getLoggedInUser();
        if (!user) {
            console.log(`[API] GET /api/reading - User not authenticated`);
            return Response.json(
                { error: "Authentication required", message: "User not logged in" },
                { status: 401 }
            );
        }
        
        console.log(`[API] GET /api/reading - User: ${user.name} (ID: ${user.id})`);
        
        // Fetch borrowed books for the user
        const borrowedBooks = await getBorrowedBooks(user.id);
        
        const duration = Date.now() - startTime;
        console.log(`[API] GET /api/reading - Success: ${borrowedBooks.length} borrowed books returned for ${user.name} in ${duration}ms`);
        
        return Response.json(borrowedBooks, {
            headers: {
                "Cache-Control": "private, no-cache", // Private data, don't cache
            },
        });
        
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[API] GET /api/reading - Error after ${duration}ms:`, error);
        
        return Response.json(
            { error: "Internal Server Error", message: "Failed to fetch borrowed books" },
            { status: 500 }
        );
    }
}
