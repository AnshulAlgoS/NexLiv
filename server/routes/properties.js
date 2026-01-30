const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new property
router.post('/', async (req, res) => {
  try {
    // If photos are uploaded, they would be handled by multer/cloud storage
    // For now, we assume image URLs or handle basic base64/local paths if passed
    const property = new Property(req.body);
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
