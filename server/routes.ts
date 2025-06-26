// server/routes.ts
import { Express, Router } from "express";
import { db } from "./db";
import { triviaQuestions } from "@shared/schema";

/**
 * Registers all API routes on the given Express app.
 * Returns the app so index.ts can call `.listen()` on it.
 */
export async function registerRoutes(app: Express) {
  const router = Router();

  // GET /api/trivia/questions  — returns all trivia questions
  router.get("/api/trivia/questions", async (_req, res, next) => {
    try {
      const questions = await db.select().from(triviaQuestions);
      return res.json(questions);
    } catch (err) {
      return next(err);
    }
  });

  // (You can add more routes here, e.g. POST to submit answers, etc.)

  app.use(router);
  return app; // your index.ts does server.listen(), and app.listen is valid
}
