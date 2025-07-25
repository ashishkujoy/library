import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"
import { User } from "../types/User";
import { neon } from "@neondatabase/serverless";

export const getLoggedInUser = async (): Promise<User | null> => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
        SELECT id, name, email, is_admin as "isAdmin" 
        FROM library_users 
        WHERE email = ${session.user.email} LIMIT 1;
    `;
    if (user.length === 0) {
        return null;
    }
    return {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
    };
}

export const checkUserExists = async (email: string): Promise<boolean> => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
        SELECT id FROM library_users WHERE email = ${email} LIMIT 1;
    `;
    return user.length > 0;
}

export const checkIsUserAdmin = async (email: string): Promise<boolean> => {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
        SELECT is_admin FROM library_users WHERE email = ${email} AND is_admin = true LIMIT 1;
    `;
    return user.length > 0;
}