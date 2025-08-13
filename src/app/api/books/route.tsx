import { loadBooksWithSearch } from "../../action";

const extractQueries = (url: string) => {
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const lastSeenId = searchParams.get("lastSeenId");
    const searchQuery = searchParams.get("search") || '';

    return {
        lastSeenId: lastSeenId !== null ? lastSeenId : undefined,
        size: parseInt(searchParams.get("size") || "20"),
        searchQuery: decodeURIComponent(searchQuery)
    }
}

export const GET = async (request: Request) => {
    const { lastSeenId, size, searchQuery } = extractQueries(request.url);
    
    try {
        // Use cached server action instead of direct DB call
        const books = await loadBooksWithSearch(searchQuery, lastSeenId, size);
        
        return new Response(JSON.stringify(books), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
            },
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}