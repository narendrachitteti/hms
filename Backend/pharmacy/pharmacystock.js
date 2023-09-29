const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const propertySchema = new mongoose.Schema({
  fid: String,
  medName: String,
  invoice: String,
  batch: String,
  packPrice: String,
  packMRP: String,
  unitPrice: String,
  unitDiscount: String,
  UnitsInStock: String,
  expiryDate: String,
  packPricePercent: String,
  unitDiscountPercent: String,
});

const Property = mongoose.model('pharmacystoackdata', propertySchema);

// Update property by ID
app.put('/pharmacystockdata/:id', async (req, res) => {
  const id = req.params.id;
  const propertyData = req.body;

  try {
    const updatedProperty = await Property.findOneAndUpdate({ _id: id }, propertyData, { new: true });
    if (updatedProperty) {
      res.status(200).json({ message: 'Property updated successfully.', updatedProperty });
    } else {
      res.status(404).json({ error: 'Property not found.' });
    }
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/pharmacystockdata', async (req, res) => {
  try {
    const pharmacystockdata = await Property.find();
    res.status(200).json(pharmacystockdata);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
