// server/routes.ts

import { Express, Router } from "express";
import { db } from "./db";
import { triviaQuestions } from "@shared/schema"; // adjust this path if your schema lives elsewhere

/**
 * Register all your API routes onto the incoming Express `app`,
 * then return the HTTP server instance (so your index.ts can listen on it).
 */
export async function registerRoutes(app: Express) {
  const router = Router();

  // GET /api/trivia/questions
  router.get("/api/trivia/questions", async (_req, res, next) => {
    try {
      // Pull all questions from the `triviaQuestions` table
      const questions = await db.select().from(triviaQuestions);
      res.json(questions);
    } catch (err) {
      next(err);
    }
  });

  // TODO: add other API routes here, e.g. POST /api/trivia/answer, etc.

  app.use(router);

  // If your setupVite needs the raw HTTP server, you might be creating it here.
  // If registerRoutes should return the Express `app`, change your index.ts accordingly.
  return app;
}
