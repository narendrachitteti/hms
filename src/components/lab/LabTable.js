import React, { useState, useEffect } from 'react';
import './CSS/Lab.css';
import img1 from './img1.jpg';
import Modal from 'react-modal';
import axios from 'axios';
import { AiFillMail } from 'react-icons/ai';
import PopupNavbar from "./PapupNavbar";
import PatientNav from '../FrontDesk/PatientNav';


const LabTable = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [labData, setLabData] = useState([]);
  const [selectedData, setSelectedData] = useState(null); // Initialize selectedData as null
  const [searchTerm, setSearchTerm] = useState('');
  const [modalData, setModalData] = useState(null);


  const openModal = (item) => {
    setModalIsOpen(true);
    setSelectedData(item); // Set the data for the selected item

    // Fetch patient data based on ID
    axios
      .get(`http://localhost:5000/api/labPatient/${item._id}`)
      .then((response) => {
        // Set the data for the modal
        setModalData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedData(null); // Clear selectedData when closing
    setModalData(null); // Clear modal data when closing
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {

  };



  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get('http://localhost:5000/api/labPatient')
      .then((response) => {
        // Set the data for labData
        setLabData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lab data:', error);
      });
  }, []);
  
  return (
    <>
    <PatientNav />
    <div>

      <table className='table-2'>
        <thead>
          <tr>
            <th className="first-th2">Date</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
        {labData.map((item) => (
              <tr key={item._id}>
                <td className="first-th-2">{item.PageDate}</td>
                <td>
                  <button className='button-2' onClick={() => openModal(item)}>View</button>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Page Modal"
      >
        <div className="page-container">
          <div className='text-2'>
            <input
              type="text"
              placeholder="Phone no:"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}> <AiFillMail /></button>
          </div>
          <div className="header">
            <img src={img1} alt="Header Image" />
            <div>
              <h1>health care</h1>
              <h2>consulting</h2>
            </div>
          </div>

          {selectedData && (
              <div className="lab-data">
                <ul>
                  <li key={selectedData._id}>
                    <div className="patient-info">
                      <p>1. Name: {selectedData.PageName}</p>
                      <p>Date: {selectedData.PageDate}</p>
                      <p>Height: {selectedData.PageHeight} Weight: 60kg</p>
                      <p>Complaint:{selectedData.PageComplaint}</p>
                      <p>Diagnosis:{selectedData.PageDiagnosis} </p>
                      <hr />
                      <p>
                        2. DOLO 650MG TABLE* 1-0-1 After Food-Daily-5Days{selectedData.Page_DOLO_650MG_TABLE}
                        <br />
                        Composition:{selectedData.PageComposition}
                        <br />
                        Timing:{selectedData.PageTiming}
                      </p>
                      <hr />
                      <p>
                        3. ROSUVAS CV 10MG CAPSULE* 0-0-1{selectedData.Page_ROSUVAS_CV_10MG_CAPSULE}
                        <br />
                        Composition:{selectedData.PageComposition1}
                        <br />
                        Timing:{selectedData.PageTiminG}
                      </p>
                      <hr />
                      <p>
                        4. CONCORAM 5MG TABLET* 0-0-1{selectedData.Page_CONCORAM_5MG_TABLET}
                        <br />
                        Composition:{selectedData.Pagecomposition}
                        <br />
                        Timing:{selectedData.Pagetiming}
                      </p>
                      <hr />
                      <p>Advice </p>
                      <p>{selectedData.PageAdvice}</p>
                      <p> {selectedData.PageFruit}</p>
                      <p>{selectedData.PageSalt}</p>
                      <br />
                      <br />
                      <div className='Doctor-2'>
                        <p>{selectedData.PageDoctor}</p>
                        <p>{selectedData.PageEducation}</p>
                        <p>{selectedData.PageCONSULTIN}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </Modal>
    </div>
    </>
  );
};

export default LabTable;