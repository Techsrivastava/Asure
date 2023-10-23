// models/company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    companyPhone:{
        type: String
    },
   
    
    companywebsite: {
        type: String,
    },
    companyindustry: {
        type: String,
    },
    companyfoundedYear: {
        type: Number,
    },
    companylocation: {
        type: String,
    },
    // Add other fields as needed for your company signup form
});

module.exports = mongoose.model('Company', companySchema);
