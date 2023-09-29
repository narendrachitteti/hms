const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
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
  CGst:String,
  SGst:String,
  MRP: String,
  Total: String,
  isChecked: Boolean,
  HSNcode: String,
  RackNo: String,
  BookNo: String,
  NetPrice: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
app.post('/addInvoice', async (req, res) => {
  try {
    
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
      Gst:req.body.Gst,
      CGst: req.body.CGst,
      SGst:req.body.SGst,
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

app.get('/getInvoice', async (req, res) => {
  try {
    const InvoiceSchema = await Invoice.find();
    res.status(200).json(InvoiceSchema);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

//Add the DELETE route to delete an invoice by ID
app.delete('/deleteInvoice/:id', async (req, res) => {
  const invoiceId = req.params.id;

  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!deletedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error deleting invoice' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});