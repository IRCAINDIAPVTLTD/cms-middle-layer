const express = require('express');
const router = express.Router();
const { generateToken } = require('../../controllers/api/tokenController');

router.post('/token', generateToken);

module.exports = router;
