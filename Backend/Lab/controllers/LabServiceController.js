const LabService = require('../models/LabServiceModel');

// Controller functions for CRUD operations
exports.getAllLabServices = async (req, res) => {
    try {
        const labServices = await LabService.find();
        res.json(labServices);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching lab services' });
    }
};

exports.createLabService = async (req, res) => {
    const labServiceData = req.body;

    try {
        const newLabService = new LabService(labServiceData);
        await newLabService.save();
        res.status(201).json(newLabService);
    } catch (error) {
        res.status(400).json({ error: 'Error adding lab service' });
    }
};

exports.updateLabService = async (req, res) => {
    const labServiceId = req.params.id;
    const labServiceData = req.body;

    try {
        const updatedLabService = await LabService.findByIdAndUpdate(
            labServiceId,
            labServiceData,
            { new: true }
        );
        res.json(updatedLabService);
    } catch (error) {
        res.status(400).json({ error: 'Error updating lab service' });
    }
};

exports.deleteLabService = async (req, res) => {
    const labServiceId = req.params.id;

    try {
        await LabService.findByIdAndDelete(labServiceId);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Error deleting lab service' });
    }
};
