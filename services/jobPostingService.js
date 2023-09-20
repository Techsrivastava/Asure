const JobPosting = require('../models/jobPosting');

// Create a new job posting
exports.createJobPosting = async (jobPostingData) => {
  try {
    const jobPosting = new JobPosting(jobPostingData);
    return await jobPosting.save();
  } catch (err) {
    throw new Error('Failed to create job posting');
  }
};

// Get all job postings
exports.getAllJobPostings = async () => {
  try {
    return await JobPosting.find();
  } catch (err) {
    throw new Error('Failed to fetch job postings');
  }
};

// Other CRUD methods can be implemented here
