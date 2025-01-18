const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  last_name: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password_hash: {
    type: String,
    required: true
  },
  api_key: {
    type: String,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (this.isModified('password_hash')) {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
