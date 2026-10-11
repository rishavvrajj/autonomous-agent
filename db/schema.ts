import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  credit: integer('credits').default(5)
});

export const AgentConfig = pgTable("agentConfig", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  agentId: text("agentId").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  agentImage: text("agentImage"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userEmail: text("userEmail").notNull().references(() => users.email)
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;