const express = require('express');
const router = express.Router();
const { getProfile, getCandidates } = require('../controllers/publicController');
const { authenticateApiKey } = require('../middleware/apiAuth');
const apiLimiter = require('../middleware/rateLimiter');

// Apply rate limiting to all routes
router.use(apiLimiter);

router.get('/profile', authenticateApiKey, getProfile);
router.get('/candidates', authenticateApiKey, getCandidates);

module.exports = router;