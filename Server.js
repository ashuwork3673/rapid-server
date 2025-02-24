const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // For checking directory existence
require("dotenv").config();

const formRoutes = require("./routes/formRoutes");
const emailRouter = require("./routes/emailRouter");
const blogRoutes = require("./routes/blogRoutes");
const statetostateRoutes = require("./routes/routes.routes");
const servicesRoutes = require("./routes/servicesRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cardRoutes = require("./routes/cardRoutes");
const carrierRoutes = require("./routes/carrierRoutes");
const selected_carrierRoutes = require("./routes/selected_carrierRoutes");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const city_to_cityRoutes = require("./routes/city_to_cityRoutes");
const newslugRoutes = require("./routes/newslugRoutes");
const nstatetostate = require("./routes/nstatetostateRoutes");
const auto_tranport_carrier = require("./routes/auto_tranport_carrierRoutes");
const review = require("./routes/reviewRoutes");
const uplaodimg = require("./routes/uploadimgRoutes");
const makeRoutes = require("./routes/makeRoutes");
const modelRoutes = require("./routes/modelRoutes");
const sms = require("./routes/smsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/threeStepForm",

  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Static file serving for uploaded images
app.use("/uploads", express.static(uploadDir));

// API routes
app.use("/api/form", formRoutes);
app.use("/api", emailRouter);
app.use("/api", blogRoutes);
app.use("/api/state_to_state", statetostateRoutes);
app.use("/api", servicesRoutes);
app.use("/api", stateRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/carriers", carrierRoutes);
app.use("/api/selected_carrier", selected_carrierRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", carRoutes);
app.use("/api", city_to_cityRoutes);
app.use("/api", newslugRoutes);
app.use("/api/nstate_to_state", nstatetostate);
app.use("/api/auto_tranport_carrier", auto_tranport_carrier);
app.use("/api", review);
app.use("/api", sms);
app.use("/api", uplaodimg);
app.use("/api/make", makeRoutes);
app.use("/api/model", modelRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
