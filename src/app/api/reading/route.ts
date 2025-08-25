import { authOptions, User } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { getBorrowedBooks } from "../../../../db/borrowedBooks";

export async function GET() {
    const startTime = Date.now();
    console.log(`[API] GET /api/reading - Request started`);
    const session = await getServerSession(authOptions);
    const user = session?.user as User | undefined;

    if (!user) {
        return Response.json(
            { error: 'Unauthorized - Please log in to access this resource' },
            { status: 401 }
        );
    }


    try {
        // Get user information from middleware headers (more efficient)
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
