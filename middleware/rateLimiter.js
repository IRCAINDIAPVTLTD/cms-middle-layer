// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 60, // Limit each IP to 30 requests per windowMs
  standardHeaders: true, // Send `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
  message: {
    error: 'Too many requests. Please try again after 15 minutes.'
  }
});

module.exports = rateLimiter;
