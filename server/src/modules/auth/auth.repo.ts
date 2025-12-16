import { eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { users } from "../../drizzle/schema/schema";
import authUtils from "./auth.utils";

const authRepo = {
    checkUserExist: async (email: string) => {
        return await db.select().from(users).where(eq(users.email, email));
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
};

export default authRepo;
