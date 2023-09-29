const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');

router.get('/tests', testController.getAllTests);
router.post('/tests', testController.createTest);



// Get a specific test by ID
router.get('/tests/:_id', testController.getTestById);

// Update a test by ID
router.put('/tests/:_id', testController.updateTest);

// Delete a test by ID
router.delete('/tests/:_id', testController.deleteTest);


module.exports = router;
