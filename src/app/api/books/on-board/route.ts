import { NextRequest } from "next/server";
import { onboardBook } from "../../../../../db/books";
import { invalidateBooksCache } from "../../../action";

const createForbiddenResponse = (message: string) => {
    return new Response(
        JSON.stringify({ error: `Forbidden ${message}`, message }),
        { status: 403 }
    );
}

export const POST = async (req: NextRequest) => {
    const startTime = Date.now();
    console.log(`[API] POST /api/books/on-board - Request started`);

    try {
        // Require admin user for book onboarding
        // const user = requireAdminUser(req.headers);

        const data = await req.json();
        const { title, authors, isbn10, isbn13, copies } = data;

        await onboardBook({ title, authors, isbn10, isbn13, copies });

        // Invalidate cache after successful book onboarding
        await invalidateBooksCache();

        // const duration = Date.now() - startTime;
        // console.log(`[API] POST /api/books/on-board - Success: Book "${title}" onboarded by ${user.email} in ${duration}ms`);

        return Response.json(
            { message: "Book onboarded successfully" },
            { status: 200 }
        );

    } catch (error) {
        const duration = Date.now() - startTime;

        // Handle admin access errors specifically
        if (error instanceof Error && error.message.includes('Access denied')) {
            console.log(`[API] POST /api/books/on-board - ${error.message} in ${duration}ms`);
            return createForbiddenResponse("Only administrators can onboard books");
        }

        console.error(`[API] POST /api/books/on-board - Error after ${duration}ms:`, error);

        return Response.json(
            { error: "Internal Server Error", message: "Failed to onboard book" },
            { status: 500 }
        );
    }
}