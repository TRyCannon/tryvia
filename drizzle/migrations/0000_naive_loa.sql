CREATE TABLE "trivia_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"question" text NOT NULL,
	"options" text[] NOT NULL,
	"correct_answer" text NOT NULL,
	"explanation" text NOT NULL,
	"fun_fact" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
