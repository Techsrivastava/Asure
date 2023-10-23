// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  candidatePhone: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
    unique: true,
  },
  candidategender: {
    type: String,
    enum: ['Male', 'Female', 'Lgbtq2+'],
    required: true,
  },
  candidatestatus: {
    type: String,
    enum: ['Fresher', 'Experienced', 'Career Shift','Career Restart','Veterans'],
    required: true,
  },
  candidateresume: {
    type: String,
    required: true,
  },
  candidatecomments: {
    type: String,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
