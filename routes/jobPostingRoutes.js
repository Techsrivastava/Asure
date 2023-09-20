const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');

// Create a new job posting
router.post('/', jobPostingController.createJobPosting);

// Get all job postings
router.get('/', jobPostingController.getAllJobPostings);

// Other CRUD routes can be added as needed

module.exports = router;
