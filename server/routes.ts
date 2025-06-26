// server/routes.ts
import { Express, Router } from "express";
import { db } from "./db";
import { triviaQuestions } from "@shared/schema";

export async function registerRoutes(app: Express) {
  const router = Router();

  // GET /api/trivia/questions
  router.get("/api/trivia/questions", async (_req, res, next) => {
    try {
      const questions = await db.select().from(triviaQuestions);
      res.json(questions);
    } catch (err) {
      next(err);
    }
  });

  app.use(router);
  return app;
}
