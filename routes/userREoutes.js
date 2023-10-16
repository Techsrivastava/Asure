const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Create User
router.post('/', UserController.createUser);

// Get all Users
router.get('/', UserController.getAllUsers);

// Update User by ID
router.put('/:id', UserController.updateUser);

// Delete User by ID
router.delete('/:id', UserController.deleteUser);

// Delete multiple users by their IDs
router.post('/delete-by-ids', UserController.deleteUsersByIds);

module.exports = router;
