import { Router } from 'express';
import requireLocalAuth from '../middleware/requireLocalAuth.js';

const router = Router();

router.post('/login', requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});


// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
