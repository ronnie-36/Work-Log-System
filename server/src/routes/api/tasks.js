import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import User from '../../models/User.js';
import { startOfWeek, endOfWeek } from 'date-fns'

const router = Router();

router.post('/add', requireJwtAuth, async (req, res, next) => {

    if (req.user.activationStatus == false)
        return res.status(400).json({ message: 'You can not add tasks (Account deactivated).' });

    const { description, taskType, startTime, duration } = req.body;

    const curDateTime = new Date();
    const startDateTime = new Date(startTime);

    if (startDateTime.getTime() > curDateTime.getTime())
        return res.status(400).json({ message: 'You can not add tasks for future dates.' });

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

router.get('/', requireJwtAuth, async (req, res) => {
    try {
        let { date, employeeId } = req.body;
        if (req.user.role != 'admin') {
            employeeId = req.user.id;
        }
        date = new Date(date);
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        const user = await User.findById(employeeId);
        const tasks = user.tasks;
        let filteredTasks = tasks.filter((task) =>
            new Date(task.startTime).getTime() >= new Date(weekStart).getTime()
            && new Date(task.startTime).getTime() <= new Date(weekEnd).getTime()
        );
        return res.json(filteredTasks);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

export default router;
