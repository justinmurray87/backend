// server.js
const express = require('express');
const connectDB = require('./utils/db');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();  // For loading environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
