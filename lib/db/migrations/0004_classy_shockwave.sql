CREATE TABLE "inscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"service" text NOT NULL,
	"nom" text NOT NULL,
	"email" text NOT NULL,
	"telephone" text,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" integer NOT NULL,
	"locale" text NOT NULL,
	"fields" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "galerie" json;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "trailer_url" text;--> statement-breakpoint
CREATE UNIQUE INDEX "content_translations_entity_locale_unique" ON "content_translations" USING btree ("entity_type","entity_id","locale");