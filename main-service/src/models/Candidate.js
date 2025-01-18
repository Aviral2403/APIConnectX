const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
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
    lowercase: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);