import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import projectsRouter from "./projects";
import newsRouter from "./news";
import servicesRouter from "./services";
import partnersRouter from "./partners";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(projectsRouter);
router.use(newsRouter);
router.use(servicesRouter);
router.use(partnersRouter);
router.use(settingsRouter);

export default router;
