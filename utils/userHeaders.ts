import { User } from "../types/User";

/**
 * Extract user information from request headers set by middleware
 * This is more efficient than calling getLoggedInUser() again in route handlers
 */
export function getUserFromHeaders(headers: Headers): User | null {
    const userId = headers.get('x-user-id');
    const userEmail = headers.get('x-user-email');
    const userName = headers.get('x-user-name');
    const userIsAdmin = headers.get('x-user-is-admin');

    if (!userId || !userEmail || !userName || userIsAdmin === null) {
        return null;
    }

    return {
        id: parseInt(userId),
        name: userName,
        email: userEmail,
        isAdmin: userIsAdmin === 'true',
    };
}

/**
 * Alternative: Get user from middleware headers with error handling
 */
export function requireUserFromHeaders(headers: Headers): User {
    const user = getUserFromHeaders(headers);
    if (!user) {
        throw new Error('User information not found in request headers');
    }
    return user;
}
