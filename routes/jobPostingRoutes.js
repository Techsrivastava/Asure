const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');

// Create a new job posting
router.post('/', jobPostingController.createJobPosting);

// Get all job postings
router.get('/', jobPostingController.getAllJobPostings);

// Delete a job posting by ID
router.delete('/:id', jobPostingController.deleteJobPosting);


// Download all job postings as Excel
router.get('/download', jobPostingController.downloadJobPostingsAsExcel);


// Update a job posting by ID
router.put('/:id', jobPostingController.updateJobPosting);

// Other CRUD routes can be added as needed

module.exports = router;
