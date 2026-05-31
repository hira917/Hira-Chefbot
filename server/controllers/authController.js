const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==================
// REGISTER
// ==================
const register = async (req, res) => {
  try {
    const { name, email, password, agreeToTerms } = req.body;

    if (!name || !email || !password || !agreeToTerms) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already has been registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      agreeToTerms
    });

    res.status(201).json({
      message: 'Account has been successfully created!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// LOGIN
// ==================
const login = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// LOGOUT
// ==================
const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// FORGOT PASSWORD
// ==================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    
    user.resetPasswordToken = hashedOTP;
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).json({
      message: 'OTP sent successfully! Check console for OTP'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// VERIFY OTP
// ==================
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.resetPasswordToken || !user.resetPasswordExpiry) {
      return res.status(400).json({ message: 'No OTP request found' });
    }

    if (user.resetPasswordExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const isMatch = await bcrypt.compare(otp, user.resetPasswordToken);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.status(200).json({
      message: 'OTP verified successfully!',
      resetToken: resetToken
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// RESET PASSWORD
// ==================
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res.status(200).json({
      message: 'Password reset successfully!'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ==================
// EXPORTS
// ==================
module.exports = { 
  register, 
  login, 
  logout, 
  forgotPassword, 
  verifyOTP, 
  resetPassword 
};