import { NextRequest } from 'next/server';
import { loadBooksWithSearch } from "../../action";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
    const startTime = Date.now();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return Response.json(
            { error: 'Unauthorized - Please log in to access this resource' },
            { status: 401 }
        );
    }

    // Get user information for logging (optional, since this doesn't require user-specific data)
    const userContext = user ? ` by user ${user.email}` : '';

    console.log(`[API] GET /api/books - Request started${userContext}`);

    try {
        // Use Next.js 15 searchParams API
        const searchParams = request.nextUrl.searchParams;
        const lastSeenId = searchParams.get("lastSeenId");
        const searchQuery = searchParams.get("search") || '';
        const sizeParam = searchParams.get("size");

        // Validate and parse size parameter
        const size = sizeParam ? parseInt(sizeParam) : 20;
        if (isNaN(size) || size <= 0) {
            console.log(`[API] GET /api/books - Invalid size parameter: ${sizeParam}`);
            return Response.json(
                { error: "Size must be a positive number" },
                { status: 400 }
            );
        }

        if (size > 100) {
            console.log(`[API] GET /api/books - Size too large: ${size}`);
            return Response.json(
                { error: "Size cannot exceed 100 items" },
                { status: 400 }
            );
        }

        // Decode search query
        const decodedSearchQuery = decodeURIComponent(searchQuery);

        console.log(`[API] GET /api/books - Parameters: search="${decodedSearchQuery}", size=${size}, lastSeenId=${lastSeenId}`);

        // Use cached server action instead of direct DB call
        const books = await loadBooksWithSearch(decodedSearchQuery, lastSeenId || undefined, size);

        const duration = Date.now() - startTime;
        console.log(`[API] GET /api/books - Success: ${books.length} books returned in ${duration}ms${userContext}`);

        return Response.json(books, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
            },
        });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[API] GET /api/books - Error after ${duration}ms:`, error);

        return Response.json(
            { error: "Internal Server Error", message: "Failed to fetch books" },
            { status: 500 }
        );
    }
}
