# STEP Library

A webapp to manage STEP library.

## Development
This app is built using nextjs. Follow below sets for local setup.

- Clone this repository
- Install dependencies using `npm i`
- Copy `.env.example` to `.env.local` and fill in the required environment variables
- Run development server using `npm run dev`
- Build production app using `npm run build`
- Run production app using `npm start`

## Environment Variables

The following environment variables are required:

- `NEXTAUTH_SECRET`: Secret key for NextAuth.js JWT signing
- `NEXTAUTH_URL`: The canonical URL of your site
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `DATABASE_URL`: Database connection string

## Authentication & Authorization

This application uses NextAuth.js for authentication with Google OAuth. A middleware is implemented to protect all API routes (except authentication routes) and ensures only logged-in users can access the API endpoints.

### Protected Routes
- All `/api/*` routes except `/api/auth/*`
- Middleware automatically returns 401 Unauthorized for unauthenticated requests

### User Information Injection

The middleware fetches user information once and injects it into request headers for efficient access in route handlers:

```typescript
// In route handlers, get user info from middleware headers
import { requireUserFromHeaders } from "../../../utils/userHeaders";

export async function GET(request: NextRequest) {
    const user = requireUserFromHeaders(request.headers);
    // user object contains: { id, name, email, isAdmin }
}
```

### Admin-Only Routes

For routes requiring admin privileges:

```typescript
import { requireAdminUser, createForbiddenResponse } from "../../../utils/adminAuth";

export async function POST(request: NextRequest) {
    try {
        const adminUser = requireAdminUser(request.headers);
        // Proceed with admin-only logic
    } catch (error) {
        return createForbiddenResponse("Admin access required");
    }
}
```

### Available Utilities

- `getUserFromHeaders(headers)`: Get user info (returns null if not found)
- `requireUserFromHeaders(headers)`: Get user info (throws if not found)
- `requireAdminUser(headers)`: Get admin user (throws if not admin)
- `isAdminUser(headers)`: Check if user is admin (boolean)
- `createForbiddenResponse(message)`: Create standardized 403 response
