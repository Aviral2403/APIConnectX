const axios = require('axios');
const constants = require('../config/constants');

const getProfile = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MAIN_SERVICE_URL}${constants.MAIN_SERVICE_ENDPOINTS.USER_PROFILE}`,
      {
        headers: {
          'x-api-key': req.headers['x-api-key']
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Profile fetch error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: error.response.data.error || 'Failed to fetch profile'
      });
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Main service is unavailable' 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const getCandidates = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.MAIN_SERVICE_URL}${constants.MAIN_SERVICE_ENDPOINTS.CANDIDATES}`,
      {
        headers: {
          'Authorization': `Bearer ${req.user.token}`,
          'x-api-key': req.headers['x-api-key']
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Candidates fetch error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: error.response.data.error || 'Failed to fetch candidates'
      });
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Main service is unavailable' 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
};

module.exports = { getProfile, getCandidates };