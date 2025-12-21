import { config } from "dotenv";
import z from "zod";
config()

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string().transform(Number),

    DATABASE_URL: z.url(),

    JWT_ACCESS_SECRET: z.string().min(24),
    JWT_REFREST_SECRET: z.string().min(24),

    ACCESS_TOKEN_EXPIRES_IN: z.string(),
    REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid enviornment variable", parsed.error.issues) ;
    process.exit(1);
} 
if(parsed.data.NODE_ENV === "development") {
    console.log("env active, continue...");
    console.log(parsed.data)
}

const env = parsed.data;
export default env;
