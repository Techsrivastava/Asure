const mongoose = require('mongoose');

// Define the options for the dropdown
const radioOptions = ['candidate', 'Company'];

const contactFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // Change the "radios" field to a dropdown (select)
  radios: {
    type: String,
    required: true,
    enum: radioOptions, // Use the predefined options
  },
  comments: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ContactForm', contactFormSchema);
