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

// Function to send the email with HTML content
const sendEmail = (recipientEmail, formData) => {
  console.log("Preparing to send email to:", recipientEmail); // Debugging log

  

  // Create HTML content for the email
  const htmlContent = `
   <table border="0" cellpadding="0" cellspacing="0" width="70%" style="background-color: #fff;">
   <tr>
      <td style="padding: 30px 0 30px 0; background-color: #fff">
         <table class="wrap-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
               <td align="center" style="padding: 0 15px 10px 15px">
                  <img src="https://rapidautoshipping.com/assets/images/coloured-logo.jpg"
                     alt="Rapid Auto Shipping" width="auto" height="50" style="display: block" />
               </td>
            </tr>
            <tr>
               <td align="center" style="padding: 15px 15px 10px 15px">
                  <img src="https://rapidautoshipping.com/assets/images/review-stars.png" alt="5 star"
                     width="auto" height="17" style="display: block" />
               </td>
            </tr>
            <tr>
               <td align="center" style="padding: 0 15px">
                  <span style="font-size: 14px; display: block; line-height: normal">5-star rated company
                  with
                  <br />over 28,000 vehicles
                  shipped!</span>
               </td>
            </tr>
            <tr>
               <td style="padding: 30px 30px 15px 30px" class="quote-cell">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: left">
                     <tr>
                        <td style="padding: 0px 0 15px 0">Hi, <b>' ${formData.username}'</b><br>Thank you for your interest in shipping your vehicle
                           with
                           <b style="color: #ff5527">Rapid Auto Shipping</b>.
                        </td>
                     </tr>
                     <tr>
                        <td colspan="2" style="
                           background: #f2f2f2;
                           font-size: 22px;
                           text-align: center;
                           padding: 30px 15px;
                           ">
                           <span style="font-weight: bold; color: #000000 !important">A Dedicated Agent
                           has been appointed with the Expertise of Several Years in this Specific
                           Route. <br> Please Click below Call or Chat Now for the Exact
                           Quote.</span> <br><br>
                           <div
                              style="display:flex; flex-wrap:wrap; justify-content:center; column-gap:20px; row-gap:20px;">
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="tel:+1-833-233-4447" style="
                                    background: #fff;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: #ff5227 !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    white-space: nowrap;
                                    ">
                                 <span style="color: #ff5227 !important"><b>Call</b> +1 (833)
                                 233-4447</span>
                                 </a>
                              </div>
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="https://tawk.to/chat/61cd6c5dc82c976b71c415f2/1fo56ukbg"
                                    target="_blank" style="
                                    background: #fff;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: #ff5227 !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    ">
                                 <span style="color: #ff5227 !important"><b>Chat</b> with
                                 us</span>
                                 </a>
                              </div>
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <td style=""> <br>
                           Please, find your personalized quote below which includes:
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td colspan="2" style="padding: 0 30px 0 30px" class="quote-cell">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: left">
                     <tr>
                        <td style="padding-right: 15px; padding-bottom: 5px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">$0 upfront payment</span>
                        </td>
                        <td style="padding-bottom: 5px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Full-insurance
                           coverage</span>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding-right: 15px; padding-bottom: 30px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Free cancellation</span>
                        </td>
                        <td style="padding-bottom: 30px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Door-to-door
                           transport</span>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 0 30px 0 30px" class="quote-cell">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0"
                     style="border-radius: 6px; background: #fff" bgcolor="#fff">
                     <tr>
                        <td colspan="2" style="
                           font-size: 24px;
                           text-align: center;
                           text-transform: uppercase;
                           padding: 15px 0 15px 0;
                           background-color: #ff5227;
                           color: #fff;
                           ">
                           Quote ID: <b> 
                           '${formData.quote_id}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Name :
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ' ${formData.username}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="50%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 50%;
                           padding: 15px 0 15px 15px;
                           ">
                           First Available Pick-up Date:
                        </td>
                        <td width="50%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 50%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.pickup_date}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Distance:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.distance}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Time to deliver:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> 3-5 calendar days </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Vehicle:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ' ${formData.year}' ' ${formData.make}' ' ${formData.model}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Vehicle Size / Vehicle Type :
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.vehicle_type}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           From:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.ship_form}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           To:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ${formData.ship_to}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Transport Method:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ${formData.transport_method}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Service Type:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> Door-to-door </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Insurance:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> Already Included </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           color: #ff5227;
                           font-weight: bold;
                           width: 40%;
                           padding: 15px 0 0 15px;
                           ">
                           Pay now:
                        </td>
                        <td width="60%" rowspan="2" align="right" style="
                           text-align: right;
                           color: #ff5227;
                           font-size: 18px;
                           width: 60%;
                           padding: 0 15px 0 0;
                           font-size: 28px;
                           ">
                           <b> $0 </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="100%" colspan="2" align="left" style="
                           color: #ff5227;
                           font-size: 14px;
                           font-style: italic;
                           text-align: left;
                           width: 100%;
                           padding: 5px 60px 15px 15px;
                           ">
                           We don’t require any upfront payments! We will collect the
                           payment (partial or in full) once the carrier has been
                           dispatched for your order. You will be notified via phone
                           and email.
                        </td>
                     </tr>
                     <tr>
                        <td colspan="2" style="
                           background-image: url(https://rapidautoshipping.com/assets/images//car-key-new1.jpeg);
                           background-position:center;
                           background-repeat:no-repeat;
                           background-size:cover;
                           font-size: 22px;
                           text-align: center;
                           padding: 30px 15px;
                           ">
                           <span
                              style="font-size:28px; color: #ffffff !important">Ready
                           to book? Don’t
                           wait!
                           <span class="mobile-block">Reserve your shipment now…</span></span> <br><br>
                           <div
                              style="display:flex; flex-wrap:wrap; justify-content:center; column-gap:20px; row-gap:20px;">
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="tel:+1-833-233-4447" style="
                                    background: #ff5227;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: white !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    white-space: nowrap;
                                    ">
                                 <span style=""><b>Call</b> +1 (833)
                                 233-4447</span>
                                 </a>
                              </div>
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="https://tawk.to/chat/61cd6c5dc82c976b71c415f2/1fo56ukbg"
                                    target="_blank" style="
                                    background: #ff5227;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: white !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    ">
                                 <span style=""><b>Chat</b> with
                                 us</span>
                                 </a>
                              </div>
                           </div>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="padding: 15px 30px 15px 30px; text-align: center" class="quote-cell">
                  Our company is licensed as required by the Federal Motor Carrier
                  Safety Administration (FMCSA) under MC 873392 and US Department
                  of Transportation (USDOT) 2521690.
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 0 30px 0 30px" class="quote-cell">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                     <tr>
                        <td style="padding: 15px 7px 15px 8px; width: 50%">
                           <div style="
                              border: 1px solid #5d5c5c;
                              border-radius: 6px;
                              background: #fff;
                              width: 100%;
                              ">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-top: 5px;
                                       ">
                                       Google
                                    </td>
                                    <td rowspan="2" class="rating-cell" style="
                                       text-align: right;
                                       font-size: 30px;
                                       padding-bottom: 5px;
                                       font-weight: bold;
                                       padding-top: 5px;
                                       padding-right: 10px;
                                       ">
                                       4.9
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       ">
                                       <img class="reviews-stars"
                                          src="https://rapidautoshipping.com/assets/images/review-stars.png"
                                          alt="5 star" width="auto" height="20"
                                          style="display: block" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td class="reviews-count-cell" style="
                                       text-align: left;
                                       font-size: 14px;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       (1,458 reviews)
                                    </td>
                                    <td style="
                                       text-align: right;
                                       padding-right: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       <img src="https://rapidautoshipping.com/assets/images/google-mini-logo.png"
                                          class="desktop-logo" height="24" width="auto"
                                          alt="Google Logo" />
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </td>
                        <td style="padding: 15px 0 15px 0; width: 50%">
                           <div style="
                              border: 1px solid #5d5c5c;
                              border-radius: 6px;
                              background: #fff;
                              width: 100%;
                              ">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-top: 5px;
                                       ">
                                       Transport Reviews
                                    </td>
                                    <td rowspan="2" class="rating-cell" style="
                                       text-align: right;
                                       font-size: 30px;
                                       padding-bottom: 5px;
                                       font-weight: bold;
                                       padding-top: 5px;
                                       padding-right: 10px;
                                       ">
                                       4.8
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       ">
                                       <img class="reviews-stars"
                                          src="https://rapidautoshipping.com/assets/images/review-stars.png"
                                          alt="5 star" width="auto" height="20"
                                          style="display: block" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td class="reviews-count-cell" style="
                                       text-align: left;
                                       font-size: 14px;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       (185 reviews)
                                    </td>
                                    <td style="
                                       text-align: right;
                                       padding-right: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       <img src="https://rapidautoshipping.com/assets/images/TransportReviewsLogo.png"
                                          class="desktop-logo" height="24" width="auto"
                                          alt="transport Review" />
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #f2f2f2; padding: 30px 15px 30px 15px">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                     style="text-align: center">
                     <tr>
                        <td style="font-size: 24px; padding: 0px 0 30px 0">
                           If you have any questions,<br />do not hesitate to contact
                           us:
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <b>Phone:</b>
                           <a target="_blank" href="tel:+1-833-233-4447"
                              style="color: #000000 !important; text-decoration: none">+1 (833)
                           233-4447</a>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <b>Email:</b>
                           <a target="_blank" href="mailto:info@rapidautoshipping.com"
                              style="color: #000000 !important; text-decoration: none">info@rapidautoshipping.com</a>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <a target="_blank" href="https://www.rapidautoshipping.com"
                              style="color: #000000 !important; text-decoration: none">www.rapidautoshipping.com</a>
                        </td>
                     </tr>
                     <tr>
                        <td>906 S Main Street Silverton Texas USA-79257</td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 30px 15px 30px 15px">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                     style="color: #333333; font-size: 14px; text-align: center">
                     <tr>
                        <td style="padding: 0px 0 5px 0; font-size: 12px">
                           This email was sent to you from Rapid Auto Shipping.
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
      </td>
   </tr>
</table>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail, // Send email to the recipient from the form database
    subject: 'Thankyou for Submiting Form',
    html: htmlContent, // Use HTML content
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
        sendEmail(form.email, form);
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
    sendEmail(email, formData); // Send email to the email in the form

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
   let updatedData = req.body;
 
   try {
     // Check if ID is valid
     if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: "Invalid form ID" });
     }
 
     // Check if 'picked_by' field exists in the update and remove it if it's already been set
     const form = await Form.findById(id);
 
     if (form && form.picked_by) {
       // If 'picked_by' is already set, don't allow it to be updated again
       delete updatedData.picked_by;
     }
 
     // Perform the update
     const updatedForm = await Form.findByIdAndUpdate(id, updatedData, {
       new: true,
       runValidators: true,
     });
 
     if (!updatedForm) {
       return res.status(404).json({ message: "Form not found" });
     }
 
     // Send the response
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
