const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5002;

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Prescription', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for Complaints
const complaintsSchema = new mongoose.Schema({
  complaints: [String],
  diagnosis: [String],
  medicine: [{
    sno: Number,
    name: String,
    dose: String,
    when: String,
    frequency: String,
    duration: String,
    notes: String,
  }],
  advice: String,
  dietexercise: String,
  testsRequested: [String],
  testWhen: String,
  nextVisit: String,
  nextVisitType: String,
  nextVisitDate: String,
});

// Create the model
const Complaints = mongoose.model('Complaints', complaintsSchema);

// POST endpoint for saving complaints data
app.post('/api/complaints', async (req, res) => {
  try {
    const {
      complaints,
      diagnosis,
      medicine,
      advice,
      dietexercise,
      testsRequested,
      testWhen,
      nextVisit,
      nextVisitType,
      nextVisitDate,
    } = req.body;

    const newComplaints = new Complaints({
      complaints: complaints,
      diagnosis: diagnosis,
      medicine: medicine,
      advice: advice,
      dietexercise: dietexercise,
      testsRequested: testsRequested,
      testWhen: testWhen,
      nextVisit: nextVisit,
      nextVisitType: nextVisitType,
      nextVisitDate: nextVisitDate,
    });

    await newComplaints.save();

    res.status(200).json({ message: 'Complaints saved successfully' });
  } catch (error) {
    console.error('Error while saving complaints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint for fetching complaints data
app.get('/api/complaints', async (req, res) => {
  try {
    const complaintsData = await Complaints.find();
    console.log(complaintsData); // Add this line to log data
    res.status(200).json(complaintsData);
  } catch (error) {
    console.error('Error fetching complaints data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
