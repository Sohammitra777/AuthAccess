import { hash } from "argon2";
import db from "../../core/drizzle/db";
import { users } from "../../core/drizzle/schema/schema";
import { User } from "./admin.types";
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

    findById: async (id: string) => {
        return await db
            .select({
                id: users.id,
                email: users.email,
                role: users.role,
            })
            .from(users)
            .where(eq(users.id, id));
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

    createUser: async (adminUser: Omit<User, "id">) => {
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

    updateUser: async (id: string, adminUser: Pick<User, "email" | "role">) => {
        return await db
            .update(users)
            .set({
                email: adminUser.email,
                role: adminUser.role,
            })
            .where(eq(users.id, id))
            .returning({
                id: users.id,
                email: users.email,
                role: users.role,
            });
    },

    deleteUser: async (id: string) => {
        return await db.delete(users).where(eq(users.id, id)).returning({
            email: users.email,
            role: users.role,
        });
    },
};

export default adminRepo;
