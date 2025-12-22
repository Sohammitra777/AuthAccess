import { eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { refreshToken, users } from "../../drizzle/schema/schema";
import authUtils from "./auth.utils";
import {
    RefreshTokenRepoResponse,
    UserRepoResponse,
} from "../../shared/shared.type";

const authRepo = {
    checkUserExist: async (email: string): Promise<Array<UserRepoResponse>> => {
        return await db.select().from(users).where(eq(users.email, email));
    },

    getUserById: async (userId: number): Promise<UserRepoResponse> => {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));
        return result[0];
    },

    createNewUser: async (
        email: string,
        password: string
    ): Promise<Omit<UserRepoResponse, "hash">> => {
        const hash = await authUtils.hashPassword(password);
        const result = await db
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
        return result[0];
    },

    createRefreshToken: async (
        userId: number,
        tokenHash: string,
        expiresAt: Date
    ): Promise<void> => {
        await db.insert(refreshToken).values({
            userId,
            tokenHash,
            expiresAt,
        });
    },

    getRefreshTokenByHash: async (
        hash: string
    ): Promise<RefreshTokenRepoResponse> => {
        const result = await db
            .select()
            .from(refreshToken)
            .where(eq(refreshToken.tokenHash, hash));
        return result[0];
    },

    deleteRefreshToken: async (token: string): Promise<void> => {
        await db.delete(refreshToken).where(eq(refreshToken.tokenHash, token));
    },
};

export default authRepo;
