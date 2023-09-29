const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5006;

mongoose.connect('mongodb://127.0.0.1:27017/ExistingPatientsData', {
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

async function generateAndAssignId() {
  const sequenceName = 'combinedDataId';

  const sequence = await db.collection('sequences').findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { upsert: true, returnOriginal: false }
  );

  const formattedId = `JC${String(sequence.value.sequence_value).padStart(5, '0')}`;

  return formattedId;
}

app.post('/api/v1/existingpatients-data', async (req, res) => {
    try {
  
      const combinedData = new CombinedData({
        patientId: req.body.patientData.patientId,
        name: req.body.patientData.name,
        gender: req.body.patientData.gender,
        age: req.body.patientData.age,
        mobile: req.body.patientData.mobile,
        bloodGroup: req.body.patientData.bloodGroup,
        email: req.body.patientData.email,
        address: req.body.patientData.address,
        items: req.body.services, // Correctly map the services to items
        doctor: req.body.appointment.doctor,
        date: req.body.appointment.date,
        duration: req.body.appointment.duration,
        hour: req.body.appointment.time.split(':')[0],
        minute: req.body.appointment.time.split(':')[1],
        timeOfDay: req.body.appointment.time.split(' ')[1],
        totalAmount: req.body.payment.totalAmount,
        paymentMode: req.body.payment.mode,
        AmountStatus: req.body.payment.amountStatus,
      });
  
      await combinedData.save();
      res.status(201).json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add data' });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
