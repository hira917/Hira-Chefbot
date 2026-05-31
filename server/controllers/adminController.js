const User = require('../models/User');

// ==================
// SAB USERS DEKHNE KE LIYE
// ==================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Password nahi dikhana
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// EK SPECIFIC USER DEKHNE KE LIYE
// ==================
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// USER KO BLOCK KARNE KE LIYE
// ==================
const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Admin khud ko block nahi kar sakta
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot block another admin!' });
    }
    
    user.isBlocked = true;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `User ${user.email} has been blocked successfully`,
      user: {
        id: user._id,
        email: user.email,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// USER KA BLOCK HATANE KE LIYE
// ==================
const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isBlocked = false;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `User ${user.email} has been unblocked successfully`,
      user: {
        id: user._id,
        email: user.email,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    console.error('Unblock user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// USER DELETE KARNE KE LIYE
// ==================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Admin khud ko delete nahi kar sakta
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete another admin!' });
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: `User ${user.email} has been deleted successfully`
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// USER KA ROLE CHANGE KARNE KE LIYE
// ==================
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin"' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Admin khud ka role change nahi kar sakta (apne aap ko)
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own role!' });
    }
    
    user.role = role;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: `User ${user.email} role changed to ${role}`,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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