// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');

// const app = express();

// app.use(bodyParser.json());

// const allowedOrigins = ['http://localhost:3005']; // Update with your frontend's URL
// app.use(cors({
//     origin: allowedOrigins,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Add the HTTP methods you want to support
//     credentials: true, // Allow cookies and other credentials to be included in the request
//   }));

// mongoose.connect('mongodb://127.0.0.1:27017/attach', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   pid:String,
//   // Add more fields as needed
// });

// const File = mongoose.model('File', fileSchema);

// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log('File uploaded:', req.file);
//   res.status(200).json({ message: 'File uploaded successfully.' });
// });

// app.post('/save', async (req, res) => {
//     const { index, filename } = req.body;
//     console.log(`Save file ${index}`);
  
//     try {
//       const newFile = new File({
//         filename: filename,
        
//       });
  
//       await newFile.save();
  
//       res.status(200).json({ message: 'File information saved successfully.' });
//     } catch (error) {
//       console.error('Error saving file information:', error);
//       res.status(500).json({ message: 'Error saving file information.' });
//     }
//   });
  


// const PORT = process.env.PORT || 8001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');

// const app = express();

// app.use(bodyParser.json());

// const allowedOrigins = ['http://localhost:3000']; // Update with your frontend's URL
// app.use(cors({
//     origin: allowedOrigins,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Add the HTTP methods you want to support
//     credentials: true, // Allow cookies and other credentials to be included in the request
//   }));

// mongoose.connect('mongodb://127.0.0.1:27017/attach', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const pid=req.params.id
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   // Add more fields as needed
// });

// const File = mongoose.model('File', fileSchema);

// // In your server code where you handle file uploads:
// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log('File uploaded:', req.file);
//   const { pid } = req.body; // Get the patient ID from the request body
//   res.status(200).json({ message: 'File uploaded successfully.' });
//   // You can associate the uploaded file with the patient ID (pid) here
//   // Save the 'pid' along with the file information in your database.
// });


// app.post('/save', async (req, res) => { 
//   const { pid } = req.body; // Destructure 'pid' directly from 'req.body'
//   const { index, filename } = req.body;
//   console.log(`Save file ${index}`);
  
//   try {
//     const newFile = new File({
//       filename: filename,
//       pid: pid, // Assign 'pid' here
//     });
  
//     await newFile.save();
  
//     res.status(200).json({ message: 'File information saved successfully.' });
//   } catch (error) {
//     console.error('Error saving file information:', error);
//     res.status(500).json({ message: 'Error saving file information.' });
//   }
// });

  


// const PORT = process.env.PORT || 3007;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000']; // Update with your frontend's URL
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Add the HTTP methods you want to support
    credentials: true, // Allow cookies and other credentials to be included in the request
  }));

mongoose.connect('mongodb://127.0.0.1:27017/attach', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const fileSchema = new mongoose.Schema({
  filename: String,
  // Add more fields as needed
});

const File = mongoose.model('File', fileSchema);

app.post('/upload', upload.single('file'), async(req, res) => {
  console.log('File uploaded:', req.file);
  const { pid } = req.body;
  res.status(200).json({ message: 'File uploaded successfully.' });
});

app.post('/save', async (req, res) => {
    const { index, filename } = req.body;
    console.log(`Save file ${index}`);
  
    try {
      const newFile = new File({
        filename: filename,
        pid: pid,
        
      });
  
      await newFile.save();
  
      res.status(200).json({ message: 'File information saved successfully.' });
    } catch (error) {
      console.error('Error saving file information:', error);
      res.status(500).json({ message: 'Error saving file information.' });
    }
  });
  

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
