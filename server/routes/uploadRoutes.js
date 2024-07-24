const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// store
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

// Upload img
router.post('/', upload.single('image'), (req, res) => {
    const image = req.file;

    if (!image) {
        return res.status(400).json({ error: 'Image is required' });
    }

    res.json({
        message: 'File uploaded successfully',
        imageUrl: `/uploads/${image.filename}`
    });
});

module.exports = router;
