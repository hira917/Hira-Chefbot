const express = require('express');
const router = express.Router();
const Alarm = require('../models/Alarm');
const User = require('../models/User');  // ✅ Added
const jwt = require('jsonwebtoken');      // ✅ Added

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    // Use JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId || decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.userId = user._id;
    req.userName = user.name;
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Admin middleware (check if user is admin)
const adminAuth = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// ========== USER APIs ==========

// User sets an alarm
router.post('/cooking-alarms', auth, async (req, res) => {
  try {
    const { alarmName, duration, recipe, message } = req.body;
    
    const alarm = new Alarm({
      userId: req.userId,
      userName: req.userName,
      alarmName: alarmName,
      duration: duration,
      recipe: recipe || '',
      message: message || `Time to cook ${recipe || 'your meal'}!`,
      isActive: true
    });
    
    await alarm.save();
    res.status(201).json({ 
      success: true, 
      message: 'Alarm set successfully!',
      alarm 
    });
  } catch (error) {
    console.error('Error setting alarm:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's own alarms
router.get('/my-alarms', auth, async (req, res) => {
  try {
    const alarms = await Alarm.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(alarms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User deletes their own alarm
router.delete('/my-alarms/:id', auth, async (req, res) => {
  try {
    const alarm = await Alarm.findOne({ _id: req.params.id, userId: req.userId });
    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' });
    }
    await Alarm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alarm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== ADMIN APIs ==========

// Get all alarms (for admin)
router.get('/admin/all-alarms', auth, adminAuth, async (req, res) => {
  try {
    const alarms = await Alarm.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: alarms.length,
      alarms
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single alarm details (admin)
router.get('/admin/alarms/:id', auth, adminAuth, async (req, res) => {
  try {
    const alarm = await Alarm.findById(req.params.id);
    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' });
    }
    res.json(alarm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete any alarm (admin)
router.delete('/admin/alarms/:id', auth, adminAuth, async (req, res) => {
  try {
    await Alarm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Alarm deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update alarm status (admin)
router.put('/admin/alarms/:id', auth, adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;
    const alarm = await Alarm.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );
    if (!alarm) {
      return res.status(404).json({ message: 'Alarm not found' });
    }
    res.json({ success: true, alarm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;