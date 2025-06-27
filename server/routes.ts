// server/routes.ts
import { Express, Router } from "express";
import { db } from "./db";
import { triviaQuestions } from "@shared/schema";

// Simple shuffle function using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export async function registerRoutes(app: Express) {
  const router = Router();

  // GET /api/trivia/questions
  router.get("/api/trivia/questions", async (_req, res, next) => {
    try {
      const questions = await db.select().from(triviaQuestions);
      const shuffled = shuffleArray(questions);
      res.json(shuffled);
    } catch (err) {
      next(err);
    }
  });

  app.use(router);
  return app;
}
