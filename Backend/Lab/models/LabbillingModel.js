const mongoose = require('mongoose');

const labbillingSchema = new mongoose.Schema({
    date: String,
    bill: Number,
    department: String,
    paid: Number,
    printerValue: Number,
    discountper: String,
    due: Number,
    refund: Number,
    service: String,
    price: Number,
    gst: Number,
    discount: Number,
    deleteColor: String,
});

module.exports = mongoose.model('LabBilling', labbillingSchema);
