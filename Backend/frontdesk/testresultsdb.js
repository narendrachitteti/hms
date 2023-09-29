// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/medical_tests', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testSchema = new mongoose.Schema({
  testName: String,
  result: Number,
  date: Date,
});

const TestModel = mongoose.model('Test', testSchema);

app.get('/api/testTypes', async (req, res) => {
  try {
    const testTypes = await TestModel.distinct('testName');
    res.json(testTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tests/:testType', async (req, res) => {
  try {
    const { testType } = req.params;
    const data = await TestModel.find({ testName: testType });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
