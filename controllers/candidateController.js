// controllers/candidateController.js
const Candidate = require('../models/Candidate');
const multer = require('multer');
const path = require('path');




// Controller functions
const createCandidate = async (req, res) => {
  try {
    // Fields from the form data
    const { name, phone, email, gender, status, comments } = req.body;

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

    const candidate = new Candidate({
      name,
      phone,
      email,
      gender,
      status,
      resume, // Assign the filename to the 'resume' field
      comments,
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

module.exports = {
  createCandidate,
  getAllCandidates,
};
