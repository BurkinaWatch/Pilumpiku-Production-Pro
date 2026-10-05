import http from "http";
import app from "./app";
import { logger } from "./lib/logger";
import { runMigrations } from "@workspace/db/migrate";
import {
  contentTranslationsTable,
  db,
  newsTable,
  partnersTable,
  pool,
  projectsTable,
  servicesTable,
  siteSettingsTable,
} from "@workspace/db";
import { seed } from "./seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = http.createServer(app);

async function seedIfDatabaseIsEmpty() {
  const existingRows = await Promise.all([
    db.select({ id: projectsTable.id }).from(projectsTable).limit(1),
    db.select({ id: newsTable.id }).from(newsTable).limit(1),
    db.select({ id: servicesTable.id }).from(servicesTable).limit(1),
    db.select({ id: partnersTable.id }).from(partnersTable).limit(1),
    db.select({ id: siteSettingsTable.id }).from(siteSettingsTable).limit(1),
    db
      .select({ id: contentTranslationsTable.id })
      .from(contentTranslationsTable)
      .limit(1),
  ]);

  if (existingRows.some((rows) => rows.length > 0)) {
    logger.info(
      "Startup seed skipped because content already exists; run the seed command manually to reset sample content.",
    );
    return;
  }

  await seed();
}

async function shutdown(signal: string) {
  logger.info({ signal }, "Shutdown signal received, closing gracefully");
  server.close(async () => {
    try {
      await pool.end();
      logger.info("Database pool closed");
    } catch (err) {
      logger.error({ err }, "Error closing database pool");
    }
    process.exit(0);
  });
  setTimeout(() => {
    logger.warn("Graceful shutdown timed out, forcing exit");
    process.exit(1);
  }, 10_000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

async function main() {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, () => {
      server.removeListener("error", reject);
      logger.info({ port }, "Server listening");
      resolve();
    });
  });

  try {
    await runMigrations();
  } catch (err) {
    logger.error({ err }, "Database migration failed");
    process.exit(1);
  }

  try {
    await seedIfDatabaseIsEmpty();
  } catch (err) {
    logger.error({ err }, "Database seed failed");
    process.exit(1);
  }

  logger.info("Server ready");
}

main().catch((err) => {
  logger.error({ err }, "Fatal error during startup");
  process.exit(1);
});
