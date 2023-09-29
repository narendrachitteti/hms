import React, { useState, useEffect } from 'react';
import './Stockists.css';
import axios from 'axios';
import PharmacyNav from './PharmacyNav'

const Stockists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [stockists, setStockists] = useState([]);
  const [selectedStockist, setSelectedStockist] = useState(null);

  useEffect(() => {
    // Fetch data from your backend API
    axios.get('http://localhost:5000/properties')
      .then(response => {
        setStockists(response.data);
      })
      .catch(error => {
        console.error('Error fetching stockists:', error);
      });
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleEdit = (stockist) => {
    setSelectedStockist({ ...stockist, _id: stockist._id.toString() });

  };

  const handleUpdate = () => {
    // Implement the logic to update the selected stockist here
    if (selectedStockist) {
      axios.put(`http://localhost:5000/api/stockists/${selectedStockist.id}`, selectedStockist)
        .then(response => {
          // Handle successful update (e.g., display a success message)
          console.log('Stockist updated:', response.data);
          setSelectedStockist(null); // Clear selectedStockist after update
        })
        .catch(error => {
          console.error('Error updating stockist:', error);
          // Handle error (e.g., display an error message)
        });
    }
  };

  return (
    <><PharmacyNav/>
    <div className="stockists-container">
      <div className='stockheaderv'>Pharmacy Stockists</div>
      <div className='exportSectionv'>
        <div className='exportTitlev'>Export Stockists</div>
        <div className='export-contentv'>
          <label htmlFor='fromDatev'>From:</label>
          <input className='stockistsfromv' type='date' id='fromDate' name='fromDate' /> &nbsp;&nbsp;&nbsp;
          <label htmlFor='toDate'>To:</label>
          <input className='stockiststov' type='date' id='toDate' name='toDate' /> &nbsp;&nbsp;&nbsp;
          <label htmlFor='selectType'>Select Type:</label>
          <select id='selectType' name='selectType'>
            <option value='type1'>Type 1</option>
            <option value='type2'>Type 2</option>
          </select>
          <button className='exportButtonv'>Export</button>
        </div>
      </div>
      <div className="search-add-container">
        <div className='searchtopheader'>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa fa-search"></i>
          </div>
          <button className="add-stockists-button" onClick={togglePopup}>
            Add Stockists
          </button>
        </div>
        <table className="stockists-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Name</th>
              <th>GST Number</th>
              <th>Email</th>
              <th>Add Date</th>
              <th>Total Balance</th>
              <th>Total Paid</th>
              <th>Balance</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {stockists
              .filter((stockAdjustment) =>
                Object.values(stockAdjustment)
                  .join(' ')
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((stockist) => (
                <tr key={stockist.id}>
                  <td>{stockist.stockistID}</td>
                  <td>{stockist.StockistName}</td>
                  <td>{stockist.gstno}</td>
                  <td>{stockist.Stockistemail}</td>
                  <td>{stockist.AddDate}</td>
                  <td>{stockist.Totalbalance}</td>
                  <td>{stockist.Totalpaid}</td>
                  <td>{stockist.balance}</td>
                  <td>
                    <button
                      className="edit-button_5"
                      onClick={() => handleEdit(stockist)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showPopup && (
          <div className="popupv">
            <div className="popupv-header">
              Add Stockists
              <button className="close-button" onClick={togglePopup}>
                X
              </button>
            </div>
            <hr />
            <div className="popupv-content">
              <input type='text' placeholder='Stockist Name' />&nbsp;&nbsp;&nbsp;
              <input type='text' placeholder='Stockist GST Number' />&nbsp;&nbsp;&nbsp;
              <input type='email' placeholder='Stockist Email' />&nbsp;&nbsp;&nbsp;
              <button className="addclose-button" onClick={togglePopup}>
                + Add
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedStockist && (
        <div className="edit-popup">
          <div className="edit-popup-header">
            Edit Stockist
            <button className="close-button" onClick={() => setSelectedStockist(null)}>X</button>
          </div>
          <hr />
          <div className="edit-popup-content">
            <input
              type='text'
              placeholder='Stockist Name'
              value={selectedStockist.name}
              onChange={(e) => setSelectedStockist({ ...selectedStockist, name: e.target.value })}
            />
            {/* Add fields for other stockist properties (GST Number, Email, etc.) here */}
            <button className="update-button" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Stockists;