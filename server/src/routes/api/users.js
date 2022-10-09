import { Router } from 'express';
import Joi from 'joi';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import User from '../../models/User.js';
import { registerSchema, updateSchema } from '../../services/validators.js';

const router = Router();

router.post('/add', requireJwtAuth, async (req, res, next) => {
  if (req.user.role != 'admin')
    return res.status(400).json({ message: 'You do not have privileges to add employee.' });

  const { error } = Joi.validate(req.body, registerSchema);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { name, email, contact, department, joiningDate, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: 'Email is in use' });
    }

    const newUser = new User({
      name,
      email,
      contact,
      password,
      department,
      joiningDate,
    });

    newUser.registerUser(newUser, (err, user) => {
      if (err) throw err;
      res.json({ message: 'Add success.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/update/profile', requireJwtAuth, async (req, res, next) => {

  const { error } = Joi.validate(req.body, updateSchema);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { name, contact, department, joiningDate } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const userData = { name, contact, department, joiningDate };
    user.updateProfile(userData, (err, user) => {
      if (err) throw err;
      res.json({ message: 'Updated profile successfully.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/update/password', requireJwtAuth, async (req, res, next) => {

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.comparePassword(oldPassword, function (err, isMatch) {
      if (err) {
        throw err;
      }
      if (!isMatch) {
        return res.json({ message: 'Wrong Old Password.' });
      }
      const passwordSchema = {
        'New Password': Joi.string().trim().min(6).max(20).required(),
      }
      const { error } = Joi.validate({ 'New Password': newPassword }, passwordSchema);
      if (error) {
        return res.status(422).send({ message: error.details[0].message });
      }
      user.updatePassword(newPassword, (err, user) => {
        if (err) throw err;
        res.json({ message: 'Updated password successfully.' });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/deactivate', requireJwtAuth, async (req, res) => {
  try {
    if (req.user.role != 'admin')
      return res.status(400).json({ message: 'You do not have privileges to deactivate employees.' });

    const { employeeId } = req.body;
    const user = await User.findById(employeeId);
    user.deactivate((err, user) => {
      if (err) throw err;
      res.json({ message: 'Deactivated successfully.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/me', requireJwtAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
});

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    if (req.user.role != 'admin')
      return res.status(400).json({ message: 'You do not have privileges to fetch employees.' });
    const users = await User.find().sort({ createdAt: 'desc' });

    res.json({
      users: users.map((m) => {
        if (m.role == "employee")
          return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
