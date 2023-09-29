const mongoose = require('mongoose');

const labEditPatientSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    mobile: String,
    existingId: String,
    bloodGroup: String,
    email: String,
    address: String,
    city: String,
    area: String,
    referredBy: String,
    channel: String,
});

module.exports = mongoose.model('LabEditPatient', labEditPatientSchema);
