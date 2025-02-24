// routes/smsRoutes.js
const express = require("express");
const twilio = require("twilio");
const router = express.Router();

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Route to send SMS
router.post("/send", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res
      .status(400)
      .json({ error: "Missing required fields: to, message" });
  }

  try {
    const smsResponse = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to,
    });
    res.status(200).json({ success: true, messageSid: smsResponse.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to handle incoming SMS (Twilio Webhook)
// Route to handle incoming SMS or Button interaction (Twilio Webhook)
router.post("/incoming", (req, res) => {
  const { Body, From, ButtonText, Payload } = req.body;

  console.log(`Received message from ${From}: ${Body}`);
  console.log(
    `Received button interaction: ButtonText=${ButtonText}, Payload=${Payload}`
  );

  let replyMessage;

  // Check for button interaction first
  if (ButtonText) {
    // Handle button interaction based on ButtonText
    replyMessage = `You clicked the button: ${ButtonText}`;
  } else if (Payload) {
    // Handle button interaction based on Payload
    replyMessage = `Button action received with payload: ${Payload}`;
  } else {
    // Default text message handling
    if (Body.trim().toLowerCase() === "hello") {
      replyMessage = "Hi there! How can I assist you today?";
    } else if (Body.trim().toLowerCase() === "help") {
      replyMessage =
        "Sure, I can help! Reply with your question or issue, and I'll do my best to assist.";
    } else {
      replyMessage =
        "Thank you for your message. We will get back to you shortly.";
    }
  }

  // Respond to Twilio with the reply message
  res.set("Content-Type", "text/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Message>${replyMessage}</Message>
        </Response>`);
});

module.exports = router;
