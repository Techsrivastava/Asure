// controllers/companyController.js
const Company = require('../models/company');


exports.createCompany = async (req, res) => {
    try {
        const { name, email, password, website, industry, foundedYear, location } = req.body;

        console.log('Received company data:', req.body); // Log the received data

        // Check if required fields are missing
        if (!name || !email || !password || !website || !industry || !foundedYear || !location) {
            console.error('Missing required fields'); // Log the error
            console.log('Creating a new company...');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Website:', website);
            console.log('Industry:', industry);
            console.log('Founded Year:', foundedYear);
            console.log('Location:', location);
            return res.status(400).json({ error: 'Missing required fields' });
        }


        const company = new Company({ name, email, password, website, industry, foundedYear, location });

        // Save the company to the database
        try {
            await company.save();
            console.log('Company saved successfully:', company);
            res.status(201).json(company);
        } catch (dbError) {
            console.error('Error saving company to the database:', dbError);
            res.status(500).json({ error: 'Failed to save company to the database' });
        }
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Failed to create company' });
    }
};






exports.getCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error fetching all companies:', error);
        res.status(500).json({ error: 'Failed to fetch all companies' });
    }
};