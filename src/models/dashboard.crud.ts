import { db } from "../config/db";
import { records } from "../config/db/schema";
import { eq, and, sql, desc, gte } from "drizzle-orm";

export class DashboardCrud {
  static async getSummary(userId: string) {
    const [summary] = await db
      .select({
        totalIncome: sql<number>`SUM(CASE WHEN ${records.type} = 'INCOME' THEN ${records.amount} ELSE 0 END)`,
        totalExpense: sql<number>`SUM(CASE WHEN ${records.type} = 'EXPENSE' THEN ${records.amount} ELSE 0 END)`,
        netBalance: sql<number>`SUM(CASE WHEN ${records.type} = 'INCOME' THEN ${records.amount} ELSE -${records.amount} END)`,
      })
      .from(records)
      .where(eq(records.userId, userId));
      
    return summary;
  }

  static async getCategoryTotals(userId: string) {
    return await db
      .select({
        category: records.category,
        type: records.type,
        total: sql<number>`SUM(${records.amount})`,
      })
      .from(records)
      .where(eq(records.userId, userId))
      .groupBy(records.category, records.type);
  }

  static async getRecentActivity(userId: string, limit: number = 5) {
    return await db
      .select()
      .from(records)
      .where(eq(records.userId, userId))
      .orderBy(desc(records.date))
      .limit(limit);
  }

  static async getMonthlyTrends(userId: string, months: number = 6) {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const trends = await db
      .select({
        month: sql<string>`to_char(${records.date}, 'YYYY-MM')`,
        totalIncome: sql<number>`SUM(CASE WHEN ${records.type} = 'INCOME' THEN ${records.amount} ELSE 0 END)`,
        totalExpense: sql<number>`SUM(CASE WHEN ${records.type} = 'EXPENSE' THEN ${records.amount} ELSE 0 END)`,
      })
      .from(records)
      .where(
        and(
          eq(records.userId, userId),
          gte(records.date, cutoffDate)
        )
      )
      .groupBy(sql`to_char(${records.date}, 'YYYY-MM')`)
      .orderBy(sql`to_char(${records.date}, 'YYYY-MM')`);
    
    return trends;
  }
}
