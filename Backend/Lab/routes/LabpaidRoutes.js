const express = require('express');
const router = express.Router();
const paidController = require('../controllers/LabpaidController');

// Define routes for the "paid" collection
router.get('/labpaid', paidController.getAllLabPaidData);
router.delete('/labpaid/:id', paidController.deleteLabPaidRecord);

module.exports = router;
