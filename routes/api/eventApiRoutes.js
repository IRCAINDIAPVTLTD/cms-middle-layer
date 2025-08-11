import express from 'express';

import {
    getEvent,
    getEventbyId,
    getEventCategory,
} from '../../controllers/api/eventController.js';

import verifyToken from '../../middleware/auth.js';
import rateLimiter from '../../middleware/rateLimiter.js';

const router = express.Router();

// Protected route
router.get('/event/list', rateLimiter, verifyToken, getEvent);
router.get('/event/list_by_id', rateLimiter, verifyToken, getEventbyId);
router.get('/event/category', rateLimiter, verifyToken, getEventCategory);

export default router;