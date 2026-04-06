import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { authMiddleware, requireRoles } from '../middlewares/auth';
import { updateRoleSchema, updateStatusSchema } from '../utils/validations';

const router = Router();
const userController = new UserController();

// All user routes require ADMIN role
router.use(authMiddleware);
router.use(requireRoles(['ADMIN']));

router.get('/', userController.getAllUsers);
router.put('/:id/role', validate(updateRoleSchema), userController.updateRole);
router.put('/:id/status', validate(updateStatusSchema), userController.updateStatus);

export default router;
