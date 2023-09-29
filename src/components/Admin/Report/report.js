import React, { useState, useEffect } from 'react';
import './report.css';
import NavBar from '../Navbar/Navbar';
import axios from 'axios';
import Sidebar from '../Navbar/Sidebar';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const LabReports = () => {
  const [labData, setLabData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5003/Reports/Data')
      .then((response) => {
        setLabData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className='report-main123'>
      <div className="sk14-arrows143">
     <Link to='/frontpage'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading56789'>
      <h1 className='h1cvvroyal'>Reports Data</h1>
      </div>
      </div>
        <div className="lab-reports-container14">
        <table className="lab-reports-table14">
          <thead>
            <tr className='tr-class-bg'>
              <th className='sk14s'>ID</th>
              <th className='sk14s'>Name</th>
              <th className='sk14s'>Gender</th>
              <th className='sk14s'>Test Name</th>
              <th className='sk14s'>Test Date</th>
            </tr>
          </thead>
          <tbody>
            {labData.map((report) =>
              report.tests.map((test, index) => (
                <tr key={`${report.id}-${test.testName}-${index}`} className="table-row14">
                  <td>{report.id}</td>
                  <td>{report.name}</td>
                  <td>{report.gender}</td>
                  <td>{test.testName}</td>
                  <td>{test.testDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default LabReports;
