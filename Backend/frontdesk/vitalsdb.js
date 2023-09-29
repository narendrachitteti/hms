
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Vitals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const patientSchema = new mongoose.Schema({
  patientId: String,
  bp: String,
  sugar: String,
  weight: String,
  height: String,
  temperature: String,
  spo2: String,
  pallor: String,
  edema: String,
  lcterus: String,
  lymphadenopathy: String,
  ciubbing: String,
  cyanosis: String,
  jvp: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Route to get patient vitals
app.get('/patient/Vitals', async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findOne({ patientId: id });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const vitals = patient.vitals;

    res.status(200).json(vitals);
  } catch (error) {
    console.error('Error fetching patient vitals:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/patient/Vitals', async (req, res) => {
  try {
    const vitals = req.body;
    // Create a new Vitals document and save it to MongoDB
    const newVitals = new Patient(vitals);
    await newVitals.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving vitals:', error);
    res.status(500).json({ error: 'Failed to save data', details: error.message });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
