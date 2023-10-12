const express = require('express');
const router = express.Router();
const contactFormController = require('../controllers/contactFormController');

// Create a new contact form submission
router.post('/', contactFormController.createContactForm);

// Get all contact form submissions
router.get('/', contactFormController.getAllContactForms);

// Implement other routes as needed

// Delete a contact form submission by ID
router.delete('/:id', contactFormController.deleteContactFormSubmission);

// Route to download contact form data as an Excel sheet
router.get('/download', contactFormController.downloadContactFormData);

module.exports = router;
