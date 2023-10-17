// controllers/companyController.js
const Company = require('../models/company');
const ExcelJS = require('exceljs');


exports.createCompany = async (req, res) => {
    try {
        const { name, email,phone,  website, industry, foundedYear, location } = req.body;

        console.log('Received company data:', req.body); // Log the received data

        // Check if required fields are missing
        if (!name || !email || !phone || !website || !industry || !foundedYear || !location) {
            console.error('Missing required fields'); // Log the error
            console.log('Creating a new company...');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Phone:', phone);
            console.log('Website:', website);
            console.log('Industry:', industry);
            console.log('Founded Year:', foundedYear);
            console.log('Location:', location);
            return res.status(400).json({ error: 'Missing required fields' });
        }


        const company = new Company({ name, email,phone, website, industry, foundedYear, location });

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


exports.deleteSelectedCompanies = async (req, res) => {
    try {
        const { companyIds } = req.body;

        if (!Array.isArray(companyIds) || companyIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty companyIds array' });
        }

        const deletePromises = companyIds.map(async (companyId) => {
            const company = await Company.findById(companyId);

            if (!company) {
                console.error('Company not found:', companyId);
                return null; // Skip if the company is not found
            }

            // Set the selectedForDeletion field to true
            company.selectedForDeletion = true;
            await company.save();

            return company;
        });

        const deletedCompanies = await Promise.all(deletePromises);

        // Filter out null entries (companies that were not found)
        const successfullyDeletedCompanies = deletedCompanies.filter(company => company);

        res.status(200).json({ message: 'Selected companies marked for deletion', deletedCompanies: successfullyDeletedCompanies });
    } catch (error) {
        console.error('Error deleting selected companies:', error);
        res.status(500).json({ error: 'Failed to delete selected companies' });
    }
};

exports.downloadToExcel = async (req, res) => {
    try {
        const companies = await Company.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');

        // Add headers
        worksheet.columns = [
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
            { header: 'Website', key: 'website' },
            { header: 'Industry', key: 'industry' },
            { header: 'Founded Year', key: 'foundedYear' },
            { header: 'Location', key: 'location' },
        ];

        // Add data rows
        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                email: company.email,
                website: company.website,
                industry: company.industry,
                foundedYear: company.foundedYear,
                location: company.location,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader('Content-Disposition', 'attachment; filename=company-data.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error downloading to Excel:', error);
        res.status(500).json({ error: 'Failed to download to Excel' });
    }
};
