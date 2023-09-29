// import React, { useState, useEffect } from "react";
// import { FcSurvey } from "react-icons/fc";
// import { BiSolidUserRectangle } from "react-icons/bi";
// import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
// import { LuCreditCard } from "react-icons/lu";
// import { BiSolidUser } from "react-icons/bi";
// import { CgDropOpacity } from "react-icons/cg";
// import { MdEdit } from "react-icons/md";
// import { useLocation, useParams } from 'react-router-dom';

// import "./PatientNav.css";

// function PatientNav() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [patients, setPatients] = useState([]);
//   const location = useLocation();
//   // const patientName = location.state?.patientName; // Get patientName from location state
//   const { patientId } = useParams();

//   useEffect(() => {
//     fetch('http://localhost:5000/api/v1/combined-data')
//       .then((response) => response.json())
//       .then((data) => setPatients(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
  
//   const selectedPatient = patients.find((patient) => patient._id === patientId);


//   return (
//     <>
//       <div className="popup-overlay-Tj">
//         <div className={`popup-content_95 ${isModalOpen ? "center-content" : ""}`}>
//           <div className="patient-right">
            
//             <nav>
//               <ul>
                
//               {/* {patients.map((patient) => (
//                   <li key={patient.id}>{patient.name}</li>
//                 ))} */}
//                 {selectedPatient && (
//                   <>
//                  <li>PatientName : {selectedPatient.name}</li>
//                 <li>
//                   <a href="/Appnt">
//                     <BiSolidUserRectangle /> Appointment
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/Billingforms">
//                     <AiOutlineBars /> Bills
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/PaidTable">
//                     <LuCreditCard /> paid
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/VisitsTable">
//                     <BiSolidUser /> visits
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/LabTable">
//                     <CgDropOpacity /> Lab
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/LabEdit">
//                     <MdEdit /> Edit
//                   </a>
//                 </li>
//                 </>
//                 )}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PatientNav;

import React, { useState, useEffect } from "react";
import { FcSurvey } from "react-icons/fc";
import { BiSolidUserRectangle } from "react-icons/bi";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { LuCreditCard } from "react-icons/lu";
import { BiSolidUser } from "react-icons/bi";
import { CgDropOpacity } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { useParams } from 'react-router-dom';

import "./PatientNav.css";

function PatientNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const { patientId } = useParams();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/combined-data')
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const selectedPatient = patients.find((patient) => patient._id === patientId);

  return (
    <>
      <div className="popup-overlay-Tj">
        <div className={`popup-content_95 ${isModalOpen ? "center-content" : ""}`}>
          <div className="patient-right">
            <nav>
              <ul>
                {selectedPatient && (
                  <>
                    <li>PatientName: {selectedPatient.name}</li>
                    <li>
                      <a href="/Appnt">
                        <BiSolidUserRectangle /> Appointment
                      </a>
                    </li>
                    <li>
                      <a href="/Billingforms">
                        <AiOutlineBars /> Bills
                      </a>
                    </li>
                    <li>
                      <a href="/PaidTable">
                        <LuCreditCard /> paid
                      </a>
                    </li>
                    <li>
                      <a href="/VisitsTable">
                        <BiSolidUser /> visits
                      </a>
                    </li>
                    <li>
                      <a href="/LabTable">
                        <CgDropOpacity /> Lab
                      </a>
                    </li>
                    <li>
                      <a href="/LabEdit">
                        <MdEdit /> Edit
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientNav;
