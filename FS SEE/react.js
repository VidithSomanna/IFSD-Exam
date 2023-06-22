const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://vidithscbsc:nomadviahints@cluster0.yaqcztj.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a Politician schema and model
const politicianSchema = new mongoose.Schema({
  name: String,
  votes: Number,
  money: Number,
});

const Politician = mongoose.model('Politician', politicianSchema);

// Express route to fetch politicians
app.get('/api/politicians', async (req, res) => {
  try {
    // Fetch all politicians from MongoDB
    const politicians = await Politician.find();
    res.json(politicians);
  } catch (error) {
    console.error('Error fetching politicians:', error);
    res.status(500).json({ error: 'Failed to fetch politicians' });
  }
});

// Express route to create a new politician
app.post('/api/politicians', async (req, res) => {
  try {
    const { name, votes, money } = req.body;

    // Create a new politician
    const politician = new Politician({ name, votes, money });

    // Save the politician to MongoDB
    await politician.save();

    res.status(201).json(politician);
  } catch (error) {
    console.error('Error creating politician:', error);
    res.status(500).json({ error: 'Failed to create politician' });
  }
});

// Express route to update a politician
app.put('/api/politicians/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Find the politician by name and update the votes count
    const politician = await Politician.findOneAndUpdate(
      { name },
      { $inc: { votes: 1 } },
      { new: true }
    );

    res.json(politician);
  } catch (error) {
    console.error('Error updating politician:', error);
    res.status(500).json({ error: 'Failed to update politician' });
  }
});

// Express route to delete a politician
app.delete('/api/politicians/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Find the politician by name and delete it
    await Politician.findOneAndDelete({ name });

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting politician:', error);
    res.status(500).json({ error: 'Failed to delete politician' });
  }
});

// Start the server
app.listen(5500, () => {
  console.log(`Server is running on port 5500`);
});
