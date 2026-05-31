// controllers/adminController.js
const mongoose = require('mongoose');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block user
const blockUser = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User blocked successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unblock user
const unblockUser = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User unblocked successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete all related data
    const PantryItem = mongoose.model('PantryItem');
    const UserActivity = mongoose.model('UserActivity');
    const MealPlan = mongoose.model('MealPlan');
    const CookingAlarm = mongoose.model('CookingAlarm');
    
    await PantryItem.deleteMany({ userId: req.params.id });
    await UserActivity.deleteMany({ userId: req.params.id });
    await MealPlan.deleteMany({ userId: req.params.id });
    await CookingAlarm.deleteMany({ userId: req.params.id });
    
    res.json({ message: 'User and all related data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const User = mongoose.model('User');
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  deleteUser,
  updateUserRole
};