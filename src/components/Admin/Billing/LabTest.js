import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './Labtest.css'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function App() {
  const [labData, setLabData] = useState([]);
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5002/Lab/Data')
      .then((response) => {
        setLabData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <NavBar/>
      <Sidebar/>
      <div className='labtest-main123'>
      <div className="sk14-arrows143">
     <Link to='/Billing'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading6789'>
      <h1 className='h1cvvroyal'>Lab Billing Data</h1>
      </div>
      </div>
      <table className='tbsk14'>
        <thead>
          <tr className='tr-class-bg'>
            <th className='sk14s'>S.No</th>
            <th className='sk14s'>Name</th>
            <th className='sk14s'>Date</th>
            <th className='sk14s'>Department</th>
            <th className='sk14s'>Test Names</th>
            <th className='sk14s'>Total Bill</th>
            <th className='sk14s'>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {labData.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.date}</td>
              <td>{data.department}</td>
              <td>{data.test_names.join(', ')}</td>
              <td>{data.total_bill.toFixed(2)}</td>
              <td>{data.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
