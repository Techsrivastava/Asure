// models/company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
   
    
    website: {
        type: String,
    },
    industry: {
        type: String,
    },
    foundedYear: {
        type: Number,
    },
    location: {
        type: String,
    },
    // Add other fields as needed for your company signup form
});

module.exports = mongoose.model('Company', companySchema);
