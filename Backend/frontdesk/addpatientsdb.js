const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/PatientsData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const itemSchema = new mongoose.Schema({
  type: String,
  price: String,
  discount: String,
});

const combinedSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  name: String,
  gender: String,
  age: Number,
  mobile: String,
  bloodGroup: String,
  email: String,
  address: String,
  city: String,
  area: String,
  referredBy: String,
  channel: String,
  items: [itemSchema],
  doctor: String,
  date: String,
  duration: String,
  hour: String,
  minute: String,
  timeOfDay: String,
  totalAmount: Number,
  paymentMode: String,
  AmountStatus:String,
});

const CombinedData = mongoose.model('CombinedData', combinedSchema);

// Function to generate and assign a unique sequential ID
async function generateAndAssignId() {
  const sequenceName = 'combinedDataId';

  // Find the sequence document for combinedDataId and update it atomically
  const sequence = await db.collection('sequences').findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { upsert: true, returnOriginal: false }
  );

  const formattedId = `JC${String(sequence.value.sequence_value).padStart(5, '0')}`;

  return formattedId;
}

app.post('/api/v1/combined-data', async (req, res) => {
  try {
    // Generate a new ID
    const newId = await generateAndAssignId();

    // Create a new document with the generated ID
    const combinedData = new CombinedData({
      patientId: newId, // Change 'id' to 'patientId'
      ...req.body, // Copy other fields from the request body
    });

    await combinedData.save();
    res.status(201).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add data' });
  }
});


// // Updated GET route to accept formType as a query parameter
app.get('/api/v1/combined-data', async (req, res) => {
  try {
    const { formType } = req.query;

    let query = {}; // Define an empty query object

    if (formType) {
      // If formType is provided, add it to the query
      query = { type: formType };
    }

    const data = await CombinedData.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/v1/combined-data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching Patient Details with ID:', id);

    const combinedData = await CombinedData.findOne({ patientId: id }); // Query by patientId
    console.log('Fetched Patients Details:', combinedData);

    if (!combinedData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
