const express = require('express');
const router = express.Router();
const LabbillingController = require('../controllers/LabbillingController');

// Define a route for fetching all billing data
router.get('/labbilling', LabbillingController.getAllLabBilling);

// Define a route for deleting billing data by ID
router.delete('/labbilling/:id', LabbillingController.deleteLabBillingById);

module.exports = router;
