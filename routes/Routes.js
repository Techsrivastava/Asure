const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/Controller');
const { check } = require('express-validator');
const router = express.Router();

router.post('/', [
  check('username').isLength({ min: 5 }),
  check('password').isLength({ min: 5 }),
], registerAdmin);

router.post('/login', loginAdmin);

module.exports = router;
