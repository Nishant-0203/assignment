const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./utils/seeder');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
  // Seed database
  seedData();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
const authRoutes = require('./routes/authRoutes');
const gemstoneRoutes = require('./routes/gemstoneRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/gemstones', gemstoneRoutes);
app.use('/api/recommend', recommendationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
