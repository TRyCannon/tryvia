// server/seed.ts
import { db } from "./db";
import { triviaQuestions } from "@shared/schema";

async function seed() {
  await db.insert(triviaQuestions).values(
    {
      category: "math",
      question: "What is 2+2?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 3,       // <-- use correctAnswer, not correct_answer
      explanation: "Because 2 + 2 equals 4.",
      funFact: "Addition is the foundation of all arithmetic." // <-- use funFact
    },
    {
      category: "geography",
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "Berlin"],
      correctAnswer: 0,
      explanation: "Paris has been France’s capital since 508 A.D.",
      funFact: "The Eiffel Tower was built for the 1889 World's Fair."
    }
  );
  console.log("✅ Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
