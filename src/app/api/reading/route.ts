import { NextRequest } from "next/server";
import { getBorrowedBooks } from "../../../../db/borrowedBooks";
import { requireUserFromHeaders } from "../../../../utils/userHeaders";

export async function GET(request: NextRequest) {
    const startTime = Date.now();
    console.log(`[API] GET /api/reading - Request started`);
    
    try {
        // Get user information from middleware headers (more efficient)
        const user = requireUserFromHeaders(request.headers);
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
