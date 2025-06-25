import { users, type User, type InsertUser, triviaQuestions, type TriviaQuestion, type InsertTriviaQuestion } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllTriviaQuestions(): Promise<TriviaQuestion[]>;
  getTriviaQuestion(id: number): Promise<TriviaQuestion | undefined>;
  createTriviaQuestion(question: InsertTriviaQuestion): Promise<TriviaQuestion>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllTriviaQuestions(): Promise<TriviaQuestion[]> {
    return await db.select().from(triviaQuestions);
  }

  async getTriviaQuestion(id: number): Promise<TriviaQuestion | undefined> {
    const [question] = await db.select().from(triviaQuestions).where(eq(triviaQuestions.id, id));
    return question || undefined;
  }

  async createTriviaQuestion(insertQuestion: InsertTriviaQuestion): Promise<TriviaQuestion> {
    const [question] = await db
      .insert(triviaQuestions)
      .values(insertQuestion)
      .returning();
    return question;
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private triviaQuestions: Map<number, TriviaQuestion>;
  private currentUserId: number;
  private currentQuestionId: number;

  constructor() {
    this.users = new Map();
    this.triviaQuestions = new Map();
    this.currentUserId = 1;
    this.currentQuestionId = 1;
    
    // Initialize with sample trivia questions
    this.initializeTriviaQuestions();
  }

  private async initializeTriviaQuestions() {
    const sampleQuestions: InsertTriviaQuestion[] = [
      {
        category: "Geography",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
        explanation: "Paris has been the capital of France since 508 AD and is known as the 'City of Light'.",
        funFact: "Paris has more than 400 parks and gardens, making it one of the greenest capitals in Europe!"
      },
      {
        category: "Science",
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Silver", "Iron"],
        correctAnswer: "Oxygen",
        explanation: "Oxygen is essential for life and makes up about 21% of Earth's atmosphere.",
        funFact: "Oxygen was discovered independently by two scientists in the 1770s: Joseph Priestley and Carl Wilhelm Scheele!"
      },
      {
        category: "General Knowledge",
        question: "What is the largest planet in our solar system?",
        options: ["Jupiter", "Saturn", "Earth", "Mars"],
        correctAnswer: "Jupiter",
        explanation: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined!",
        funFact: "Jupiter is so large that it could fit more than 1,300 Earths inside it! It's also known as a 'gas giant' because it's made mostly of hydrogen and helium."
      },
      {
        category: "History",
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: "1945",
        explanation: "World War II ended in 1945 with the surrender of Japan in September.",
        funFact: "The war officially ended on September 2, 1945, aboard the USS Missouri in Tokyo Bay!"
      },
      {
        category: "Literature",
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        explanation: "William Shakespeare wrote this famous tragedy in the early part of his career, likely between 1591 and 1595.",
        funFact: "Romeo and Juliet has been adapted into more than 27 languages and performed countless times worldwide!"
      },
      {
        category: "Science",
        question: "What is the chemical formula for water?",
        options: ["CO2", "H2O", "NaCl", "CH4"],
        correctAnswer: "H2O",
        explanation: "Water consists of two hydrogen atoms bonded to one oxygen atom.",
        funFact: "Water is the only substance on Earth that exists naturally in all three states: solid, liquid, and gas!"
      },
      {
        category: "Geography",
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
        correctAnswer: "Nile River",
        explanation: "The Nile River in Africa is approximately 6,650 kilometers (4,130 miles) long.",
        funFact: "The Nile River flows through 11 countries and has been crucial to Egyptian civilization for thousands of years!"
      },
      {
        category: "Sports",
        question: "How many players are on a basketball team on the court at once?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5",
        explanation: "Each basketball team has 5 players on the court: point guard, shooting guard, small forward, power forward, and center.",
        funFact: "Basketball was invented in 1891 by Dr. James Naismith using peach baskets and a soccer ball!"
      }
    ];

    for (const question of sampleQuestions) {
      await this.createTriviaQuestion(question);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTriviaQuestions(): Promise<TriviaQuestion[]> {
    return Array.from(this.triviaQuestions.values());
  }

  async getTriviaQuestion(id: number): Promise<TriviaQuestion | undefined> {
    return this.triviaQuestions.get(id);
  }

  async createTriviaQuestion(insertQuestion: InsertTriviaQuestion): Promise<TriviaQuestion> {
    const id = this.currentQuestionId++;
    const question: TriviaQuestion = { ...insertQuestion, id };
    this.triviaQuestions.set(id, question);
    return question;
  }
}

export const storage = new DatabaseStorage();
