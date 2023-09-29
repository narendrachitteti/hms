const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  testName: String,
  testPrice: Number,
  serviceTax: Number,
  testCode: String,
  selectedVendor: String,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
