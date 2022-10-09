import { Router } from 'express';
import Joi from 'joi';
import requireJwtAuth from '../../middleware/requireJwtAuth.js';
import User from '../../models/User.js';
import { registerSchema } from '../../services/validators.js';

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

    try {
      const newUser = await new User({
        name,
        email,
        contact,
        password,
        department,
        joiningDate,
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ message: 'Add success.' }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
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
