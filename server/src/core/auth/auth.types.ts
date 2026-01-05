import { NodePgDatabase } from "drizzle-orm/node-postgres";
import db from "../drizzle/db";
import { PgTransaction } from "drizzle-orm/pg-core";

export type Role = "user" | "admin";

export type Data = {
    id: string;
    email: string;
    role: string;
    token: {
        accessToken: string;
        refreshToken: string;
    };
};

export type Refresh = {
    accessToken: string;
    newRefreshToken: string;
};

export type AuthFailureResponse = {
    error: string;
};

export type AuthSuccessResponse = {
    message: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
};

export type dbOrTx = 
  | NodePgDatabase<any>
  | PgTransaction<any, any, any>;
