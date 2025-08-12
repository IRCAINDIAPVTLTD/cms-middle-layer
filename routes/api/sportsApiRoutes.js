import express from 'express';
import { getSportsDepartment, saveSportsBill } from '../../controllers/api/sportsController.js';
import verifyToken from '../../middleware/auth.js';
import rateLimiter from '../../middleware/rateLimiter.js';

const router = express.Router();

router.get('/sports/department', rateLimiter, verifyToken, getSportsDepartment);
router.post('/sports/save', rateLimiter, verifyToken, saveSportsBill);

export default router;
