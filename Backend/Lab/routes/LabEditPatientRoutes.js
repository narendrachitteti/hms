const express = require('express');
const router = express.Router();
const labEditPatientController = require('../controllers/labEditPatientController');

// Define routes for fetching and updating data
router.get('/labEditPatientdata/edit', labEditPatientController.getEditData);
router.put('/labEditPatientdata/update', labEditPatientController.updateData);

module.exports = router;
