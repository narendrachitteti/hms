import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrEdit } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import PharmacyNav from './PharmacyNav';

function Search({ filterText, onFilterTextChange }) {
  return (
    
    <div className='searchBox-main'>
      <div className='search-box-tnx' style={{ background: 'white' }}>
        <input
          type="text"
          placeholder='Search'
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
        <button><BiSearch /></button>
      </div>
    </div>
  );
}

function OrderList() {
  const [filterText, setFilterText] = useState('');
  const [table1, setTable1] = useState([]);
  const [editItem, setEditItem] = useState(null); // Store the item being edited

  useEffect(() => {
    // Fetch data from your API or data source here
    // Replace the URL with the actual API endpoint
    fetch('http://localhost:5000/getCreatePurchaseOrders')
      .then((response) => response.json())
      .then((data) => setTable1(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredData = table1.filter((row) =>
    ((row.OrderNumber || '').includes(filterText)) ||
    ((row.stockListName || '').includes(filterText)) ||
    ((row.date || '').includes(filterText))
  );

  const handleDelete = (id) => {
    // Create a copy of the current state and remove the item with the specified id
    const updatedTable1 = table1.filter((row) => row.id !== id);
    setTable1(updatedTable1);
  };

  const handleEdit = (item) => {
    // Set the item being edited in the state
    setEditItem(item);
  };

  const handleSave = () => {
    // Perform save operation for the edited item here
    // You can update your backend API or state management logic as needed
    // After saving, reset the editItem state to null
    setEditItem(null);
  };

  return (
    <>
    <div className='OrderList-main' style={{ backgroundColor: '#ececec' }}>
      <h2>Purchase Order</h2>
      <hr style={{ backgroundColor: 'black', padding: '1px' }} />
      <Search filterText={filterText} onFilterTextChange={setFilterText} />
      <div className="dropdown-table">
        <table className='table-dropdown'>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Stockist</th>
              <th>Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>{row.OrderN}</td>
                <td>{row.stockListName}</td>
                <td>{row.date}</td>
                <td>
                  {row.status}
                  <select>
                    <option></option>
                    <option>ongoing</option>
                    <option>pending</option>
                    <option>successful</option>
                  </select>
                </td>
                <td>
                  {row === editItem ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(row)}>
                      <GrEdit />
                    </button>
                  )}
                </td>
                <td>
                  {row.Delete}
                  <button onClick={() => handleDelete(row.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default OrderList;