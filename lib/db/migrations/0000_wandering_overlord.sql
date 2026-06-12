CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"is_admin" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"titre" text NOT NULL,
	"categorie" text NOT NULL,
	"statut" text NOT NULL,
	"annee" integer NOT NULL,
	"duree" text NOT NULL,
	"langue" text NOT NULL,
	"synopsis" text NOT NULL,
	"intention" text NOT NULL,
	"image" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"categorie" text NOT NULL,
	"date_label" text NOT NULL,
	"excerpt" text NOT NULL,
	"image" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"description" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"hero_badge" text DEFAULT '' NOT NULL,
	"hero_title_line1" text DEFAULT '' NOT NULL,
	"hero_title_line2" text DEFAULT '' NOT NULL,
	"hero_subtitle" text DEFAULT '' NOT NULL,
	"quote_text" text DEFAULT '' NOT NULL,
	"quote_author" text DEFAULT '' NOT NULL,
	"stats_projets" text DEFAULT '8+' NOT NULL,
	"stats_pays" text DEFAULT '12+' NOT NULL,
	"stats_festivals" text DEFAULT '5+' NOT NULL,
	"about_histoire" text DEFAULT '' NOT NULL,
	"about_vision" text DEFAULT '' NOT NULL,
	"founder_name" text DEFAULT '' NOT NULL,
	"founder_title" text DEFAULT '' NOT NULL,
	"founder_bio" text DEFAULT '' NOT NULL,
	"founder_image" text DEFAULT '' NOT NULL,
	"contact_email" text DEFAULT '' NOT NULL,
	"contact_phone" text DEFAULT '' NOT NULL,
	"contact_address" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");