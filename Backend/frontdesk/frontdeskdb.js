const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB for each schema
mongoose.connect("mongodb://localhost:27017/patients", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect("mongodb://localhost:27017/attach", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect("mongodb://localhost:27017/Vitals", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import schemas and models for each application
const patientsSchema = require("./patientsSchema"); // Define the schema for patients
const Patients = mongoose.model("Patients", patientsSchema);

const attachSchema = require("./attachSchema"); // Define the schema for attachments
const File = mongoose.model("File", attachSchema);

const vitalsSchema = require("./vitalsSchema"); // Define the schema for vitals
const Property = mongoose.model("Property", vitalsSchema);

// Routes for each application
app.post("/addData", async (req, res) => {
  try {
    const newData = new Patients(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add patient data" });
  }
});

app.get("/getData", async (req, res) => {
  try {
    const dataType = req.query.dataType; // Use a query parameter to specify 'patient' or 'billing'
    // eslint-disable-next-line no-undef
    const data = await CommonModel.find({ type: dataType });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// eslint-disable-next-line no-undef
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("File uploaded:", req.file);
  res.status(200).json({ message: "File uploaded successfully." });
});

app.post("/save", async (req, res) => {
  const { index, filename } = req.body;
  console.log(`Save file ${index}`);

  try {
    const newFile = new File({
      filename: filename,
    });

    await newFile.save();

    res.status(200).json({ message: "File information saved successfully." });
  } catch (error) {
    console.error("Error saving file information:", error);
    res.status(500).json({ message: "Error saving file information." });
  }
});

app.post("/Vitalsdata", async (req, res) => {
  const propertyData = req.body;

  try {
    const newProperty = new Property(propertyData);

    await newProperty.save();

    res.status(200).json({ message: "Property created successfully." });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/Vitalsdata", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 5000; // Choose a common port for all routes
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
