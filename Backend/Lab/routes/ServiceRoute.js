const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServiceController');

router.get('/Service', serviceController.getAllService);

module.exports = router;
