const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// Check for required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('ERROR: EMAIL_USER and EMAIL_PASS environment variables are required');
  process.exit(1); // Exit the application if variables are missing
}

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send an email
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  // Basic validation
  if (!to || !subject || !message) {
    return res.status(400).json({ message: 'Please provide "to", "subject", and "message" for the email.' });
  }

  // Set up the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,  // Use the subject from the request  // Plain text content
    html:message,  // HTML content (wrap message in <p> tags)
  };

  try {
    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

module.exports = router;
