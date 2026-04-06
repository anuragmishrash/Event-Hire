require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const requirementsRouter = require('./routes/requirements');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for the assignment to prevent Vercel URL mismatch issues
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'EventHire API is running', status: 'ok' });
});

// Routes
app.use('/api/requirements', requirementsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`EventHire backend running on http://localhost:${PORT}`);
});
