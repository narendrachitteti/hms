const LabEditPatientSchema = require('../models/LabEditPatientModel');

// Controller functions for fetching and updating data
exports.getEditData = async (req, res) => {
    try {
        const editData = await LabEditPatientSchema.findOne(); // You might need to adjust this query
        res.json(editData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateData = async (req, res) => {
    try {
        const updatedData = req.body; // Assuming the request body contains the updated data
        await LabEditPatientSchema.findOneAndUpdate({}, updatedData); // You might need to adjust this query
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
