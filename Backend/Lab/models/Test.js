const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  billNo: Number,
  id: Number,
  name: String,
  bill: String,
  tests: String,
  status: String,
  date: String,
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
