// controllers/chatController.js
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    // Logic to send message
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.setUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.userId;

    // Update user status
    await User.findByIdAndUpdate(userId, { status });

    res.status(200).json({ message: 'User status updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
