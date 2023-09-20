const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

//Create User
router.post('/create',UserController.createUser);

//Get all Users
router.get('/',UserController.getAllUsers);

module.exports = router;