const User = require('../models/user');
const json2xls = require('json2xls');
const fs = require('fs');

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

// Read all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndRemove(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).end(); // 204 No Content (successful deletion)
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
};


// Export all users data to an Excel file
exports.exportUsersToExcel = async (req, res) => {
    try {
        const users = await User.find();
        const xls = json2xls(users);

        // Define the file path
        const filePath = 'user_data.xlsx';

        // Write the Excel file
        fs.writeFileSync(filePath, xls, 'binary');

        // Send the file as a download
        res.download(filePath, 'user_data.xlsx', (err) => {
            if (err) {
                console.error('Error exporting users:', err);
                res.status(500).json({ error: 'Failed to export users', details: err.message });
            } else {
                // Cleanup: Delete the file after download
                fs.unlinkSync(filePath);
            }
        });
    } catch (err) {
        console.error('Error exporting users:', err);
        res.status(500).json({ error: 'Failed to export users', details: err.message });
    }
};


// Delete multiple users by IDs
exports.deleteUsersByIds = async (req, res) => {
    const { ids } = req.body;
    try {
        const deletedUsers = await User.deleteMany({ _id: { $in: ids } });
        if (deletedUsers.deletedCount === 0) {
            return res.status(404).json({ error: 'No users found with the specified IDs' });
        }
        res.status(204).end(); // 204 No Content (successful deletion)
    } catch (err) {
        console.error('Error deleting users by IDs:', err);
        res.status(500).json({ error: 'Failed to delete users', details: err.message });
    }
};
