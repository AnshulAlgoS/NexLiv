const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const propertyRoutes = require('./routes/properties');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// In-memory fallback
let useInMemory = false;
let memoryDb = [];

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roomgi';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB, switching to In-Memory mode for demo:', err.message);
    useInMemory = true;
  });

// Middleware to handle in-memory if DB is down
app.use('/api/properties', (req, res, next) => {
  if (useInMemory) {
    if (req.method === 'GET') {
        // Return reverse chronological
        return res.json(memoryDb.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
    if (req.method === 'POST') {
       const newProp = { 
           ...req.body, 
           _id: Date.now().toString(),
           createdAt: new Date()
       };
       memoryDb.push(newProp);
       console.log('Saved to memory DB:', newProp.title);
       return res.status(201).json(newProp);
    }
  }
  next();
});

app.use('/api/properties', propertyRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
