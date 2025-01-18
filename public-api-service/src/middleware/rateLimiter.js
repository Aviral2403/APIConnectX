const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 200, // limit each API key to 100 requests per windowMs
  message: 'Too many requests from this API key, please try again later'
});

module.exports = apiLimiter;