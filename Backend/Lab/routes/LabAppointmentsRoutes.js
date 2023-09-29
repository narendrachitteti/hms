const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/LabAppointmentsController');

// Define routes for appointments
router.post('/create-appointment', appointmentsController.createLabAppointment);
router.put('/update-appointment/:id', appointmentsController.updateLabAppointment);
router.get('/fetch-appointments', appointmentsController.fetchLabAppointments);

module.exports = router;
