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
  medid: String,
  medname: String,
  manufacturer: String,
  category: String,
  stock: Number,
  stockalert: String,
  edit: String,
});

const Property = mongoose.model('Property', propertySchema);

app.post('/Listmedicines', async (req, res) => {
  const propertyData = req.body;

  // Check if stock is below 50 and set stockalert property accordingly
  if (propertyData.stock < 50) {
    propertyData.stockalert = 'true';
    // Here, you can also send a message to the supplier
    // You can use a messaging service or send an email to the supplier
  } else {
    propertyData.stockalert = 'false';
  }

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.put('/Listmedicines/:id', async (req, res) => {
  const { id } = req.params;
  const updatedMedicineData = req.body;

  try {
    // Find the medicine by ID
    const existingMedicine = await Property.findById(id);

    if (!existingMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    // Update the medicine's stock value
    existingMedicine.medid = updatedMedicineData.medid;
    existingMedicine.medname = updatedMedicineData.medname;
    existingMedicine.manufacturer = updatedMedicineData.manufacturer;
    existingMedicine.category = updatedMedicineData.category;
    existingMedicine.stock = updatedMedicineData.stock;

    // Check if stock is below 50 and set stockalert property accordingly
    if (existingMedicine.stock < 50) {
      existingMedicine.stockalert = 'true';
      // Here, you can also send a message to the supplier
      // You can use a messaging service or send an email to the supplier
    } else {
      existingMedicine.stockalert = 'false';
    }

    // Save the updated medicine
    await existingMedicine.save();

    res.status(200).json({ message: 'Medicine updated successfully.' });
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});