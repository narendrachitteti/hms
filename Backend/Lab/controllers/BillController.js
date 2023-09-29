// controllers/billController.js

const Bill = require('../models/Bills');

// Controller function to save a new bill
exports.saveBill = async (req, res) => {
  const billData = req.body;

  try {
    const newBill = new Bill(billData);
    await newBill.save();
    res.status(201).send('Bill saved successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
