const ContactForm = require('../models/contactForm');

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


