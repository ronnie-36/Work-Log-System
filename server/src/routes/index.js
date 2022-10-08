import { Router } from 'express';
import localAuthRoutes from './localAuth.js';
import apiRoutes from './api/index.js';
const router = Router();

router.use('/auth', localAuthRoutes);
router.use('/api', apiRoutes);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));

export default router;