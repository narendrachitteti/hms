const express = require('express');
const router = express.Router();
const labPatientController = require('../controllers/LabPatientController');

// Define a route for fetching users' data
router.get('/labPatient', labPatientController.getlabPatient);

module.exports = router;
