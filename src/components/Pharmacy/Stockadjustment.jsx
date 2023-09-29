import React, { useState, useEffect } from 'react';
import './Stockadjustment.css';
import { MdModeEditOutline } from 'react-icons/md';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineAlignRight } from 'react-icons/ai';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import PharmacyNav from './PharmacyNav';

function Stockadjustment() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [stockAdjustments, setStockAdjustments] = useState([]);

  

  const fromDateId = 'fromDate';
  const toDateId = 'toDate';
  

  const exportButtonText = 'Export Report';
  const exportButtonClass = 'bexport-button';

  const dateRangeTitle = 'Date Range';
  const selectTypeLabel = 'Select Type:';
  const exportButtonLabel = 'Export';

  useEffect(() => {
    fetchStockAdjustments();
  }, []);

  const fetchStockAdjustments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stockadjustment');
      const data = await response.json();
      setStockAdjustments(data);
    } catch (error) {
      console.error('Failed to fetch stock adjustment data:', error);
    }
  };
  const handleFilter = () => {
    fetchStockAdjustments();
  };

  return (
    <><PharmacyNav/>
    <div className="page-containerv">
      <div className="content-containerv">
        <div className="Bleft-side">
          <h1>Stock Adjustment Report</h1>
          {/* Add the rest of your content here */}
        </div>
      </div>
      <div className="search-add-container">
        {/* Search Input */}
        <div className='searchtopheader'>
          <div className="search-bar">
          <input
  type="text"
  placeholder="Search"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
            {/* You can replace this with your preferred search icon */}
            <i className="fa fa-search"></i>
          </div>

          {/* Add StockistsButton */}
          
        </div>
        {/* Table */}
        <table className="stockists-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Person Name</th>
              <th>Time</th>
              <th>Before Stocks</th>
              <th>After Stocks</th>
              <th>Stock Difference</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the stock adjustment data */}
            {stockAdjustments
              .filter((stockAdjustment) =>
                Object.values(stockAdjustment)
                  .join(' ')
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).map(stockAdjustment => (
              <tr key={stockAdjustment._id}>
                <td>{stockAdjustment.madicinename}</td>
                <td>{stockAdjustment.personname}</td>
                <td>{stockAdjustment.time}</td>
                <td>{stockAdjustment.beforestocks}</td>
                <td>{stockAdjustment.afterstocks}</td>
                <td>{stockAdjustment.stockdifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Stockadjustment;