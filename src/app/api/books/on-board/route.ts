import { onboardBook } from "../../../../../db/books";
import { invalidateBooksCache } from "../../../action";

export const POST = async (req: Request) => {
    const data = await req.json();
    const { title, authors, isbn10, isbn13, copies } = data;
    try {
        await onboardBook({ title, authors, isbn10, isbn13, copies });
        
        // Invalidate cache after successful book onboarding
        await invalidateBooksCache();
        
        return new Response(JSON.stringify({ message: "Book onboarded successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error onboarding book:", error);
        return new Response(JSON.stringify({ message: "Failed to onboard book" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}