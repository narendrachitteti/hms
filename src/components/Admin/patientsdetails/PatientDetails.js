import React, { useEffect, useState } from 'react';
import './PatientsDetails.css'; // Import your CSS 
import axios from 'axios';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'


function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:5005/patients/Data')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <NavBar/>
    <Sidebar/>
    <div className='patients-main234'>
    <div className="sk14-arrows143">
     <Link to='/frontpage'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading56789'>
      <h1 className='h1cvvroyal'>Patients Data</h1>
      </div>
      </div>
      <div className="PatientListContainer-sk14s">
      <table className="PatientTable-sk14s">
        <thead>
          <tr className='tr-class-bg'>
            <th className='sk14s'>S.No</th>
            <th className='sk14s'>Patient ID</th>
            <th className='sk14s'>Name</th>
            <th className='sk14s'>Age</th>
            <th className='sk14s'>Gender</th>
            <th className='sk14s'>Blood Group</th>
            <th className='sk14s'>Mobile Number</th>
            <th className='sk14s'>Referred By</th>
            <th className='sk14s'>Last Visit Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.patient_id}>
              <td>{index + 1}</td>
              <td>{patient.patient_id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.bloodgroup}</td>
              <td>{patient.mobilnumber}</td>
              <td>{patient.referred_by}</td>
              <td>{patient.last_visit_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
}

export default PatientList;
