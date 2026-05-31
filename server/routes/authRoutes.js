const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/reset-password', authController.resetPassword);

// Get current user (Protected)
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;