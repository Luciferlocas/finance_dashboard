import { DashboardCrud } from "../models/dashboard.crud";

export class DashboardService {
  static async getDashboardData(userId: string) {
    const [summary, categoryTotals, recentActivity, monthlyTrends] = await Promise.all([
      DashboardCrud.getSummary(userId),
      DashboardCrud.getCategoryTotals(userId),
      DashboardCrud.getRecentActivity(userId, 10),
      DashboardCrud.getMonthlyTrends(userId, 6),
    ]);

    return {
      summary: {
        totalIncome: Number(summary?.totalIncome || 0),
        totalExpense: Number(summary?.totalExpense || 0),
        netBalance: Number(summary?.netBalance || 0),
      },
      categoryTotals: categoryTotals.map((c) => ({
        ...c,
        total: Number(c.total || 0),
      })),
      recentActivity,
      monthlyTrends: monthlyTrends.map((t) => ({
        ...t,
        totalIncome: Number(t.totalIncome || 0),
        totalExpense: Number(t.totalExpense || 0),
      })),
    };
  }
}
