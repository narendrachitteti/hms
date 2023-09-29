import React, { useState, useEffect } from 'react';
import './appointments.css';
import Sidebar from '../prescription/sidebar';
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import Previousdata1 from '../previousdata/previousdata1';
import { FiPrinter} from 'react-icons/fi';
import {FaDownload } from 'react-icons/fa'
import {CgEnter } from 'react-icons/cg'
import '../previousdata/previousdata.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [originalAppointments, setOriginalAppointments] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const[diagnosis,setDiagnosis]=useState('');
  const [state, setState] = useState('');
  const [details, setDetails] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Initialize with the current date and time

  useEffect(() => {
    // Fetch specialization options from the API
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get('http://localhost:5005/Generalcase');
        const responseData = response.data;
        console.log(responseData);
        setDiagnosis(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecializations();
  }, []);



  useEffect(() => {
    fetch('http://localhost:5005/appointments')
      .then((response) => response.json())
      .then((data) => {
        // Convert appointment IDs to lowercase for case-insensitive search
        const appointmentsData = data.map((appointment) => ({
          ...appointment,
          id: appointment.id.toLowerCase(),
        }));

        setAppointments(appointmentsData);
        setOriginalAppointments(appointmentsData); // Store the original list
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);


  useEffect(() => {
    // Fetch appointments as before

    // Set up an interval to update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleViewClick = (appointmentId) => {
    const selected = appointments.find((appointment) => appointment.id === appointmentId);
    setSelectedAppointment(selected);
    console.log(selected);
     navigate('/previousdata1', { state:  selected});
  };
  
  const handleSearch = () => {
    if (searchTerm && searchTerm.trim() !== '') {
      // Filter the appointments based on the searchTerm
      const filteredAppointments = originalAppointments.filter((appointment) =>
        appointment.id.includes(searchTerm.toLowerCase())
      );
      setAppointments(filteredAppointments);
    } else {
      // If search input is empty or undefined, reset the list to the original state
      setAppointments(originalAppointments);
    }
  };

  return (
    <>
      <Navbar />
      
        <Sidebar />
        <div className='two-containers-docks'>
        <div className='empid143appointments'>
        {!selectedAppointment && (
          <div className='appoinments-empid143'>
          <div className='Total-Appointments-empid143'>
          <h4 > Total Appointments ({appointments.length})</h4>
      {/* Search bar */}
      </div>
      <div className='search-empid143'>     
         <input className='empid143inputsearch'
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='empid143buttonsearch' onClick={handleSearch}>Search</button>
      </div>
            <div className='empid143currentDateTime'>
        <h6 className='empiddt'>Date and Time: </h6>  {currentDateTime.toLocaleString()}
        
      </div>
            {/* <Link to='/addappointments'><button className='empid143addbutton'>CreateAppointment</button></Link> */}
          </div>
          
        )}

          {/* Display the table only if no appointment is selected */}
          {!selectedAppointment && (
            <table className='empid143table'>
              <thead className='empid143head'>
                <tr className='empid143row'>
                  <th className='empid143h123'>ID</th>
                  <th className='empid143h123'>Name</th>
                  <th className='empid143h123'>View</th>
                  <th className='empid143h123'>Recent Visit</th>
                  <th className='empid143h123'>Vitals</th>
                  <th className='empid143h123'>Time</th>
                  <th className='empid143h123'>Wait</th>
                  <th className='empid143h123'>Status</th>
                  <th className='empid143h123'>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className='appointment123'>
                    <td className='empid143b1'>{appointment.id}</td>
                    <td className='empid143b1'>{appointment.name}</td>
                    <td className='empid143b1'>
                      <button className='empid143view' onClick={() => handleViewClick(appointment.id)}>View</button>
                    </td>
                    <td className='empid143b1'>{appointment.recentVisit.slice(0, 10)}</td>
                    <td className='empid143b1'>{appointment.vitals}</td>
                    <td className='empid143b1'>{appointment.time}</td>
                    <td className='empid143b1'>{appointment.wait}</td>
                    <td className='empid143b1'>{appointment.status}</td>
                    <td className='empid143b1'>{appointment.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Display selected appointment details */}
          {selectedAppointment && (
            
            <div >
            <header className='patient-name12'>
              <h6>{selectedAppointment.name} &nbsp;&nbsp;&nbsp;{selectedAppointment.id}&nbsp;|&nbsp;7995453289</h6>
            </header>
        
            <div className='case-container'>
       
                <table className='case-table'>
                  <div className='case-div143'>
                <label> <FiPrinter/>&nbsp;Print</label>&nbsp;&nbsp;&nbsp;&nbsp;<label><FaDownload/>&nbsp;Download</label><br/><br/>
        
        <label>General &nbsp;&nbsp;<CgEnter/></label><br/>
   
        </div>
                {Array.isArray(diagnosis) ? (
          diagnosis.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td className="table-cell143">Other Comorbidities</td>
              </tr>
              <tr>
                <td className="table-cell143">Diabetic : {item.diabetes.state}</td>
              </tr>
              <tr>
                <td className="table-cell143">Hypertension : {item.hypertension.state}</td>
              </tr>
              <tr>
                <td className="table-cell143">Typhoid : {item.typhoid.state} </td>
              </tr>
              <tr>
                <td className="table-cell143">CMR : {item.cmr.state}</td>
              </tr>
            </tbody>
          ))
        ) : (
          // Handle the case where diagnosis is not an array, e.g., show an error message
          <p>Diagnosis data is not available or in an unexpected format.</p>
        )}
        
               
        </table>
        <center>
        <div className='consultation-detailes'>
            
          <button className='newvisit-button' onClick={() => navigate('/prescription', { state:  selectedAppointment  })}>CREATE NEW VISIT</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b>OR</b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to='/previousdata'><button className='old-visit'>Move and Continue 19 Aug 2023 Visit</button></Link>
        <br/><br/>
        <p className='oldvisit-date'>{selectedAppointment.name}  has come 3 days early  (Actual New Visit Date 1-Sep-2023 )</p>
        <h6>25 VISITS</h6>
        <p>Since 09 Dec 2021</p>
            </div>
            </center>
            </div>
            </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Appointments;
