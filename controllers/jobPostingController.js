const JobPosting = require('../models/jobPosting');

// Create a new job posting
exports.createJobPosting = async (req, res) => {
  try {
    const { title, description, location, company, salary } = req.body;
    const jobPosting = new JobPosting({ title, description, location, company, salary });
    await jobPosting.save();
    res.status(201).json(jobPosting);
  } catch (err) {
    console.error('Error creating job posting:', err);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
};

// Get all job postings
exports.getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.status(200).json(jobPostings);
  } catch (err) {
    console.error('Error fetching job postings:', err);
    res.status(500).json({ error: 'Failed to fetch job postings' });
  }
};

// Other CRUD methods can be added as needed (update, delete, get by ID)
