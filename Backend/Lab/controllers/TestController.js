const Test = require('../models/Test');

exports.getAllTests = async (req, res) => {
  try {
    console.log('Request received for getAllReports');
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



// Create a new test
exports.createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create test' });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
};

// Get a specific test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test' });
  }
};

// Update a test by ID
exports.updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update test' });
  }
};

// Delete a test by ID
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndRemove(req.params.id);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete test' });
  }
};


