const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const dotenv = require("dotenv"); // Import dotenv to load environment variables
const Form = require("../models/Form");
const mongoose = require("mongoose");
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

// Email setup using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Use the email from environment variables
    pass: process.env.EMAIL_PASS, // Use the password from environment variables
  },
});

// Function to send the email
const sendEmail = (recipientEmail) => {
  console.log("Preparing to send email to:", recipientEmail); // Debugging log
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail, // Send email to the recipient from the form database
    subject: 'Default Email Subject',
    text: 'This is the default email content that is sent daily at 1 PM.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Set up cron job to send an email every day at 1 PM
cron.schedule('20 13 * * *', async () => {
  console.log('Cron job triggered at:', new Date()); // Debugging log

  try {
    // Retrieve forms with a pickup_date in the future
    const forms = await Form.find({ pickup_date: { $gt: new Date() } }).exec();
    console.log("Forms retrieved:", forms); // Debugging log

    if (forms.length > 0) {
      forms.forEach((form) => {
        console.log("Checking form with pickup_date:", form.pickup_date); // Debugging log

        // Send email to the form's email if pickup_date is in the future
        sendEmail(form.email);
      });
    } else {
      console.log("No forms with a future pickup date found.");
    }
  } catch (error) {
    console.error("Error fetching forms:", error);
  }
});

// API endpoint to submit a form
router.post("/", async (req, res) => {
  const {
    username,
    email,
    phone,
    ship_form,
    ship_to,
    transport_method,
    year,
    make,
    model,
    vehicle_type,
    pickup_date,
    distance,
    added_on,
    status,
    sourceUrl,
    note,
    note_time,
    price,
    pickup_id,
    payment_url,
    cars,  // New cars array from the request
  } = req.body;

  // Automatically capture the client's IP address
  const clientIp =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress;

  try {
    // Find the latest form and get its quote_id
    const lastForm = await Form.findOne().sort({ quote_id: -1 });

    // Generate the new quote_id by incrementing the last form's quote_id
    const newQuoteId = lastForm ? lastForm.quote_id + 1 : 1;

    const formData = new Form({
      quote_id: newQuoteId,
      username,
      email,
      phone,
      ship_form,
      ship_to,
      transport_method,
      year,
      make,
      model,
      vehicle_type,
      pickup_date,
      distance,
      added_on,
      status,
      sourceUrl,
      ip: clientIp, // Set the IP address here
      note,
      note_time,
      price,
      pickup_id,
      payment_url,
      cars, // Set the array of cars here
    });

    await formData.save();
    res.status(201).json({ message: "Form submitted successfully!" });

    // Send the email to the recipient email from the form
    console.log("Sending email to:", email); // Debugging log
    sendEmail(email); // Send email to the email in the form

  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Error saving form", error: error.message });
  }
});

// GET endpoint to retrieve all form submissions
router.get("/", async (req, res) => {
  try {
    const formData = await Form.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Error fetching forms", error: error.message });
  }
});

// GET endpoint to retrieve a single form by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid form ID" });
    }

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// API endpoint to update a form
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid form ID" });
    }

    const updatedForm = await Form.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Error updating form", error: error.message });
  }
});

// API endpoint to delete a form by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid form ID" });
    }

    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Error deleting form", error: error.message });
  }
});

// GET endpoint to retrieve the client's IP address
router.get("/ip", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress;

  res.status(200).json({ ip });
});

module.exports = router;
