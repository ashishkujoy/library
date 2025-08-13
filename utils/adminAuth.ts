import { User } from "../types/User";
import { requireUserFromHeaders } from "./userHeaders";

/**
 * Middleware helper to require admin access
 * Throws an error if user is not an admin
 */
export function requireAdminUser(headers: Headers): User {
    const user = requireUserFromHeaders(headers);
    
    if (!user.isAdmin) {
        throw new Error(`Access denied: User ${user.email} is not an administrator`);
    }
    
    return user;
}

/**
 * Check if the current user is admin without throwing
 */
export function isAdminUser(headers: Headers): boolean {
    try {
        const user = requireUserFromHeaders(headers);
        return user.isAdmin;
    } catch {
        return false;
    }
}

/**
 * Create a standardized 403 response for non-admin users
 */
export function createForbiddenResponse(message: string = "Access denied. Administrator privileges required.") {
    return Response.json(
        { error: "Forbidden", message },
        { status: 403 }
    );
}
