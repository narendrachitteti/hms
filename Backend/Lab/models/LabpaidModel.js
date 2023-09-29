const mongoose = require('mongoose');

const LabPaidSchema = new mongoose.Schema({
  dateTime: String,
  billNumber: Number,
  type: String,
  amount: Number,
  mode: String,
  category: String,
  action: String,
});

module.exports = mongoose.model('LabPaid', LabPaidSchema);
