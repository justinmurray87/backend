// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');

// Route for handling message operations
router.post('/messages', createMessage);

module.exports = router;
