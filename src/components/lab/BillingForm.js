import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import './CSS/BillingForm.css';
import PopupNavbar from './PapupNavbar';
import PatientNav from '../FrontDesk/PatientNav';

const BillingForm = () => {
  const [currentData, setCurrentData] = useState([]);
  const [totalDue, setTotalDue] = useState(0); // Initialize totalDue with 0
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch billing data from the server
    fetch('http://localhost:5000/api/v1/combined-data')
      .then((response) => response.json())
      .then((data) => {
        setCurrentData(data);

        // Calculate the total due
        const dueSum = data.reduce((sum, item) => sum + item.due, 0);
        setTotalDue(dueSum);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    // Find the item with the specified ID
    const itemToDelete = currentData.find((item) => item._id === id);
  
    if (itemToDelete) {
      // Calculate the total due before deleting the row
      const newTotalDue = totalDue - itemToDelete.due;
  
      // Send a DELETE request to the server to delete the record by ID
      fetch(`http://localhost:5000/api/v1/combined-data/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === 'Record deleted successfully') {
            // Remove the deleted record from the currentData state
            setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
  
            // Update the totalDue with the new total due
            setTotalDue(newTotalDue);
          } else {
            console.error('Failed to delete record');
          }
        })
        .catch((error) => console.error('Error deleting record:', error));
    }
  };
  
  const filteredData = currentData.filter((item) => {
    return (
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.some((subItem) =>
        subItem.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div>
      <PatientNav/>
      <div className="popup-overlay-a3_3">
        <div className="popup-a3">
          <div className="popup-a3_3">
            <h1 className="heading-a3_3">Total Due: {totalDue}</h1> 
            <table className="popup-table-3_3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bill</th>
                  <th>Department</th>
                  <th>Paid</th>
                  <th>Billed</th>
                  <th>Discount</th>
                  <th>Due</th>
                  <th>Refund</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>GST</th>
                  <th>Discount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.department}</td>
                    <td>{item.AmountStatus}</td>
                    <td>
                      <AiFillPrinter />
                      {item.printerValue}
                    </td>
                    <td>{item.discountper}</td>
                    <td>{item.due}</td>
                    <td>{item.refund}</td>
                    <td>{item.type}</td>
                    <td className="table-bck-11">{item.price}</td>
                    <td className="table-bck-11">{item.gst}</td>
                    {/* <td className="table-bck-11">{item.discount}</td> */}
                    <td className="table-bck-11">
                    {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.discount}
                        </div>
                      ))}
                      </td>
                    <td
                      className="table-bck-11"
                      style={{ color: item.deleteColor, cursor: 'pointer' }}
                      onClick={() => handleDelete(item._id)} // Use the actual ID from your MongoDB
                    >
                      <MdDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;