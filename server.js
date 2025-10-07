// server.js - Starter Express server for Week 2 assignment

require('dotenv').config();               // load .env (API_KEY, PORT)
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./middleware/logger');           // request logger
const errorHandler = require('./middleware/errorHandler'); // global error handler

const productRoutes = require('./routes/productRoutes'); // routes file (we'll create)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger); // log every request

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// Mount product routes
app.use('/api/products', productRoutes);

// Global error handler (must be after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Export app for testing (optional)
module.exports = app;
