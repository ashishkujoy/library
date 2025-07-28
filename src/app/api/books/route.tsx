import { getBooks } from "../../../../db/books";

const extractQueries = (url: string) => {
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const lastSeenId = searchParams.get("lastSeenId");
    const searchQuery = searchParams.get("search") || '';

    return {
        lastSeenId: lastSeenId !== null ? parseInt(lastSeenId) : undefined,
        size: parseInt(searchParams.get("size") || "20"),
        searchQuery: decodeURIComponent(searchQuery)
    }
}

export const GET = async (request: Request) => {
    const { lastSeenId, size, searchQuery } = extractQueries(request.url);
    try {
        const books = await getBooks(searchQuery, size, lastSeenId?.toString());
        return new Response(JSON.stringify(books), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}