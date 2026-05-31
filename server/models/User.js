const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  // Forgot Password ke liye
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpiry: {
    type: Date,
    default: null
  },
  // Security - 3 baar wrong password pe lock
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Check if account is locked
userSchema.methods.isAccountLocked = function() {
  if (!this.lockUntil) return false;
  return this.lockUntil > Date.now();
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // Reset if lock has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    this.loginAttempts = 1;
    this.lockUntil = null;
  } else {
    this.loginAttempts += 1;
    
    // Lock after 3 failed attempts for 30 minutes
    if (this.loginAttempts >= 3 && !this.lockUntil) {
      this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
    }
  }
  await this.save();
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

module.exports = mongoose.model('User', userSchema);