// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

// Define a schema for your stock adjustment data
const stockAdjustmentSchema = new mongoose.Schema({
  madicinename: String,
  personname: String,
  gstNumber: String,
  time: String,
  beforestocks: String,
  afterstocks: Number,
  stockdifference: Number,
});

// Define a model for your stock adjustment data
const StockAdjustment = mongoose.model('StockAdjustment', stockAdjustmentSchema);

// API endpoint to fetch stock adjustment data with optional date range filtering
app.get('/api/stockadjustment', async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const query = {};
    
    if (fromDate && toDate) {
      query.time = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }
    
    const stockAdjustments = await StockAdjustment.find(query);
    res.json(stockAdjustments);
  } catch (error) {
    console.error('Failed to fetch stock adjustment data:', error);
    res.status(500).json({ error: 'Failed to fetch stock adjustment data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));