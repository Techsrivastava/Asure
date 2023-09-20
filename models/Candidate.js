// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Fresher', 'Experienced'],
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
