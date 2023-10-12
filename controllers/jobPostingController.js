const JobPosting = require('../models/jobPosting');
const XLSX = require('xlsx'); 

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

// In jobPostingController.js
exports.deleteJobPosting = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJobPosting = await JobPosting.findByIdAndRemove(id);
    if (!deletedJobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.status(200).json(deletedJobPosting);
  } catch (err) {
    console.error('Error deleting job posting:', err);
    res.status(500).json({ error: 'Failed to delete job posting', details: err.message });
  }
};

// In jobPostingController.js
exports.downloadJobPostingsAsExcel = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    
    // Convert job postings data to Excel and send as a file
    const ws = XLSX.utils.json_to_sheet(jobPostings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'JobPostings');
    
    // Set the response headers for Excel download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=jobPostings.xlsx");

    XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
    res.end(wb);
  } catch (err) {
    console.error('Error downloading job postings as Excel:', err);
    res.status(500).json({ error: 'Failed to download job postings', details: err.message });
  }
};


exports.updateJobPosting = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, company, salary } = req.body;

  try {
    const updatedJobPosting = await JobPosting.findByIdAndUpdate(
      id,
      { title, description, location, company, salary },
      { new: true }
    );

    if (!updatedJobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.status(200).json(updatedJobPosting);
  } catch (err) {
    console.error('Error updating job posting:', err);
    res.status(500).json({ error: 'Failed to update job posting', details: err.message });
  }
};

// Other CRUD methods can be added as needed (update, delete, get by ID)
