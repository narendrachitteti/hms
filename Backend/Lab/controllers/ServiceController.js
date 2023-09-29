const Service = require('../models/Service');

exports.getAllService = async (req, res) => {
  try {
    console.log('Request received for getAllReports');
    const service = await Service.find();
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};