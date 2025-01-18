
const axios = require('axios');
const constants = require('../config/constants');

const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }
    
    // Validate API key and get token by making request to main service
    const response = await axios.get(
      `${process.env.MAIN_SERVICE_URL}${constants.MAIN_SERVICE_ENDPOINTS.VALIDATE_KEY}`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );
    
    // Store both user data and token in request object
    req.user = response.data.user;
    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.error });
    }
    res.status(401).json({ error: 'API key authentication failed' });
  }
};

module.exports = { authenticateApiKey };