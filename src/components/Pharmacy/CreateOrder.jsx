import React, { useState, useEffect } from 'react';
import './CreateOrder.css';
import axios from 'axios';
import { AiFillPrinter } from 'react-icons/ai';
import { BiSolidDownload,BiSolidEditAlt } from 'react-icons/bi';
import { MdEmail, MdDelete } from 'react-icons/md';
import PharmacyNav from './PharmacyNav';

const CreatePurchaseOrder = () => {
  const [stockListName, setstockListName] = useState('');
  const [date, setdate] = useState('');
  const [Medicine, setMedicine] = useState('');
  const [UnitStrip, setUnitStrip] = useState('');
  const [NoOfStrips, setNoOfStrips] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    Medicine: '',
    unitstrips: '',
    NoOfStrips: '',
  });
  const handlePrint = ( ) => {
        window.print(); // This opens the print dialog for the current page.
      };
      const handleEmail = ({ tableData }) => {
        const subject = 'Purchase Order'; // Specify the email subject
        const body = `Here is the purchase order data:\n\n${JSON.stringify(tableData, null, 2)}`; // Customize the email body content
    
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open the default email client with pre-filled subject and body
        window.location.href = mailtoLink;
      };
      const handleDownload = () => {
        // Generate the data to be downloaded (ensure it doesn't contain circular references)
        const dataToDownload = tableData.map((row) => {
          return `${row.Medicine}, ${row.unitstrips}, ${row.NoOfStrips}`;
        }).join('\n');
      
        // Create a Blob object containing the data
        const blob = new Blob([dataToDownload], { type: 'text/plain' });
      
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
      
        // Set the filename for the download
        downloadLink.download = 'purchase_orders.csv'; // Change the filename as needed
      
        // Trigger the download
        downloadLink.click();
      };
      
      
    
     
      
     

  const handleDeleteRow = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteCreatePurchaseOrder/${id}`);
      console.log(response.data);
      window.alert('CreatePurchaseOrder deleted successfully');
      fetchCreateOrder();
    } catch (error) {
      console.error('Error deleting CreatePurchaseOrder:', error);
    }
  };

  const handleSaveOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addCreatePurchaseOrder', {
        stockListName,
        date,
        Medicine,
        unitstrips: UnitStrip,
        NoOfStrips,
      });

      console.log(response.data);
      window.alert('CreatePurchaseOrder added successfully');
      fetchCreateOrder();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCreateOrder = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getCreatePurchaseOrders');
      setTableData(response.data);
      window.alert('Data fetched successfully');
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddMedicine = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addMedicine', {
        stockListName,
        date,
        Medicine,
        unitstrips: UnitStrip,
        NoOfStrips,
      });

      console.log(response.data);
      window.alert('Medicine added successfully');
      // Clear the input fields after adding medicine
      setMedicine('');
      setUnitStrip('');
      setNoOfStrips('');
      // Fetch updated data if needed
      fetchCreateOrder();
    } catch (error) {
      console.error(error);
      window.alert('An error occurred while adding medicine. Please try again later.');
    }
  };
  const handleClearInputs = () => {
    // Clear input fields by setting state variables to empty strings
    setMedicine('');
    setUnitStrip('');
    setNoOfStrips('');
  };

  const handleEdit = (rowData) => {
    setIsEditing(true);
    setEditData({
      id: rowData._id,
      Medicine: rowData.Medicine,
      unitstrips: rowData.unitstrips,
      NoOfStrips: rowData.NoOfStrips,
    });
  };
  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/updateCreatePurchaseOrder/${editData.id}`, {
        Medicine: editData.Medicine,
        unitstrips: editData.unitstrips,
        NoOfStrips: editData.NoOfStrips,
      });

      if (response.status === 200) {
        console.log(response.data);
        window.alert('CreatePurchaseOrder updated successfully');
        setIsEditing(false);

        // Update the tableData state with the edited data
        setTableData((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item._id === editData.id) {
              return {
                ...item,
                Medicine: editData.Medicine,
                unitstrips: editData.unitstrips,
                NoOfStrips: editData.NoOfStrips,
              };
            }
            return item;
          });
          return updatedData;
        });
      } else {
        console.error('Failed to update CreatePurchaseOrder:', response.statusText);
        window.alert('Failed to update CreatePurchaseOrder. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating CreatePurchaseOrder:', error);
      window.alert('An error occurred while updating CreatePurchaseOrder. Please try again later.');
    }
  };

      


  useEffect(() => {
    fetchCreateOrder();
  }, []);

  return (
    <><PharmacyNav/>
    <div className='create-purchase-order'>
      <div className='header-cpo'>
        <h2>Create Purchase Order</h2>
      </div>
      <hr />
      <div className='stocklist-cpo'>
        <div className='stocklist-cpo1'>
          <label htmlFor='stockListName'>Stock List Name</label>
          <select
            id='stockListName'
            value={stockListName}
            onChange={(e) => setstockListName(e.target.value)}
          >
            <option value=''>Select a stock list</option>
            <option value='list1'>List 1</option>
            <option value='list2'>List 2</option>
            <option value='list3'>List 3</option>
            <option value='list4'>List 4</option>
          </select>
        </div>
        <div className='stocklist-cpo1'>
          <label htmlFor='date'>Order Date</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className='stocklist-cpo1'>
          <button onClick={handleAddMedicine}>Add New Medicine</button>
        </div>
      </div>
      <div className='stocklist-cposecond'>
        <div className='stocklist-cpo2'>
          <label htmlFor='Medicine'>Medicine</label>
          <input
            type='text'
            id='Medicine'
            value={Medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
        </div>
        <div className='stocklist-cpo2'>
          <label htmlFor='UnitStrip'>Unit / Strip</label>
          <input
            type='text'
            id='UnitStrip'
            value={UnitStrip}
            onChange={(e) => setUnitStrip(e.target.value)}
          />
        </div>
        <div className='stocklist-cpo2'>
          <label htmlFor='NoOfStrips'>No Of Strips</label>
          <input
            type='text'
            id='NoOfStrips'
            value={NoOfStrips}
            onChange={(e) => setNoOfStrips(e.target.value)}
          />
        </div>
        <div className='stocklist-cpo2'>
          <button onClick={handleSaveOrder}>Save</button>
        </div>
        <div className='stocklist-cpo2'>
          <button   onClick={handleClearInputs}>Clear</button>
        </div>
      </div>
      <div className='stocklist-cpo-table'>
        <table className='stocklist-table-cpo'>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Units per Strips</th>
              <th>No Of Strips</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row._id}>
                <td>{row.Medicine}</td>
                <td>{row.unitstrips}</td>
                <td>{row.NoOfStrips}</td>
                <td>
                  <button style={{border:' 1px solid white'}}onClick={() => handleEdit(row)}><BiSolidEditAlt/></button>
                  <button  style={{color:'red',border:' 1px solid white'}} onClick={() => handleDeleteRow(row._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='stocklist-cpo-buttonsecond'>
        <button onClick={handleSaveOrder}>Save Order</button>
        <button onClick={handlePrint}>
          <AiFillPrinter /> Print
        </button>
        <button onClick={handleDownload}>
          <BiSolidDownload /> Download
        </button>
        <button onClick={handleEmail}>
          <MdEmail /> Email
        </button>
      </div>
      {isEditing && (
        <div className='edit-form'>
          <h3>Edit Purchase Order</h3>
          <label htmlFor='editMedicine'>Medicine:</label>
          <input
            type='text'
            id='editMedicine'
            value={editData.Medicine}
            onChange={(e) =>
              setEditData({ ...editData, Medicine: e.target.value })
            }
          />
          <label htmlFor='editUnitStrips'>Unit/Strips:</label>
          <input
            type='text'
            id='editUnitStrips'
            value={editData.unitstrips}
            onChange={(e) =>
              setEditData({ ...editData, unitstrips: e.target.value })
            }
          />
          <label htmlFor='editNoOfStrips'>No. of Strips:</label>
          <input
            type='text'
            id='editNoOfStrips'
            value={editData.NoOfStrips}
            onChange={(e) =>
              setEditData({ ...editData, NoOfStrips: e.target.value })
            }
          />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
    </>
  );
};

export default CreatePurchaseOrder;