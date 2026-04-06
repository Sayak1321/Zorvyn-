import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { authMiddleware, requireRoles } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { z } from 'zod';

const dashboardFilterSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});

const router = Router();
const dashboardController = new DashboardController();

router.use(authMiddleware);
router.use(requireRoles(['ANALYST', 'ADMIN']));

router.get('/summary', validate(dashboardFilterSchema), dashboardController.getSummary);

export default router;
