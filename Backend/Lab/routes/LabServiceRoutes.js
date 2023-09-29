const express = require('express');
const router = express.Router();
const labServiceController = require('../controllers/LabServiceController');

// Define routes for lab service CRUD operations
router.get('/lab-services/', labServiceController.getAllLabServices);
router.post('/lab-services/', labServiceController.createLabService);
router.put('/lab-services/:id', labServiceController.updateLabService);
router.delete('/lab-services/:id', labServiceController.deleteLabService);

module.exports = router;
