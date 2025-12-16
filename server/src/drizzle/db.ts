import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then((client) => {
        console.log("✅ Connected to Neon!");
        client.release();
    })
    .catch((err) => {
        console.error("❌ Connection failed:", err.message);
    });

const db = drizzle(pool);
export default db;
