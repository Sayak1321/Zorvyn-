import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  private dashboardService = new DashboardService();

  getSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.query;
      const summary = await this.dashboardService.getSummary(
        startDate as string,
        endDate as string
      );
      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  };
}
