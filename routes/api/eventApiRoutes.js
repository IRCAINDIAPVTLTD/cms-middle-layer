const express = require('express');
const router = express.Router();

const {
    getEvent,
    getEventbyId,
    getEventCategory,
} = require('../../controllers/api/eventController');

const verifyToken = require('../../middleware/auth');
const rateLimiter = require('../../middleware/rateLimiter');

// Protected route
router.get('/event/list', rateLimiter, verifyToken, getEvent);
router.get('/event/list_by_id', rateLimiter, verifyToken, getEventbyId);
router.get('/event/category', rateLimiter, verifyToken, getEventCategory);

module.exports = router;
