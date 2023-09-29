import React ,{useState,useEffect}from 'react'
import {AiFillDelete} from 'react-icons/ai'
import './invoice.css';
import axios from 'axios'; 
import PharmacyNav from './PharmacyNav';

const InvoiceStock = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [tableData, setTableData] = useState([]);
  const [stockName, setStockName] = useState('');
  const [date, setDate] = useState('');
  const [Medicine, setMedicine] = useState('');
  const [Batch, setBatch] = useState('');
  const [BatchExpiry, setBatchExpiry] = useState('');
  const [Unit, setUnit] = useState('');
  const [strips, setstrips] = useState('');
  const [Freestrips, setFreestrips] = useState('');
  const [Gst, setGst] = useState('');
  const [CGst, setCGst] = useState('');
  const [SGst, setSGst] = useState('');
  const [price, setPrice] = useState('');
  const [MRP, setMRP] = useState('');
  const [Total, setTotal] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [HSNcode, setHSNcode] = useState('');
  const [RackNo, setRackNo] = useState('');
  const [BookNo, setBookNo] = useState('');
  const [NetPrice, setNetPrice] = useState('');

  
  const handleGSTChange = (e) => {
    const newGST = parseFloat(e.target.value);
  
    // Calculate CGST and SGST based on GST value
    const newCGST = newGST / 2;
    const newSGST = newGST / 2;
  
    // Log values for debugging
    console.log("New GST:", newGST);
    console.log("New CGST:", newCGST);
    console.log("New SGST:", newSGST);
  
    // Update state with new values
    setGst(newGST);
    setCGst(newCGST);
    setSGst(newSGST);
  };


  const handleAddMedicine = async () => {
    try {
      // Validate that required fields are not empty
      if (!Medicine || !Batch || !BatchExpiry || !Unit || !strips || !Gst || !price || !MRP || !Total) {
        window.alert('Please fill in all required fields before adding a medicine.');
        return;
      }

      
      const newMedicine = {
        Medicine,
        Batch,
        BatchExpiry,
        Unit,
        strips,
        Freestrips,
        Gst,
        CGst: CGst ? CGst : '',
        SGst: SGst? SGst:'',
        price,
        MRP,
        Total,
        isChecked,
        HSNcode,
        RackNo,
        BookNo,
        NetPrice,
      };

      // Send a POST request to your server to add the medicine
      const response = await axios.post('http://localhost:5000/addMedicine', newMedicine);

      // Handle the response as needed
      console.log(response.data);
      window.alert('Medicine added successfully');
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };


  const handleActionButton = (action) => {
    if (action === 'add') {
      // Create a new medicine object with the current state values
      const newMedicine = {
        Medicine,
        Batch,
        BatchExpiry,
        Unit,
        strips,
        Freestrips,
        Gst,
        
        price,
        MRP,
        Total,
        isChecked,
        HSNcode,
        RackNo,
        BookNo,
        NetPrice,
      };

      // Add the new medicine object to the tableData state
      setTableData((prevTableData) => [...prevTableData, newMedicine]);

      // Clear the input fields by resetting the state
      clearInputFields();
    } else if (action === 'clear') {
      // Clear the input fields by resetting the state
      clearInputFields();
    }
  };

  const clearInputFields = () => {
    setMedicine('');
    setBatch('');
    setBatchExpiry('');
    setUnit('');
    setstrips('');
    setFreestrips('');
    setGst('');
    setCGst('');
    setSGst('');
    setPrice('');
    setMRP('');
    setTotal('');
    setIsChecked(false);
    setHSNcode('');
    setRackNo('');
    setBookNo('');
    setNetPrice('');
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteInvoice/${id}`);
      console.log(response.data);
      window.alert('Invoice deleted successfully');
      fetchInvoices(); // Make sure to call fetchInvoices instead of fetchPatients
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };
  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getInvoice');
      console.log(response.data); // Add this line
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };
  
  
  const handleSaveInvoice = async () => {
    try {
      

    
   
      

      const response = await axios.post('http://localhost:5000/addInvoice', {
        invoiceNumber,
        stockName,
        date,
        Medicine,
        Batch,
        BatchExpiry,
        Unit,
        strips,
        Freestrips,
        Gst,
        CGST: CGst,
        SGST: SGst,
        price,
        MRP,
        Total,
        isChecked,
        HSNcode,
        RackNo,
        BookNo,
        NetPrice,
        
       

        
      });

      
      console.log(response.data);
      window.alert('Invoice added successfully');
      fetchPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getInvoice');
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPatients();
  }, []);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <><PharmacyNav/>
    <div className='container-txj'>
  
    <div className='main-container-tjx1' >
      <div className='header-tjx'>
    <h3 >Add invoice</h3>
    </div>
      
      <hr/>
      <div className="input-row" >
    
        <div className="input-container">
        <label htmlFor="invoiceNumber">Invoice Number</label>
     <input
            type="text"
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
    <div className="input-container">
          <label htmlFor="stockName">Stock Name</label>
          <input
            type="text"
            id="stockName"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">  Invoice Date</label>
          <input
            type="date"
            id="date1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className='button-txj'  onClick={handleAddMedicine}>Add New Medicine</button>
        </div>
      </div>
      </div>
      
      <div className='second-container-txj'>
      <div className="input-row-1" >
    
    <div className="input-container-1">
    <label htmlFor="Medicine">Medicine</label>
 <input
        type="text"
        id="Medicine"
        value={Medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />
    </div>

    <div className="input-container-1">
      <label htmlFor="Batch">Batch </label>
      <input
        type="Batch"
        id="Batch"
        value={Batch}
        onChange={(e) => setBatch(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="BatchExpiry">Batch Expiry</label>
      <input
        type="date"
        id="BatchExpiry"
        value={BatchExpiry}
        onChange={(e) => setBatchExpiry(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="Unit">Unit</label>
      <input
        type="number"
        id="Unit"
        value={Unit}
        onChange={(e) => setUnit(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="strips">strips</label>
      <input
        type="strips"
        id="strips"
        value={strips}
        onChange={(e) => setstrips(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="Freestrips">Free strips</label>
      <input
        type="Freestrips"
        id="Freestrips"
        value={Freestrips}
        onChange={(e) => setFreestrips(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="Gst">Gst</label>
      <input
        type="Gst"
        id="Gst"
        value={Gst}
        onChange={handleGSTChange}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="price">price</label>
      <input
        type="price"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="MRP">MRP</label>
      <input
        type="text"
        id="MRP"
        value={MRP}
        onChange={(e) => setMRP(e.target.value)}
      />
    </div>
    <div className="input-container-1">
      <label htmlFor="Total">Total</label>
      <input
        type="Total"
        id="Total"
        value={Total}
        onChange={(e) => setTotal(e.target.value)}
      />
    </div> 
    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div className="input-row-3" >
    
    <div className="input-container-2">
    <label htmlFor="HSNCode">HSN Code</label>
 <input
        type="text"
        id="HSNcode"
        value={HSNcode}
        onChange={(e) => setHSNcode(e.target.value)}
      />
    </div>
    <div className="input-container-2">
    <label htmlFor="RackNo">Rack No</label>
 <input
        type="text"
        id="RackNo"
        value={RackNo}
        onChange={(e) => setRackNo(e.target.value)}
      />
    </div>
    <div className="input-container-2">
    <label htmlFor="BookNo">Book No</label>
 <input
        type="text"
        id="BookNo"
        value={BookNo}
        onChange={(e) => setBookNo(e.target.value)}
      />
    </div>
    <div className="input-container-2">
    <label htmlFor="NetPrice">Net Price</label>
 <input
        type="text"
        id="NetPrice"
        value={NetPrice}
        onChange={(e) => setNetPrice(e.target.value)}
      />
    </div >
   <div className="input-container-2"> <button className='button-nhy'onClick={() => handleActionButton('add')}>Add </button> </div> &nbsp; &nbsp; &nbsp;
   <div className="input-container-2"> <button  className='button-nhy1'onClick={() => handleActionButton('clear')}>clear</button> </div>
   <div className="input-container-checkbox">
      <label >
    
        <input 
        
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Add Tax on Free Qty
      </label>
    </div>
    </div>
    <div className='container-table-tnx'>
        <table className='invoice-table'>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Gst</th>
              <th>SGst</th>
              <th>CGst</th>
              <th>units/strip</th>
              <th>Total units</th>
              <th>price /strip</th>
              <th>MRP / strip</th>
              <th>Discount</th>
              <th>In Tax(Rs)</th>
              <th>Total price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row._id}>
                <td>{row.Medicine}</td>
                <td>{row.Batch}</td>
                <td>{row.BatchExpiry}</td>
                <td>{row.Gst}</td>
                <td>{row.SGST=(row.Gst/2|| 0)}</td>
                <td>{row.CGST=(row.Gst/2 || 0)}</td>
                <td>{row.Unit}</td>
                <td>{row.strips}</td>
                <td>{row.strips*4 ||0}</td>
                <td>{row.MRP}</td>
                <td>{row.discount=((row.MRP - row.price))}</td>
                <td>{row.Tax=((row.Total*1)%5)}</td>
                <td>{row.Total=((row.MRP)-row.discount)}</td>
                <td><button
                 style={{color:'red'}}
                 onClick={() => handleDelete(row._id)}
                 ><AiFillDelete/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='end-page-tnx'>
      <div className='Remarks-page-tnx'>
      <h5 className="heading-remarks-tnx">Remarks</h5>
        <input className='rectangle-box'type='text'/>
      </div>
      </div> 
      
      
      <table className='Amount-table-table'>
     
  <tbody>
    <tr>
      
      <td >Total</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.Total}</td>
      ))}
    </tr>
    <tr>
      <td>Discount</td>
      {tableData.map((row) => (
       <td key={row.id}>{row.discount=((row.MRP-row.price))}</td>
      ))}
    </tr>
    <tr>   
      <td>Total Disc Amount</td>
      {tableData.map((row) => (   
        <td key={row.id}>{ row.discount1=((row.MRP-row.price)+(row.discount))}</td>
      ))}
    </tr>
   
    <tr>
      <td>Total Tax(GST)</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.Gst}</td>
      ))}
    </tr>
    <tr>
      <td>CGST</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.Gst/2 || 0}</td>
      ))}
    </tr>
    <tr>
      <td>SGST</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.Gst/2 || 0}</td>
      ))}
    </tr>
    <tr>
      <td>Gross Amount</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.GrossAmount=(row.Total+row.discount1)}</td>
      ))}
    </tr>
    <tr>
      <td>Round Off</td>
      {tableData.map((row) => (
               

        <td key={row.id}> {row.Roundoff=(row.Total+row.discount1)}</td>
      ))}
    </tr>
    <tr>
      <td>Stocks Returned</td>
      {tableData.map((row) => (
        <td key={row.id}><select>
          <option>------</option>
        <option>yes</option>
        <option>NO</option>
        </select></td>
      ))}
    </tr>
    <tr>
      <td>Purchase Amount</td>
      {tableData.map((row) => (
        <td key={row.id}>{row.Total}</td>
      ))}
    </tr>
   
    
    
  </tbody>
</table>  

     
    </div >
<div  className='save-tnx'>
<button className='save-tnx1' onClick={handleSaveInvoice}> Save Invoice</button>
</div>
    


      </>
   
   
  )
  
}

export default InvoiceStock