const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, // Added name field to match the "Name" input
    phone: String, // Changed field name to match the "Your Phone no" input
    email: String, // Changed field name to match the "EMAIL" input
    userType: String, // Added field to store user type (Candidates or Company)
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema); // Changed the model name to "User" (capitalized)
