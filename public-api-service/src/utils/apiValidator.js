const { API_KEY_LENGTH } = require('../config/constants');

const validateApiKey = (apiKey) => {
  return typeof apiKey === 'string' && apiKey.length === API_KEY_LENGTH;
};

const sanitizeResponse = (data) => {
  if (data && data.password_hash) {
    delete data.password_hash;
  }
  return data;
};

module.exports = { 
  validateApiKey,
  sanitizeResponse
};