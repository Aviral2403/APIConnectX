const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
  
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
  
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    res.status(500).json({ error: 'Something went wrong!' });
  };
  
  module.exports = errorHandler;