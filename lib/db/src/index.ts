import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL;

if (!connectionString) {
  console.error(
    "[db] No database URL found (DATABASE_URL or RAILWAY_DATABASE_URL) — database queries will fail.",
  );
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export * from "./schema";
