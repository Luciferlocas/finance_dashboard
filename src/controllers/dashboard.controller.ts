import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";

export class DashboardController {
  static async getDashboardData(req: Request, res: Response) {
    try {
      const data = await DashboardService.getDashboardData(req.user.id);
      return res.status(200).json(data);
    } catch (err: any) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}
