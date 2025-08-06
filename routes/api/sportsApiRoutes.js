const express = require('express');
const router = express.Router();

const {
    getSportsDepartment,
} = require('../../controllers/api/sportsController');

const verifyToken = require('../../middleware/auth');
const rateLimiter = require('../../middleware/rateLimiter');

// Protected route
router.get('/sports/department', rateLimiter, verifyToken, getSportsDepartment);

module.exports = router;
