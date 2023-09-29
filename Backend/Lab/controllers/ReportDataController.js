const ReportData = require('../models/ReportDataModel');

// Controller function to save data
exports.saveData = async (req, res) => {
  try {
    const formData = req.body;
    const savedData = await ReportData.create(formData);
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

// Controller function to fetch data
exports.fetchData = async (req, res) => {
  try {
    const fetchedData = await ReportData.findOne().sort({ _id: -1 });
    if (!fetchedData) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(fetchedData);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
