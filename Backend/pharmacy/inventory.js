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
  medicinename: String,
  remainingunits: String,
  expirydate: Date, // Add expiry date field
});

const Property = mongoose.model('Property', propertySchema);

app.post('/inventorydata', async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/inventorydata', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/inventorydata/expiry', async (req, res) => {
  const currentDate = new Date();

  try {
    const expiryProperties = await Property.find({ expirydate: { $lt: currentDate } });
    res.status(200).json(expiryProperties);
  } catch (error) {
    console.error('Error fetching expiry properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/inventorydata/low', async (req, res) => {
  try {
    const lowProperties = await Property.find({ remainingunits: { $lt: 10 } });
    res.status(200).json(lowProperties);
  } catch (error) {
    console.error('Error fetching low properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/inventorydata/zero', async (req, res) => {
  try {
    const zeroProperties = await Property.find({ remainingunits: 0 });
    res.status(200).json(zeroProperties);
  } catch (error) {
    console.error('Error fetching zero properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
