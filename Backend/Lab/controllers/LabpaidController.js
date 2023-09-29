const Paid = require('../models/LabpaidModel');

// Controller functions for CRUD operations
exports.getAllLabPaidData = async (req, res) => {
  try {
    const data = await Paid.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteLabPaidRecord = async (req, res) => {
  try {
    const deletedRecord = await Paid.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
