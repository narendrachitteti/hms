const Report = require('../models/Reports');

exports.getAllReports = async (req, res) => {
  try {
    // console.log('Request received for getAllReports');
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
