const express = require('express');
const router = express.Router();
const contactFormController = require('../controllers/contactFormController');

// Create a new contact form submission
router.post('/', contactFormController.createContactForm);

// Get all contact form submissions
router.get('/', contactFormController.getAllContactForms);

// Implement other routes as needed

module.exports = router;
