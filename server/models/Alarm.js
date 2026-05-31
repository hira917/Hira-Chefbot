const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  alarmName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  recipe: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: 'Time to cook!'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alarm', alarmSchema);