CREATE TABLE "agentConfig" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "agentConfig_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"agentId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"agentImage" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"userEmail" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"credits" integer DEFAULT 5,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agentConfig" ADD CONSTRAINT "agentConfig_userEmail_users_email_fk" FOREIGN KEY ("userEmail") REFERENCES "public"."users"("email") ON DELETE no action ON UPDATE no action;