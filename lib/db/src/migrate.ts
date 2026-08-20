import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

export async function runMigrations() {
  const connectionString =
    process.env.DATABASE_URL || process.env.RAILWAY_DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL or RAILWAY_DATABASE_URL must be set before running migrations.",
    );
  }

  const pool = new pg.Pool({ connectionString });
  const db = drizzle(pool);

  const migrationsFolder =
    process.env.MIGRATIONS_PATH ??
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "migrations");

  process.stdout.write(`[migrate] Running migrations from: ${migrationsFolder}\n`);
  await migrate(db, { migrationsFolder });
  process.stdout.write("[migrate] Migrations complete.\n");

  await pool.end();
}
