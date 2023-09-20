const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, phone, email, userType } = req.body;
        const user = new User({ name, phone, email, userType });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};
