import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "../env";

const sql = neon(config.DB_URL!);
export const db = drizzle(sql);

export async function connectDB() {
  try {
    await db.execute(`SELECT 1`);
    console.log("Database connection established");
  } catch (error) {
    console.error("Failed to connect to database", error);
    throw error;
  }
}
