import { hash } from "argon2";
import db from "../../drizzle/db";
import { users } from "../../drizzle/schema/schema";
import { User } from "./admin.type";
import { eq } from "drizzle-orm";

const adminRepo = {
    getUsers: async () => {
        return await db
            .select({
                id: users.id,
                email: users.email,
                role: users.role,
            })
            .from(users);
    },

    findByEmail: async (email: string) => {
        return await db
            .select({
                id: users.id,
                email: users.email,
                role: users.role,
            })
            .from(users)
            .where(eq(users.email, email));
    },

    createUser: async (adminUser: User) => {
        const adminUserHash = await hash(adminUser.password);
        return await db
            .insert(users)
            .values({
                email: adminUser.email,
                hash: adminUserHash,
                role: adminUser.role,
            })
            .returning({
                id: users.id,
                email: users.email,
                role: users.role,
            });
    },
};

export default adminRepo;
