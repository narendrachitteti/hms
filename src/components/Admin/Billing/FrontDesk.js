// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './FrontDesk.css'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Frontdesk() {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    // Fetch billing data from the backend
    axios.get('http://localhost:5003/Frontdesk/Data')
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div >
      <NavBar/>
      <Sidebar/>
      <div className='frontpage-mainsk14'>
      <div className="sk14-arrows143">
     <Link to='/Billing'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading6789'>
      <h1 className='h1cvvroyal'>Frontdesk Billing Data</h1>
      </div>
      </div>
      <table className='frtbsk14'> 
        <thead>
          <tr className='tr-class-bg'>
            <th className='sk14s'>S.No</th>
            <th className='sk14s'>Name</th>
            <th className='sk14s'>Date</th>
            <th className='sk14s'>Total Bill</th>
            <th className='sk14s'>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.total_bill}</td>
              <td>{item.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Frontdesk;
