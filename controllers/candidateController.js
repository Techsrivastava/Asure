// controllers/candidateController.js
const Candidate = require('../models/Candidate');
const multer = require('multer');
const path = require('path');
const json2xls = require('json2xls');
const fs = require('fs');

// Controller functions
const createCandidate = async (req, res) => {
  try {
    // Fields from the form data
    const { name, phone, email, gender, status, comments, industry } = req.body;

    // Extract the filename from the uploaded file
    const resume = req.file ? req.file.filename : undefined;

    console.log('Received candidate creation request with the following data:');
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Gender:', gender);
    console.log('Status:', status);
    console.log('Resume:', resume);
    console.log('Comments:', comments);
    console.log('Industry:', industry);

    const candidate = new Candidate({
      name,
      phone,
      email,
      gender,
      status,
      resume, // Assign the filename to the 'resume' field
      comments,
      industry,
    });

    // Save the candidate using Promises
    const savedCandidate = await candidate.save();

    console.log('Candidate saved successfully:', savedCandidate);
    res.status(201).send(savedCandidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(400).send(error);
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.send(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).send(error);
  }
};

const deleteCandidates = async (req, res) => {
  try {
    const { candidateIds } = req.body;

    if (!Array.isArray(candidateIds) || candidateIds.length === 0) {
      return res.status(400).send('Invalid candidate IDs provided for deletion');
    }

    const deleteResult = await Candidate.deleteMany({ _id: { $in: candidateIds } });

    if (deleteResult.deletedCount > 0) {
      res.status(200).send('Candidates deleted successfully');
    } else {
      res.status(404).send('Candidates not found');
    }
  } catch (error) {
    console.error('Error deleting candidates:', error);
    res.status(500).send(error);
  }
};



const exportCandidatesToExcel = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (candidates.length === 0) {
      return res.status(404).send('No candidates found for export');
    }

    const xls = json2xls(candidates);

    // Define the file path
    const filePath = 'candidates_data.xlsx';

    // Write the Excel file
    fs.writeFileSync(filePath, xls, 'binary');

    // Send the file as a download
    res.download(filePath, 'candidates_data.xlsx', (err) => {
      if (err) {
        console.error('Error exporting candidates:', err);
        res.status(500).send('Failed to export candidates');
      } else {
        // Cleanup: Delete the file after download
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error('Error exporting candidates:', error);
    res.status(500).send('Failed to export candidates');
  }
};
// controllers/candidateController.js
// ... Other imports and code

// Controller function to delete selected candidates
const deleteSelectedCandidates = async (req, res) => {
  try {
    const { candidateIds } = req.body;

    if (!Array.isArray(candidateIds) || candidateIds.length === 0) {
      return res.status(400).send('Invalid candidate IDs provided for deletion');
    }

    const deleteResult = await Candidate.deleteMany({ _id: { $in: candidateIds } });

    if (deleteResult.deletedCount > 0) {
      res.status(200).send('Candidates deleted successfully');
    } else {
      res.status(404).send('Candidates not found');
    }
  } catch (error) {
    console.error('Error deleting candidates:', error);
    res.status(500).send(error);
  }
};




module.exports = {
  createCandidate,
  getAllCandidates,
  deleteCandidates,
  deleteSelectedCandidates,
  exportCandidatesToExcel,
};
