const express = require('express');
const router = express.Router();
const reportDataController = require('../controllers/ReportDataController');

// Define routes for parameter data
router.post('/reportdata', reportDataController.saveData);
router.get('/reportdata', reportDataController.fetchData);

module.exports = router;
