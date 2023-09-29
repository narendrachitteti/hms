const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Masterdashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const dataSchema = new mongoose.Schema({
  // Define your schema here
  
        date: String,
        Medicine:String,
        Batch: String,
        BatchExpiry: String,
        Unit: Number,
        strips: Number,
        Freestrips: Number,
        Gst: Number,
        price: Number,
        MRP: Number,
        Total: Number,
        isChecked: String,
        HSNcode: String,
        RackNo: Number,
        BookNo: Number,
        NetPrice: Number,
        ManufactureName: String,
        MedID: String,
        StockistName: String,
        Stockistemail: String,
        Category: String,
        AddDate: String,
        Orderno: Number,
        gstno: String,
        stockistID: String,
        packprice: Number,
        packmrp: Number,
        unitsperpack: Number,
        personname: String,
        time: String,
        OrderID: String,
        propertiesID: String,
        Totalmedicines: Number,
        Totalmanufacturers: String,
        outstanding: String,
        // Totalbilled: Number,
        // collectedbycash: Number,
        // collectedbycard: Number,
        mobile: Number,
        // Return: String,
        // returnbycash: Number,
        // returnbycard: Number,
        stockID: String,
        Totalbalance: Number,
        Totalpaid: Number,
        balance: Number,
        TotalAmount: Number,
        propertiesnumber: Number,
        unitsprice: Number,
        unitsinstock: Number,
        expiry: String,
        percentdiscount:Number ,
        percentgst: Number,
        intax: Number,
        noofstrips: Number,
        discount: Number,
        beforestocks: Number,
        afterstocks: Number,
        stockdifference: Number,
        podate: String,
        totalgst: String,
        grossamount: Number,
        roundoff: Number,
        stocksreturned: Number,
        purchaseamount: Number,
        // collectedbyothers: Number,
        // totalsales: Number,
        // totalcollect: Number,
        // currentinventorycost: Number,
        // currentinventorymrp: Number,
        // instockmedicineinventoryquantity: Number,
        // medicineoutofstock: Number,
        // sales: Number,
        // paid: Number,
        


});

const Data = mongoose.model('Data', dataSchema);

app.post('/properties', (req, res) => {
  const data = req.body;

  const newData = new Data(data);

  newData
    .save()
    .then(() => res.json('Data saved!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});


app.get('/properties', (req, res) => {
  Data.find() // Retrieve all data from the 'Data' collection
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});
app.delete('/properties/:id', async (req, res) => {
  const propertiesId = req.params.id;

  try {
    const deletedproperties = Data.findByIdAndDelete(propertiesId);
    if (!deletedproperties) { 
      return res.status(404).json({ error: 'properties not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error deleting properties' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});