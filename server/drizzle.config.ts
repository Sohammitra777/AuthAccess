import { defineConfig } from "drizzle-kit";
import env from "./src/core/config/env";

export default defineConfig({
    schema: "./src/core/drizzle/schema",
    out: "./src/core/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
