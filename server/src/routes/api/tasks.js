import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import User from '../../models/User.js';

const router = Router();

router.post('/add', requireJwtAuth, async (req, res, next) => {

    const { description, taskType, startTime, duration } = req.body;

    try {
        const newTask = {
            description,
            taskType,
            startTime,
            duration
        }

        const user = await User.findById(req.user.id);
        user.addTask(newTask, (err, user) => {
            if (err) throw err;
            res.json({ message: 'Added task successfully.' });
        });
    } catch (err) {
        return next(err);
    }
});

export default router;
