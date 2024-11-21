const express = require('express');
const nodemailer = require('nodemailer');
const Form = require('../models/follow_up_mail');
const cron = require('node-cron');

require('dotenv').config();

const router = express.Router();

// Check for required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('ERROR: EMAIL_USER and EMAIL_PASS environment variables are required');
  process.exit(1);
}

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send an immediate email
router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: 'Please provide "to", "subject", and "message" for the email.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Schedule daily follow-up emails
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily follow-up email task');

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch forms with pickup_date >= today
    const forms = await Form.find({ pickup_date: { $gte: today } });

    for (const form of forms) {
      const { email, pickup_date, username } = form;

      // Skip if no email or pickup_date is invalid
      if (!email || !pickup_date) continue;

      const daysLeft = Math.ceil((pickup_date - today) / (1000 * 60 * 60 * 24));

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reminder: Upcoming Pickup',
        html: `
          <p>Dear ${username || 'Customer'},</p>
          <p>This is a reminder that your pickup is scheduled in <strong>${daysLeft} days</strong>.</p>
          <p>Pickup Date: ${pickup_date.toDateString()}</p>
          <p>Please let us know if you have any questions or need to make changes.</p>
          <p>Best regards,<br>Your Company</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Follow-up email sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error running follow-up email task:', error);
  }
});

module.exports = router;
