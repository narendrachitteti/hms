const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors"); // Import the cors package
// const routes = require('./index'); // Import the combined routes
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Import dotenv
dotenv.config({ path: 'Config/.env' }); // Load environment variables from config/.env file


const app = express();

app.use(cors()); // Use the cors middleware to enable CORS

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(bodyParser.json());

const testRoutes = require('./routes/TestRoute');
const reportsRoutes = require('./routes/ReportRoute')
const ServiceRouter = require('./routes/ServiceRoute');
const BillRoutes = require('./routes/BillRoute');
const labServiceRoutes = require('./routes/LabServiceRoutes'); // Import the lab service routes
const labEditPatientRoutes = require('./routes/LabEditPatientRoutes'); // Import the lab data routes
const labPatientRoutes = require('./routes/LabPatientRoutes'); // Import the users' routes
const labbillingRoutes = require('./routes/LabbillingRoutes');
const labpaidRoutes = require('./routes/LabpaidRoutes');
const reportDataRoutes = require('./routes/ReportDataRoutes');
const labappointmentsRoutes = require('./routes/LabAppointmentsRoutes');


app.use(express.json());
// app.use('/api', routes); // Use the combined routes
app.use('/api', testRoutes);
app.use('/api', reportsRoutes);
app.use('/api', ServiceRouter);
app.use('/api', BillRoutes);
app.use('/api', labServiceRoutes);
app.use('/api', labEditPatientRoutes);
app.use('/api', labPatientRoutes);
app.use('/api', labbillingRoutes);
app.use('/api', labpaidRoutes);
app.use('/api', reportDataRoutes);
app.use('/api', labappointmentsRoutes);


const PORT = process.env.PORT || 5010 // Use the PORT environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
