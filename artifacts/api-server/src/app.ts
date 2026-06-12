import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import router from "./routes";
import { logger } from "./lib/logger";
import { authMiddleware } from "./middlewares/authMiddleware";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(authMiddleware);

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  const frontendDistPath =
    process.env.FRONTEND_DIST_PATH ??
    path.resolve(process.cwd(), "artifacts/pilimpiku/dist/public");

  if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(frontendDistPath, "index.html"));
    });
    logger.info({ frontendDistPath }, "Serving frontend static files");
  } else {
    logger.warn(
      { frontendDistPath },
      "Frontend dist not found — frontend will not be served by the API",
    );
  }
}

export default app;
