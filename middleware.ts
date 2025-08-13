import { NextRequest, NextResponse } from 'next/server';
import { getLoggedInUser } from './db/user';

export async function middleware(request: NextRequest) {
    // Only apply middleware to API routes, excluding auth routes
    if (request.nextUrl.pathname.startsWith('/api/') &&
        !request.nextUrl.pathname.startsWith('/api/auth/')) {

        try {
            const loggedInUser = await getLoggedInUser();
            if (!loggedInUser) {
                console.log(`[Middleware] Unauthorized access attempt to: ${request.nextUrl.pathname}`);
                return NextResponse.json(
                    { error: 'Unauthorized - Please log in to access this resource' },
                    { status: 401 }
                );
            }

            console.log(`[Middleware] Authorized access to: ${request.nextUrl.pathname} by user: ${loggedInUser.email}`);

            // Create a new request with user information in headers
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', loggedInUser.id.toString());
            requestHeaders.set('x-user-email', loggedInUser.email);
            requestHeaders.set('x-user-name', loggedInUser.name);
            requestHeaders.set('x-user-is-admin', loggedInUser.isAdmin.toString());

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                }
            });
        } catch (error) {
            console.error('[Middleware] Error checking authentication:', error);
            return NextResponse.json(
                { error: 'Authentication error' },
                { status: 500 }
            );
        }
    }

    // For non-API routes or auth routes, proceed normally
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        // Match all API routes except auth
        '/api/((?!auth).*)',
    ]
};
