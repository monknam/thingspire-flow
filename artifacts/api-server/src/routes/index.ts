import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import departmentsRouter from "./departments.js";
import usersRouter from "./users.js";
import surveysRouter from "./surveys.js";
import questionsRouter from "./questions.js";
import responsesRouter from "./responses.js";
import dashboardRouter from "./dashboard.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/departments", departmentsRouter);
router.use("/users", usersRouter);
router.use("/surveys", surveysRouter);
router.use("/sections/:sectionId/questions", questionsRouter);
router.use("/responses", responsesRouter);
router.use("/dashboard", dashboardRouter);

export default router;
