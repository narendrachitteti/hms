const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Modify the stockist schema to use _id as the identifier
const stockistSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Use ObjectId as the type for _id
  name: String,
  gstNumber: String,
  email: String,
  addDate: String,
  totalBalance: Number,
  totalPaid: Number,
  balance: Number,
});

const Stockist = mongoose.model('Stockist', stockistSchema);




// Enable CORS
app.use(cors());

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// API endpoint to fetch stockist data
app.get('/api/stockists', async (req, res) => {
  try {
    const stockists = await Stockist.find();
    res.json(stockists);
  } catch (error) {
    console.error('Error fetching stockists:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.put('/api/stockists/:id', async (req, res) => {
  const stockistId = req.params.id;
  const updatedStockistData = req.body;

  try {
    const updatedStockist = await Stockist.findByIdAndUpdate(stockistId, updatedStockistData, { new: true });
    res.json(updatedStockist);
  } catch (error) {
    console.error('Error updating stockist:', error);
    res.status(500).json({ error: 'An error occurred while updating the stockist' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});