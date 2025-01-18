const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const corsOptions = require('./src/config/corsConfig');
const authRoutes = require('./src/routes/auth');
const candidateRoutes = require('./src/routes/candidates');

const app = express();
require('dotenv').config();


connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/candidate', candidateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Main service running on port ${PORT}`);
});