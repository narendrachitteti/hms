const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // You can choose a different port if needed

// Enable CORS for all routes (for development, you may want to restrict this)
app.use(cors());

// Sample billing data (you should replace this with your actual data retrieval logic)
const billingData = {
  billed: 60,
  outstanding: 60,
  collection: 0,
  cash: 0,
  card: 0,
  mobile: 0,
  return: 0,
};

// Define a route to retrieve billing data
app.get('/api/billing', (req, res) => {
  res.json(billingData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});