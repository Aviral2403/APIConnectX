const express = require('express');
const cors = require('cors');
const publicRoutes = require('./src/routes/public');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/public', publicRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Public API service running on port ${PORT}`);
});