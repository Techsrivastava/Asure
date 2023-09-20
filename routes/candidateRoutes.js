const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const multer = require('multer');
const path = require('path');

// Define storage for uploaded resumes
const storage = multer.diskStorage({
  destination: 'uploads/', // where to store the files
  filename: (req, file, cb) => {
    // generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

// Create multer instance
const upload = multer({ storage });

// Routes
router.post('/candidates', upload.single('resume'), candidateController.createCandidate);
router.get('/candidates', candidateController.getAllCandidates);

module.exports = router;
