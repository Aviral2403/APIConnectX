const express = require('express');
const router = express.Router();
const { addCandidate, getCandidates } = require('../controllers/candidateController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, addCandidate);
router.get('/', authenticateToken, getCandidates);

module.exports = router;