const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // For checking directory existence
require("dotenv").config();

const formRoutes = require("./routes/formRoutes");
const emailRouter = require('./routes/emailRouter');
const blogRoutes = require('./routes/blogRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // Import the upload routes
const stateToStateRoutes = require('./routes/stateToStateRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cardRoutes = require('./routes/cardRoutes');
const carrierRoutes = require('./routes/carrierRoutes');
const selected_carrierRoutes = require('./routes/selected_carrierRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/threeStepForm",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.error("MongoDB connection error:", error));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Static file serving for uploaded images
app.use('/uploads', express.static(uploadDir));

// API routes
app.use("/api/form", formRoutes);
app.use('/api', emailRouter);
app.use('/api', blogRoutes);
app.use('/api', uploadRoutes);
app.use('/api/state-to-state', stateToStateRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/carriers', carrierRoutes);
app.use('/api/selected_carrier', selected_carrierRoutes);
app.use('/api/auth', authRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
