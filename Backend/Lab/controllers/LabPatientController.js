const ReturnModel = require('../models/LabPatientModel');

// Controller functions for fetching users' data
exports.getlabPatient = async (req, res) => {
    try {
        const labPatient = await ReturnModel.find();
        res.status(200).json(labPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch labPatient' });
    }
};
