import {
  pgTable,
  text,
  doublePrecision,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "ANALYST", "VIEWER"]);
export const statusEnum = pgEnum("status", ["ACTIVE", "INACTIVE"]);
export const typeEnum = pgEnum("type", ["INCOME", "EXPENSE"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: roleEnum("role").default("VIEWER").notNull(),
  status: statusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const records = pgTable("records", {
  id: uuid("id").primaryKey().defaultRandom(),
  amount: doublePrecision("amount").notNull(),
  type: typeEnum("type").notNull(),
  category: text("category").notNull(),
  notes: text("notes"),
  date: timestamp("date").defaultNow().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Record = typeof records.$inferSelect;
export type NewRecord = typeof records.$inferInsert;
