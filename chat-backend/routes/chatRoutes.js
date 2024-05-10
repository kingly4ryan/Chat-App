// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send-message', authMiddleware, chatController.sendMessage);
router.post('/set-status', authMiddleware, chatController.setUserStatus);

module.exports = router;
