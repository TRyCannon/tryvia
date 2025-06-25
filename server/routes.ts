import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all trivia questions
  app.get("/api/trivia/questions", async (req, res) => {
    try {
      const questions = await storage.getAllTriviaQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trivia questions" });
    }
  });

  // Get a specific trivia question
  app.get("/api/trivia/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid question ID" });
      }

      const question = await storage.getTriviaQuestion(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trivia question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
