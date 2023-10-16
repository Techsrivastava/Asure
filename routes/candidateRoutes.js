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
// New routes for the additional features
router.post('/candidates/delete', candidateController.deleteCandidates); // Delete candidates by ID
// New route for deleting selected candidates
router.delete('/candidates/delete', candidateController.deleteSelectedCandidates);

router.get('/candidates/export/excel', candidateController.exportCandidatesToExcel); // Export candidates to Excel

module.exports = router;
