import { Router } from 'express';
import { RecordController } from '../controllers/record.controller';
import { validate } from '../middlewares/validate';
import { authMiddleware, requireRoles } from '../middlewares/auth';
import { createRecordSchema, updateRecordSchema, recordFilterSchema } from '../utils/validations';

const router = Router();
const recordController = new RecordController();

router.use(authMiddleware);

// Viewers, Analysts, and Admins can read records
router.get('/', validate(recordFilterSchema), requireRoles(['VIEWER', 'ANALYST', 'ADMIN']), recordController.getAll);

// Only Admins can modify records
router.post('/', validate(createRecordSchema), requireRoles(['ADMIN']), recordController.create);
router.put('/:id', validate(updateRecordSchema), requireRoles(['ADMIN']), recordController.update);
router.delete('/:id', requireRoles(['ADMIN']), recordController.delete);

export default router;
