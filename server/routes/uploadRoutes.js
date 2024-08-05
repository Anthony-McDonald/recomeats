const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp"); // Add sharp for image processing
const authorisation = require("../middleware/authorise");

const router = express.Router();

// Store image
const uploadsDir = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const newWidth = 800;  
const newHeight = 600; 

// Image upload post
router.post('/', authorisation, upload.single('image'), async (req, res) => {
    const image = req.file;

    if (!image) {
        return res.status(400).json({ error: 'Image is required' });
    }

    // Uses sharp to process image
    try {
        await sharp(image.path)
            .resize(newWidth, newHeight) 
            .toFile(path.join(uploadsDir, 'resized-' + image.filename));

        fs.unlinkSync(image.path);

        res.json({
            imageUrl: `resized-${image.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

module.exports = router;
