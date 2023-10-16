// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Create a new company (signup)
router.post('/create', companyController.createCompany);

// Get company by ID
router.get('/:companyId', companyController.getCompany);

// Get all companies
router.get('/', companyController.getAllCompanies);

router.get('/downloadExcel', companyController.downloadToExcel);

router.post('/deleteSelected', companyController.deleteSelectedCompanies);


module.exports = router;
