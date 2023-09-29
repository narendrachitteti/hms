import React, { useState, useEffect } from 'react';
import './Pharmacystock.css';
import { MdModeEditOutline } from 'react-icons/md';
import { MdRefresh } from 'react-icons/md';
import { AiOutlineAlignRight } from 'react-icons/ai';
import { AiOutlineAlignLeft } from 'react-icons/ai';
import axios from 'axios';
import PharmacyNav from './PharmacyNav';

function InventoryPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    medName: '',
    invoice: '',
    batch: '',
    packPrice: '',
    packMRP: '',
    unitPrice: '',
    unitDiscount: '',
    unitsInStock: '',
    expiryDate: '',
    packPricePercent: '',
    unitDiscountPercent: '',
    returns: '',
    dataField: '',
    quantity: '',
  });
  const [editIndex, setEditIndex] = useState(-1); // Index of the item being edited
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log("Fetching data...");
    axios.get('http://127.0.0.1:5000/pharmacystockdata')
      .then(response => {
        console.log('Fetched data:', response.data); // Check if '_id' is present
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRefreshClick = (index) => {
    console.log(`Refresh button clicked for item at index ${index}`);
  };

  const handleEditClick = (index) => {
    setEditIndex(index); // Show the edit form for this item
    const selectedItem = data[index];
    // Populate the form fields with the selected item's data
    setFormData({
      medName: selectedItem.medName,
      invoice: selectedItem.invoice,
      batch: selectedItem.batch,
      packPrice: selectedItem.packPrice,
      packMRP: selectedItem.packMRP,
      unitPrice: selectedItem.unitPrice,
      unitDiscount: selectedItem.unitDiscount,
      unitsInStock: selectedItem.unitsInStock,
      expiryDate: selectedItem.expiryDate,
      packPricePercent: selectedItem.packPricePercent,
      unitDiscountPercent: selectedItem.unitDiscountPercent,
      returns: selectedItem.returns,
      dataField: selectedItem.dataField,
      quantity: selectedItem.quantity,
    });
  };

  const handleCancelEdit = () => {
    setEditIndex(-1); // Hide the edit form
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:5000/pharmacystockdata/${editIndex >= 0 && editIndex < data.length ? data[editIndex]._id : ''}`, formData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Update the data in the frontend
        const updatedData = [...data];
        if (editIndex >= 0 && editIndex < data.length) {
          updatedData[editIndex] = response.data.updatedProperty;
        }
        setData(updatedData);
        setEditIndex(-1); // Hide the edit form
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  // Filter data based on search query
  const filteredData = data.filter(item => {
    // Add conditions here to filter data based on your requirements
    return (
      item.medName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batch.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more conditions as needed for other columns
    );
  });
  

  return (
    <><PharmacyNav/>
    <div className="page-container-177">
      <div className="content-container-177">
        <div className="left-side-177">
          <h1>Pharmacy Stocks</h1>
          {/* Add other content as needed */}
        </div>
        {/* <div className="right-side-177">
          <button className="export-button-177">Export Inventory</button>
        </div> */}
      </div>
      <div className="red-container-177">
        <div className="search-bar-container-177">
        <input
            type="text"
            className="search-bar-177"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
                  </div>
        {/* <div className="checkbox-container-177">
          <div className="checkbox-wrapper-177" onClick={() => setIsChecked(!isChecked)}>
            <button className={`checkbox-button-177 ${isChecked ? 'checked' : ''}`}></button>
            <p className="checkbox-text-177">Checkbox Label</p>
          </div>
        </div> */}
        <table className="table-container-177">
          <thead>
            <tr className="table-row-177">
              <th className="table-cell-177 table-header-177" rowSpan="2"><AiOutlineAlignRight /></th>
              <th className="table-cell-177 table-header-177" rowSpan="2">Med Name <AiOutlineAlignLeft /></th>
              <th className="table-cell-177 table-header-177" rowSpan="2">Invoice <AiOutlineAlignLeft /></th>
              <th className="table-cell-177 table-header-177" rowSpan="2">Batch <AiOutlineAlignLeft /></th>
              <th className="table-cell-177 table-header-177" colSpan="2">Pack</th>
              <th className="table-cell-177 table-header-177" colSpan="2">Units</th>
              <th className="table-cell-177 table-header-177" rowSpan="2">Units in Stock <AiOutlineAlignLeft /></th>
              <th className="table-cell-177 table-header-177" rowSpan="2">Expiry <AiOutlineAlignLeft /></th>
              <th className="table-cell-177 table-header-177" colSpan="2">Percent</th>
              <th className="table-cell-177 table-header-177" colSpan="3">Actions</th>
            </tr>

            <tr className="table-row-177">
              <th className="table-cell-177 table-header-177">Price</th>
              <th className="table-cell-177 table-header-177">MRP</th>
              <th className="table-cell-177 table-header-177">Per Pack</th>
              <th className="table-cell-177 table-header-177">Price</th>
              <th className="table-cell-177 table-header-177">Discount</th>
              <th className="table-cell-177 table-header-177">GST</th>
              <th className="table-cell-177 table-header-177">Edit</th>
              {/* <th className="table-cell-177 table-header-177">Data</th> */}
              {/* <th className="table-cell-177 table-header">Qty</th> */}
            </tr>
            {/* Add more header rows as needed */}
          </thead>
          <tbody>
          {filteredData.map((item, index) => (
              <tr key={item._id || index} className="table-row-177">
    <td className="table-cell-177">{item.fid ? item.fid: index}</td>
                <td className="table-cell-177">{item.medName}</td>
                <td className="table-cell-177">{item.invoice}</td>
                <td className="table-cell-177">{item.batch}</td>
                <td className="table-cell-177">{item.packPrice}</td>
                <td className="table-cell-177">{item.packMRP}</td>
                <td className="table-cell-177">{item.unitPrice}</td>
                <td className="table-cell-177">{item.unitDiscount}</td>
                <td className="table-cell-177">{item.UnitsInStock}</td>
                <td className="table-cell-177">{item.expiryDate}</td>
                <td className="table-cell-177">{item.packPricePercent}</td>
                <td className="table-cell-177">{item.unitDiscountPercent}</td>
                {/* <td className="table-cell-177">
                  <button onClick={() => handleRefreshClick(index)}>
                    <MdRefresh />
                  </button>
                </td> */}
                {/* Display Edit and Update buttons based on editIndex */}
                {editIndex === index ? (
                  <td className="table-cell-177">
                    <button onClick={handleSubmit}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                ) : (
                  <td className="table-cell-177">
                    <button onClick={() => handleEditClick(index)}>
                      <MdModeEditOutline />
                    </button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit form */}
        {editIndex !== -1 && (

<div className="edit-form-container-177">
              <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
              {/* Add form fields for editing */}
              <div>
                <label>Med Name:</label>
                <input
                  type="text"
                  name="medName"
                  value={formData.medName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Invoice:</label>
                <input
                  type="text"
                  name="invoice"
                  value={formData.invoice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Batch:</label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>packprice:</label>
                <input
                  type="text"
                  name="packprice"
                  value={formData.packprice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>packMRP:</label>
                <input
                  type="text"
                  name="packMRP"
                  value={formData.packMRP}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>unitPrice:</label>
                <input
                  type="text"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>unitDiscount:</label>
                <input
                  type="text"
                  name="unitDiscount"
                  value={formData.unitDiscount}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>unitsInStock:</label>
                <input
                  type="text"
                  name="unitsInStock"
                  value={formData.unitsInStock}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>expiryDate:</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label>packPricePercent:</label>
                <input
                  type="text"
                  name="packPricePercent"
                  value={formData.packPricePercent}
                  onChange={handleInputChange}
                />
              </div>


              <div>
                <label>unitDiscountPercent:</label>
                <input
                  type="text"
                  name="unitDiscountPercent"
                  value={formData.unitDiscountPercent}
                  onChange={handleInputChange}
                />
              </div>
              {/* Add other form fields here */}
              <div className="edit-form-buttons-177">
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
</>
  );
}

export default InventoryPage;