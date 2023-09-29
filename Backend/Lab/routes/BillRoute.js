// routes/billRoutes.js

const express = require('express');
const router = express.Router();
const billController = require('../controllers/BillController');

// Define route to save a bill
router.post('/save-bill', billController.saveBill);

module.exports = router;
