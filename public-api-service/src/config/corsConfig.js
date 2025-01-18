const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'x-api-key']
  };
  
  module.exports = corsOptions;
  