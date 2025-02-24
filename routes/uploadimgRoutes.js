const express = require("express");
const multer = require("multer");
const Img = require("../models/uploadimg"); // Ensure this path is correct
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/image"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Allow only images
    const extname = fileTypes.test(file.mimetype);
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

// Route to create a new image entry
router.post("/imgs", upload.array("imgs", 5), async (req, res) => {
  try {
    const { quote_id, make, model, year } = req.body;
    const imgPaths = req.files.map((file) => file.path); // Extract file paths

    const img = new Img({
      quote_id,
      make,
      model,
      year,
      img: imgPaths,
    });

    await img.save();
    res
      .status(201)
      .json({ message: "Images uploaded successfully", images: imgPaths });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all images
router.get("/imgs", async (req, res) => {
  try {
    const imgs = await Img.find();
    res.status(200).json(imgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a single image by ID
router.get("/imgs/:id", async (req, res) => {
  try {
    const img = await Img.findById(req.params.id);
    if (!img) return res.status(404).json({ message: "Image not found" });

    res.status(200).json(img);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an image
router.put("/imgs/:id", upload.array("imgs", 50), async (req, res) => {
  try {
    const { quote_id, make, model, year } = req.body;
    const imgPaths = req.files.map((file) => file.path); // Extract file paths

    const img = await Img.findByIdAndUpdate(
      req.params.id,
      { quote_id, make, model, year, img: imgPaths },
      { new: true } // Return the updated document
    );

    if (!img) return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ message: "Image updated successfully", img });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete an image
router.delete("/imgs/:id", async (req, res) => {
  try {
    const img = await Img.findByIdAndDelete(req.params.id);
    if (!img) return res.status(404).json({ message: "Image not found" });

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
