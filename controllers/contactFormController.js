const ContactForm = require('../models/contactForm');
const XLSX = require('xlsx'); 

exports.createContactForm = async (req, res) => {
  try {
    const { firstName,lastName, email, phone, radios, comments } = req.body;
    const contactForm = new ContactForm({ firstName,lastName, email, phone, radios, comments });
    await contactForm.save();
    res.status(201).json(contactForm);
  } catch (err) {
    console.error('Error creating contact form submission:', err);
    res.status(500).json({ error: 'Failed to create contact form submission' });
  }
};

// Implement other methods as needed (e.g., get all submissions)
exports.getAllContactForms = async (req, res) => {
  try {
    const contactForms = await ContactForm.find();
    res.status(200).json(contactForms);
  } catch (err) {
    console.error('Error fetching contact form submissions:', err);
    res.status(500).json({ error: 'Failed to fetch contact form submissions' });
  }
};


exports.deleteContactFormSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContactForm = await ContactForm.findByIdAndRemove(id);
    if (!deletedContactForm) {
      return res.status(404).json({ error: 'Contact form submission not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting contact form submission:', err);
    res.status(500).json({ error: 'Failed to delete contact form submission', details: err.message });
  }
};

exports.downloadContactFormData = async (req, res) => {
  try {
    const contactForms = await ContactForm.find();

    // Convert contactForms data to an Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(contactForms);
    const excelBuffer = XLSX.write(worksheet, { bookType: 'xlsx', type: 'buffer' });

    // Set response headers for Excel download
    res.setHeader('Content-Disposition', 'attachment; filename=contactForms.xlsx');
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } catch (err) {
    console.error('Error generating Excel file:', err);
    res.status(500).json({ error: 'Failed to generate Excel file', details: err.message });
  }
};


