import { pgTable, serial, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    hash: text("hash").notNull(),
    role: text("role").notNull().default("user"),
});

//if id is integer userid should also be integer postgres doesnot allow fk dependency to be different
// uuids are better than serial id
export const refreshToken = pgTable("refrest_token", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: integer("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    tokenHash: text("token_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    revokedAt: timestamp("revoked_at"),
});