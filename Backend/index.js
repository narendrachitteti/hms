const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Use the 'cors' middleware to enable CORS for all routes
app.use(cors());
app.use(express.json());

// MongoDB setup
//const uri = 'mongodb://localhost:27017';
const uri = "mongodb://0.0.0.0:27017/"; // Replace with your MongoDB connection string
const dbName = 'admin';

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
};



// API endpoint to insert data into MongoDB
app.post('/insert', async (req, res) => {
  const { username, password, } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('emp');

    // Insert a document
    const result = await collection.insertOne({ username, password });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});

app.post('/inventorydata', async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


const complaintsSchema = new mongoose.Schema({
  complaints: [String], 
  diagnosis:[String],
  medicine:([]),
   advice:String ,
   dietexercise:String , 
   testsRequested:[String],
   testWhen:String ,  
   nextVisit:String ,
   nextVisitType:String,   
   nextVisitDate:String,      // Define complaints as an array of strings
});

// Create the model
const Complaints = mongoose.model('Complaints', complaintsSchema);

// ...

app.post('/Complaints', async (req, res) => {
  try {
    const { complaints,diagnosis , medicine,advice,dietexercise,testsRequested,testWhen ,nextVisit,nextVisitType,nextVisitDate} = req.body;

    const newComplaints = new Complaints({
      complaints: complaints,
      diagnosis:diagnosis,
      medicine:medicine,
      advice:advice,
      dietexercise:dietexercise,
      testsRequested:testsRequested,
      testWhen:testWhen,
      nextVisit:nextVisit,
      nextVisitType:nextVisitType,
      nextVisitDate:nextVisitDate,
      
      
      
    });

    await newComplaints.save();

    res.status(200).json({ message: 'Complaints saved successfully' });
  } catch (error) {
    console.error('Error while saving:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/Complaints', async (req, res) => {
  try {
    console.log('Fetching vitals data...');
    const properties = await Complaints.find();
    console.log('Fetched data:', properties);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


//vitals post and fetch//
const propertySchema = new mongoose.Schema({


  bpn:String,
  bpd:String,
  sugar:String,
  height:String,
  weight:String,
  temperature:String,
  spo2:String,
  pallor:String,
  edema:String,
  lcterus:String,
  lymphadenopathy:String,
  ciubbing:String,
  cyanosis:String,
  jvp:String,
  medicinename:String,
  remainingunits:String,
});

const Property = mongoose.model('Property', propertySchema);

const invoiceSchema = new mongoose.Schema ({
  invoiceNumber: String,
  stockName: String,
  date: String,
  Medicine: String,
  Batch: String,
  BatchExpiry: String,
  Unit: String,
  strips: String,
  Freestrips: String,
  Number: String,
  price: String,
  Gst:String,
  MRP: String,
  Total: String,
  isChecked: Boolean,
  HSNcode: String,
  RackNo: String,
  BookNo: String,
  NetPrice: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

app.post('/Vitals', async (req, res) => {
const propertyData = req.body;

try {
 const newProperty = new Property(propertyData);

 await newProperty.save();

 res.status(200).json({ message: 'Property created successfully.' });
} catch (error) {
 console.error('Error creating property:', error);
 res.status(500).json({ error: 'Internal server error.' });
}
});

app.post('/addInvoice', async (req, res) => {
  try {
    const gst = parseFloat(req.body.Gst);
    const cgst = gst / 2;
    const sgst = gst / 2;
    const newInvoice = new Invoice({
   
      invoiceNumber: req.body.invoiceNumber,
      stockName:req.body.stockName,
      date:req.body.date,
      Medicine:req.body.Medicine,
      Batch:req.body.Batch,
      BatchExpiry:req.body.BatchExpiry,
      Unit:req.body.Unit,
      strips:req.body.strips,
      Freestrips:req.body.Freestrips,
      Gst: gst, // Store the original GST value
      CGST: cgst, // Store CGST
      SGST: sgst,
      Number:req.body.Number,
      price:req.body.price,
      MRP:req.body.MRP,
      Total:req.body.Total,
      HSNcode:req.body.HSNcode,
      RackNo: req.body.RackNo,
      BookNo: req.body.BookNo,
      NetPrice: req.body.NetPrice,
    
    });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add patient' });
  }
});

app.get('/Vitals', async (req, res) => {
  try {
    console.log('Fetching vitals data...');
    const properties = await Property.find();
    console.log('Fetched data:', properties);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});




// cases post and fetch//

const diabetesSchema = new mongoose.Schema({
  medical: String,
  drugs: String,
  firstComplaint: String,
  patientTreatment: String,
  familyHistory: String,
  review: String,
});

const DiabetesModel = mongoose.model('Diabetes', diabetesSchema);

app.post('/Diabeticcase', async (req, res) => {
  const formData = req.body;

  try {
    const newDiabetesData = new DiabetesModel(formData);
    await newDiabetesData.save();
    res.status(200).json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


const generalSchema = new mongoose.Schema({
  diabetes: {
    state: String,
    details: String,
  },
  hypertension: {
    state: String,
    details: String,
  },
  typhoid: {
    state: String,
    details: String,
  },
  arthritis: {
    state: String,
    details: String,
  },
  cmr: {
    state: String,
    details: String,
  },
});

const General = mongoose.model('General', generalSchema);

app.post('/Generalcase', async (req, res) => {
  const generalData = req.body;

  try {
    const newGeneral = new General(generalData);
    await newGeneral.save();
    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.get('/Generalcase', async (req, res) => {
  try {
    const properties = await General.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//forms post ,fetch and put//
const medicalSchema = new mongoose.Schema({
  patientName14: String,
  treatmentFrom14: String,
  treatmentTo14: String,
  treatmentFor14: String,
  resumeDutyFrom14: String,
});

const Medical = mongoose.model('Medical', medicalSchema);

app.post('/Mc', async (req, res) => {
  const medicalData = req.body;

  try {
    const newMedical = new Medical(medicalData);
    console.log('med data ',newMedical)
    await newMedical.save();
    res.status(200).json({ message: 'Property created successfully.' });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


app.get('/Mc', async (req, res) => {
    try {
      const properties = await Medical.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Add a PUT route to update an existing property
app.put('/Mc/:id', async (req, res) => {
  const propertyId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedProperty = await Medical.findByIdAndUpdate(
      propertyId,
      updatedData,
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ error: 'Property not found.' });
    }

    res.status(200).json({ message: 'Property updated successfully.' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//consultation fetching//


const dataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  mobilenumber: String,
  last_visit: String,
  
});
const mongooseOptions = {
  connectTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 30000,  // 30 seconds
};

mongoose.connect(uri, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
const Data = mongoose.model('Data', dataSchema);

app.use(cors());


app.get('/consultation/Data', async (req, res) => {
    try {
      const data = await Data.find({});
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Upload files post and get methods//


  const FileDetailsSchema = new mongoose.Schema(
    {
      originalname: String,
      filename: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: 'filedetails',
    }
  );
  
  const FileDetails = mongoose.model('filedetails', FileDetailsSchema);
  
 
  // Define the storage for multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Route for handling file uploads
  app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { originalname, filename } = req.file;
  
      const file = new FileDetails({
        originalname,
        filename,
      });
  
      await file.save();
  
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  
  // Route for getting all files
  app.get('/get-files', async (req, res) => {
    try {
      const files = await FileDetails.find({}, '-_id originalname filename uploadedAt'); // Exclude _id field
      res.json({ status: 'ok', data: files });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  
  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  //Appoinments post and get//
  // Specify the collection name as 'appointments'
const appointmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  recentVisit: Date,
  vitals: String,
  time: String,
  wait: String,
  status: String,
  purpose: String,
}, { collection: 'appointments' }); // Set the collection name here

const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  phone: String,
  email: String,
  referredDoctor: String,
  fromDate: String,
  medicineName: String,
  batch: String,
  price: Number,
  quantity: Number,
  discount: Number,
  total: Number,
  amount: Number,
  selectedPaymentMethod: String,
  gst: Number,
  netAmount: Number,
  roundOff: Number,
  billAmount: Number,
  paidAmount: Number,
  reference: String,
});
const CreatePurchaseOrderSchema = new mongoose.Schema({
  id: Number,
  Date:String, // Changed the type to Number
  Medicine: String,
  unitstrips: String,
 NoOfStrips: String,
  Edit: String,
});
const CreatePurchaseOrder = mongoose.model('CreatePurchaseOrder', CreatePurchaseOrderSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/appointments', async (req, res) => {
  try {
    const { id, name, recentVisit, vitals, time, wait, status, purpose } = req.body;
    const newAppointment = new Appointment({
      id,
      name,
      recentVisit,
      vitals,
      time,
      wait,
      status,
      purpose,
    });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to insert data into MongoDB
app.post('/insert', async (req, res) => {
  console.log('bost ',req.body);
  const { username, password } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('emp');

    // Insert a document
    const result = await collection.insertOne({ username, password });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});
app.post('/AddStaff', async (req, res) => {
  console.log('bost ',req.body);
  const { name, age, gender, bloodgroup, mobilenumber, email, address, degree, workexperience, specilazation } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('staff');

    // Insert a document
    const result = await collection.insertOne({ name, age, gender, bloodgroup, mobilenumber, email, address, degree, workexperience, specilazation });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});

app.post('/doctorregister', async (req, res) => {
  const {  name, password,age,gender,bloodgroup,mobilenumber,email,address,degree,workexperience,department } = req.body;
  console.log('req body',req.body);

  try {
    const db = await connectToDatabase();
    const collection = db.collection('doctorregister');

    // Insert a document
    const result = await collection.insertOne({ name,password, age,gender,bloodgroup,mobilenumber,email,address,degree,workexperience,department });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});

app.post('/admintable', async (req, res) => {
  const {  userId,password,designation } = req.body;
  console.log('req body',req.body);

  try {
    const db = await connectToDatabase();
    const collection = db.collection('admintable');

    // Insert a document
    const result = await collection.insertOne({ userId,password,designation });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});



app.get('/api/doctors', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('doctorregister');

    const doctors = await collection.find({}).toArray();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/admintable', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('admintable');

    const doctors = await collection.find({}).toArray();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/staff', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('staff');

    const doctors = await collection.find({}).toArray();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/staff', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('staff');

    const doctors = await collection.find({}).toArray();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
//const Paid = require('../models/LabpaidModel');

// Controller functions for CRUD operations
exports.getAllLabPaidData = async (req, res) => {
  try {
    const data = await Paid.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteLabPaidRecord = async (req, res) => {
  try {
    const deletedRecord = await Paid.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
app.post('/saveData', async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = new Patient(patientData);
    const savedPatient = await newPatient.save();
    res.status(200).json(savedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to save patient data.' });
  }
});

app.post('/addCreatePurchaseOrder', async (req, res) => {
  try {
    lastAssignedId++;
    const newCreatePurchaseOrder = new CreatePurchaseOrder({
      id: lastAssignedId, // Updated the ID to a number
      Medicine: req.body.Medicine, // Updated field name to match frontend
      unitstrips: req.body.unitstrips, // Updated field name to match frontend
     NoOfStrips: req.body.NoOfStrips, // Updated field name to match frontend
      Edit: req.body.Edit, // Updated field name to match frontend
    });

    await newCreatePurchaseOrder.save();
    res.status(201).json(newCreatePurchaseOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add CreatePurchaseOrder' });
  }
});


// app.post('/Insert', async (req, res) => {
//   const { BP,Pulse,Height,Weight,Temperature,SPO2,Polar,Edema,Lcterus,Lymphadenopathy,Ciubbing,Cyanosis,JVP } = req.body;

//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection('emp');

//     // Insert a document
//     const result = await collection.insertOne({ BP,Pulse,Height,Weight,Temperature,SPO2,Polar,Edema,Lcterus,Lymphadenopathy,Ciubbing,Cyanosis,JVP } = req.body;
//     });
//     console.log('Document inserted:', result.insertedId);

//     res.status(201).json({ message: 'Data inserted successfully.' });
//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).json({ error: 'Failed to insert data.' });
//   }
// });

app.post('/insertVitals', async (req, res) => {
  const { bp,sugar,weight,height,temperature,spo2,pallor,edema,lcterus,lymphadenopathy,ciubbing,cyanosis,jvp } = req.body;
  console.log('req body',req.body);

  try {
    const db = await connectToDatabase();
    const collection = db.collection('vitals');

    // Insert a document
    const result = await collection.insertOne({bp,sugar,weight,height,temperature,spo2,pallor,edema,lcterus,lymphadenopathy,ciubbing,cyanosis,jvp });
    console.log('Document inserted:', result.insertedId);

    res.status(201).json({ message: 'Data inserted successfully.' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data.' });
  }
});




app.listen(5005, () => {
  console.log('Backend server is running on http://localhost:5005');
});