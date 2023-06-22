const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/politiciansDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create Politician schema
const politicianSchema = new mongoose.Schema({
  name: String,
  votes: Number,
  money: Number
});

// Create Politician model
const Politician = mongoose.model('Politician', politicianSchema);

// Create Express app
const app = express();

// Enable JSON body parsing
app.use(express.json());

// POST route for creating a new politician
app.post('/politicians', (req, res) => {
  const { name, votes, money } = req.body;

  // Create a new Politician instance
  const politician = new Politician({
    name,
    votes,
    money
  });

  // Save the politician to MongoDB
  politician.save()
    .then(() => {
      res.status(201).json({ message: 'Politician created successfully' });
    })
    .catch((error) => {
      console.error('Error creating politician:', error);
      res.status(500).json({ error: 'Failed to create politician' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
