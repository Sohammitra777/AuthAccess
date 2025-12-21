import { eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { refreshToken, users } from "../../drizzle/schema/schema";
import authUtils from "./auth.utils";

const authRepo = {
    checkUserExist: async (email: string) => {
        return await db.select().from(users).where(eq(users.email, email));
    },

    getUserById: async (userId: number) => {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));
        return result[0];
    },

    createNewUser: async (email: string, password: string) => {
        const hash = await authUtils.hashPassword(password);
        return await db
            .insert(users)
            .values({
                email,
                hash,
            })
            .returning({
                id: users.id,
                email: users.email,
                role: users.role,
            });
    },

    createRefreshToken: async (
        userId: number,
        tokenHash: string,
        expiresAt: Date
    ) => {
        await db.insert(refreshToken).values({
            userId,
            tokenHash,
            expiresAt,
        });
    },

    getAllRefreshToken: async () => {
        return await db.select().from(refreshToken);
    },

    deleteRefreshToken: async (id: string) => {
        await db.delete(refreshToken).where(eq(refreshToken.id, id));
    },
};

export default authRepo;
