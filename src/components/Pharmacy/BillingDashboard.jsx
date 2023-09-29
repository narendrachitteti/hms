import React, { useState, useEffect } from 'react';
import './BillingDashboard.css';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import PharmacyNav from './PharmacyNav';

function BillingDashboard() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalsales, settotalsales] = useState(0);
  const [Totalbilled, setTotalbilled] = useState(0);
  const [totalcollect, settotalcollect] = useState(0);
  const [collectedbycash, setcollectedbycash] = useState(0);
  const [collectedbycard, setcollectedbycard] = useState(0);
  const [collectedbyothers, setcollectedByOthers] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [fastMovingProducts, setFastMovingProducts] = useState([]);

  useEffect(() => {
    fetchData();
    fetchFastMovingProducts();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/properties');
      const data = response.data[0]; 

      settotalsales(data.totalsales);
      setTotalbilled(data.Totalbilled);
      settotalcollect(data.totalcollect);
      setcollectedbycash(data.collectedbycash);
      setcollectedbycard(data.collectedbycard);
      setcollectedByOthers(data.collectedbyothers);
      setSalesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderSalesData = () => {
    return salesData.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.time}</td>
        <td>{data.sales}</td>
        <td>{data.Return}</td>
        <td>{data.paid}</td>
        <td>{data.balance}</td>
      </tr>
    ));
  };

  const fetchFastMovingProducts = async () => {
    try {
      
      const response = await axios.get('http://127.0.0.1:5000/properties');
      setFastMovingProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFastMovingProducts = () => {
    return fastMovingProducts.map((product, index) => (
      <tr key={index}>
        <td>{product.product}</td>
        <td>{product.soldquantity}</td>
      </tr>
    ));
  };

  return (
    <><PharmacyNav/>
    <div className="Appbilldb">
        <h3 className='date2'>Date Range</h3>
      <div className="date-container">
        
        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label>To:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button>Go</button>
      </div>
      <hr/>
      <div className="card-container">
        <div className="card">
          <label>Total sales</label>
          <p>{totalsales}</p>
        </div>
        <div className="card">
          <label>Total Bill</label>
          <p>{Totalbilled}</p>
        </div>
        <div className="card">
          <label>Total collect</label>
          <p>{totalcollect}</p>
        </div>
        <div className="card">
          <label>Collect by cash</label>
          <p>{collectedbycash}</p>
        </div>
        <div className="card">
          <label>Collect by card</label>
          <p>{collectedbycard}</p>
        </div>
        <div className="card">
          <label>Others</label>
          <p>{collectedbyothers}</p>
        </div>
      </div>
      <div className="card-container2">
        <div className="card2">
          <h4 className="card-heading">Statistics</h4>
          <div className="card-content">
          <div className="statistic">
              <label>Total Medicines</label>
              <p>{salesData[0]?.Totalmedicines}</p>
            </div>
            <div className="statistic">
              <label>Total Manufacturers</label>
              <p>{salesData[0]?.Totalmanufacturers}</p>
            </div>
            <div className="statistic">
              <label>Current Inventory cost</label>
              <p>{salesData[0]?.currentinventorycost}</p>
            </div>
            <div className="statistic">
              <label>Current Inventory MRP</label>
              <p>{salesData[0]?.currentinventorymrp}</p>
            </div>
            <div className="statistic">
              <label>In stock Inventory Quantity</label>
              <p>{salesData[0]?.instockmedicineinventoryquantity}</p>
            </div>
            <div className="statistic">
              <label>Medicine out of stock</label>
              <p>{salesData[0]?.medicineoutofstock}</p>
            </div>
          </div>
        </div>
        <div className="card2">
          <h4 className="card-heading">Latest Sales</h4>
          <div className="card-content">
            
            <div className="sales-pagination">
            <input type='text' placeholder='Search'/><AiOutlineSearch/>
            </div>
            <div className='table-container'>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Time</th>
                  <th>Sales</th>
                  <th>Return</th>
                  <th>Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>{renderSalesData()}</tbody>
            </table>
            </div>
            <br/>
            {salesData.length === 0 && <span>No data available in table</span>}
            

            </div>
        
        </div>
        <div className="card2">
          <h4 className="card-heading">Fast Moving product</h4>
          <div className="card-content">
            
            <div className="sales-pagination">
            <input type='text' placeholder='Search'/><AiOutlineSearch/>
            </div>
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold Qty</th>
                </tr>
              </thead>
              <tbody>{renderFastMovingProducts()}</tbody>
            </table><br/>
            {fastMovingProducts.length === 0 && <span>No data available in table</span>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default BillingDashboard;