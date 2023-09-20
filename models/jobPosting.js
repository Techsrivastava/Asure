const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: String,
  company: String,
  salary: Number,
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
