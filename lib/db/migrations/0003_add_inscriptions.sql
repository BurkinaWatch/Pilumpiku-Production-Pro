CREATE TABLE "inscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"service" text NOT NULL,
	"nom" text NOT NULL,
	"email" text NOT NULL,
	"telephone" text,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
