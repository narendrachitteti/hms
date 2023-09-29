const mongoose = require('mongoose');

const labServiceSchema = new mongoose.Schema({
    serviceId: Number,
    testName: String,
    testPrice: Number,
    serviceTax: Number,
    testCode: String,
    selectedVendor: String,
});

module.exports = mongoose.model('LabService', labServiceSchema);
