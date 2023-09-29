// models/bill.js

const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    services: [{
      name: String,
      price: Number,
      discount: Number,
      discountedPrice:Number,
    }],
    consultationFee: Number,
    totalBalance: Number,
    paymentMode: String,
    email: String,
    labreferal:String
  });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
