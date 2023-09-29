
// Cards.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./Cards.css"

function Cards() {

  const [doctors, setDoctors] = useState([]);
  
  const [staff, setStaff] = useState([]);
  const [billing, setBilling] = useState([]);
 
  useEffect(() => {
    // Fetch data from your MongoDB backend API
    fetch('http://localhost:5005/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        // Update the 'doctors' state with the fetched data
        setDoctors(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from your MongoDB backend API
    fetch('http://localhost:5005/api/staff')
      .then((response) => response.json())
      .then((data) => {
        // Update the 'doctors' state with the fetched data
        setDoctors(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from your MongoDB backend API
    fetch('http://localhost:5005/api/billing')
      .then((response) => response.json())
      .then((data) => {
        // Update the 'doctors' state with the fetched data
        setDoctors(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  

  const doctorCount = doctors.length;
  const staffCount = staff.length;
  const billingCount = billing.length;
  return (
    <div className="container-fluid-admin23">
      
       <div  className="maindiv-admin89"> 
         
          <Link to="/Billing" className="commondiv-admin89">
              {/* <h1>{data?.doctor}</h1> */}
              <h1>{billingCount}</h1>
              <p className='admin-container-names89'>Billing</p> 
           
            <MdPersonAdd className="overviewIcon" />
            </Link>



            <Link to="/Doctor" className="commondiv-admin89">
              {/* <h1>{data?.doctor}</h1> */}
              <h1>{doctorCount}</h1>
              <p>Doctor</p>       
            <MdPersonAdd className="overviewIcon" />
            </Link>


            </div>
        
            <div  className="maindiv-admin89"> 

            <Link to="/staff" className="two commondiv-admin89">
              {/* <h1>{data?.nurse}</h1> */}
              <h1>{staffCount}</h1>
              <p>Staff</p>          
            <FaUserNurse className="overviewIcon" />
            </Link>
         

          <Link to="/PatientDetails" className="three commondiv-admin89">
              <h1>0{}</h1>
              <p>Patient</p>           
            <RiEmpathizeLine className="overviewIcon" />
            </Link>

            </div>

         <div className="maindiv-admin89">
            <Link to="/reports" className="six commondiv-admin89">
              {/* <h1>{data?.admin}</h1> */}
              <h1>0</h1>
              <p>Reports</p>
              
            <TbReportSearch className="overviewIcon" />
            </Link>
            </div>
            
          
       
      
    </div>
  );
}

export default Cards;










































































































































