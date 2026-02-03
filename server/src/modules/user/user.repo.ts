import { eq } from "drizzle-orm";
import db from "../../core/drizzle/db";
import { refreshToken, users } from "../../core/drizzle/schema/schema";

const userRepo = {
    createUser: async (email: string, hash: string, role: string) => {
        await db.insert(users).values({
            email,
            hash,
            role,
        });
    },

    checkUserByEmail: async (email: string) => {
        return await db.select().from(users).where(eq(users.email, email));
    },

    checkUserbyId: async (userId: string) => {
        return await db.select().from(users).where(eq(users.id, userId));
    },

    deleteUserById: async (userId: string) => {
        await db.delete(users).where(eq(users.id, userId));
    },

    checkRefreshToken: async (userId: string) => {
        return await db
            .select()
            .from(refreshToken)
            .where(eq(refreshToken.userId, userId));
    },

    removeRefreshToken: async (userId: string) => {
        await db.delete(refreshToken).where(eq(refreshToken.userId, userId));
    },

    deleteAllUsers: async () => {
        await db.delete(users);
    },
};

export default userRepo;
