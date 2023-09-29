import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './Pharmacy.css'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DataTable = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
  
      // Fetch data from the backend API
      axios.get('http://localhost:5001/Billing/Data')
      .then((response) => {
        setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  return (
    <div>
      <NavBar/>
      <Sidebar/>
      <div className='pharma-container123'>
      <div className="sk14-arrows143">
     <Link to='/Billing'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading6789'>
      <h1 className='h1cvvroyal'>Pharmacy Billing Data</h1>
      </div>
      </div>
      <table border="1" className='phtbsk14'>
        <thead>
          <tr className='tr-class-bg'>
            <th className='sk14s'>S.No</th> {/* Add S.No column */}
            <th className='sk14s'>Name</th>
            <th className='sk14s'>Invoice Number</th>
            <th className='sk14s'>Date</th>
            <th className='sk14s'>Total Amount</th>
            <th className='sk14s'>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* S.No is the index + 1 */}
              <td>{item.name}</td>
              <td>{item.invoice_number}</td>
              <td>{item.date}</td>
              <td>{item.total_amount}</td>
              <td>{item.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DataTable;
