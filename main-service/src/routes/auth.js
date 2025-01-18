// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/authController');
// const { authenticateToken, validateApiKey } = require('../middleware/auth');
// const User = require('../models/User');

// // Validate API key endpoint
// router.get('/validate-key', async (req, res) => {
//   try {
//     const apiKey = req.headers['x-api-key'];
    
//     if (!apiKey) {
//       return res.status(401).json({ error: 'API key is required' });
//     }
    
//     const user = await User.findOne({ api_key: apiKey });
    
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid API key' });
//     }
    
//     res.json({
//       user: {
//         id: user._id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'API key validation failed' });
//   }
// });


// router.get('/user/profile', validateApiKey, async (req, res) => {
//   try {
//     const user = req.user;
//     res.json({
//       firstName: user.first_name,
//       lastName: user.last_name,
//       email: user.email,
//       createdAt: user.created_at
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
// });

// router.post('/register', register);
// router.post('/login', login);
// router.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully' });
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const { authenticateToken, validateApiKey } = require('../middleware/auth');
const User = require('../models/User');

// Validate API key endpoint with token generation
router.get('/validate-key', async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }
    
    const user = await User.findOne({ api_key: apiKey });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    // Generate a token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    
    res.json({
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: token // Include the token in the response
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'API key validation failed' });
  }
});

router.get('/user/profile', validateApiKey, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: user.created_at
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;