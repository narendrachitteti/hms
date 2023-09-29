const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

let lastAssignedId = 0;

const CreatePurchaseOrderSchema = new mongoose.Schema({
  id: Number,
  stockListName:String,
  date:String, // Changed the type to Number
  Medicine: String,
  unitstrips: String,
 NoOfStrips: String,
  Edit: String,
});

const CreatePurchaseOrder = mongoose.model('CreatePurchaseOrder', CreatePurchaseOrderSchema);
const Medicine = mongoose.model('Medicine', {
  Medicine: String,
  unitstrips: String,
  NoOfStrips: Number,
});
app.post('/addMedicine', async (req, res) => {
  try {
    // Create a new medicine instance based on the request body
    const newMedicine = new Medicine({
      Medicine: req.body.Medicine,
      unitstrips: req.body.unitstrips,
      NoOfStrips: req.body.NoOfStrips,
    });

    // Save the medicine data to the database
    await newMedicine.save();

    res.status(200).json({ message: 'Medicine added successfully' });
  } catch (error) {
    console.error('Error adding medicine:', error);
    res.status(500).json({ error: 'An error occurred while adding medicine. Please try again later.' });
  }
});
app.post('/addCreatePurchaseOrder', async (req, res) => {
  try {
    lastAssignedId++;
    const newCreatePurchaseOrder = new CreatePurchaseOrder({
      id: lastAssignedId,
      stockListName:req.body.stockListName,
  date:req.body.date, // Updated the ID to a number
      Medicine: req.body.Medicine, // Updated field name to match frontend
      unitstrips: req.body.unitstrips, // Updated field name to match frontend
     NoOfStrips: req.body.NoOfStrips, // Updated field name to match frontend
      Edit: req.body.Edit, // Updated field name to match frontend
    });

    await newCreatePurchaseOrder.save();
    res.status(201).json(newCreatePurchaseOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add CreatePurchaseOrder' });
  }
});

app.get('/getCreatePurchaseOrders', async (req, res) => {
  try {
    const CreatePurchaseOrders = await CreatePurchaseOrder.find();
    res.status(200).json(CreatePurchaseOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch CreatePurchaseOrders' });
  }
});
app.put('/updateCreatePurchaseOrder/:id',async (req, res) => {
  try {
  const updateCreatePurchaseOrder = await CreatePurchaseOrder.find();
    res.status(200).json(updateCreatePurchaseOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch updateCreatePurchaseOrder' });
  }
});


app.delete('/deleteCreatePurchaseOrder/:id', async (req, res) => {
  const CreatePurchaseOrderId = req.params.id;

  try {
    const deletedCreatePurchaseOrder = await CreatePurchaseOrder.findByIdAndDelete(CreatePurchaseOrderId);
    if (!deletedCreatePurchaseOrder) {
      return res.status(404).json({ error: 'CreatePurchaseOrder not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error deleting CreatePurchaseOrder' });
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});