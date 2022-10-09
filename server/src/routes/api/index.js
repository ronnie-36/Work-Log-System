import { Router } from 'express';
import usersRoutes from './users.js';
import tasksRoutes from './tasks.js';
const router = Router();

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);

export default router;
