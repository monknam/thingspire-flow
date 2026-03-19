import { Router } from "express";
import { db, surveyQuestionsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const questions = await db
    .select()
    .from(surveyQuestionsTable)
    .where(eq(surveyQuestionsTable.surveySectionId, req.params.sectionId))
    .orderBy(asc(surveyQuestionsTable.sortOrder));

  res.json(questions.map((q) => ({
    id: q.id,
    surveySectionId: q.surveySectionId,
    questionNo: q.questionNo,
    questionText: q.questionText,
    questionType: q.questionType,
    isRequired: q.isRequired,
    sortOrder: q.sortOrder,
    isActive: q.isActive,
    createdAt: q.createdAt,
  })));
});

router.post("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { questionNo, questionText, questionType, isRequired, sortOrder } = req.body;
  if (!questionText || !questionType) return res.status(400).json({ error: "questionText and questionType required" });

  const [q] = await db
    .insert(surveyQuestionsTable)
    .values({
      surveySectionId: req.params.sectionId,
      questionNo: questionNo ? parseInt(questionNo) : null,
      questionText,
      questionType: questionType || "likert_5",
      isRequired: isRequired !== false,
      sortOrder: sortOrder || 1,
    })
    .returning();

  res.status(201).json({
    id: q.id,
    surveySectionId: q.surveySectionId,
    questionNo: q.questionNo,
    questionText: q.questionText,
    questionType: q.questionType,
    isRequired: q.isRequired,
    sortOrder: q.sortOrder,
    isActive: q.isActive,
    createdAt: q.createdAt,
  });
});

export default router;
