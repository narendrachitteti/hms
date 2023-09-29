const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    billNo: Number,
    id: Number,
    name: String,
    bill: String,
    tests: String,
    status: String,
    date: String,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
