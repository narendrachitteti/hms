const LabBilling = require('../models/LabbillingModel');

// Controller functions for fetching billing data
exports.getAllLabBilling = async (req, res) => {
    try {
        const data = await LabBilling.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteLabBillingById = async (req, res) => {
    try {
        const deletedRecord = await LabBilling.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
