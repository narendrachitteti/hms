const mongoose = require('mongoose');

const labPatientSchema = new mongoose.Schema({
    Date: String,
    View: String
});

module.exports = mongoose.model('labpatient', labPatientSchema);
