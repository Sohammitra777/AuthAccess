import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { refreshToken } from "../drizzle/schema/schema";
import authUtils from "./auth.utils";

const authRepoTransaction = {
    replaceUserRefreshTokenForLogin: async (
        refreshTokenHash: string,
        userId: string,
        expiresAt: Date
    ) => {
        await db.transaction(async (tx) => {
            await tx
                .delete(refreshToken)
                .where(eq(refreshToken.userId, userId));
            await tx.insert(refreshToken).values({
                userId: userId,
                tokenHash: refreshTokenHash,
                expiresAt,
            });
        });
    },

    rotateRefreshToken: async (token: { id: string; userId: string }) => {
        return await db.transaction(async (tx) => {
            await tx.delete(refreshToken).where(eq(refreshToken.id, token.id));

            const newRefreshToken = authUtils.createRefreshToken();
            const newRefreshTokenHash =
                authUtils.hashRefreshToken(newRefreshToken);

            const refreshTokenExpiresAt = authUtils.refreshTokenExpiry();
            await tx.insert(refreshToken).values({
                userId: token.userId,
                tokenHash: newRefreshTokenHash,
                expiresAt: refreshTokenExpiresAt,
            });

            return { newRefreshToken };
        });
    },
};

export default authRepoTransaction;
