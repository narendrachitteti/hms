// import React, { useState, useEffect } from "react";
// import "./patient.css";
// import { FcMoneyTransfer } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const Patient = () => {
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetch('http://localhost:5000/api/v1/combined-data')
//       .then((response) => response.json())
//       .then((data) => {
//         setPatients(data);
//         setFilteredPatients(data); // Initialize filteredPatients with all patients
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//   const handleSearch = (query) => {
//     setSearchQuery(query);
  
//     if (!query) {
//       setFilteredPatients(patients); // Reset the filteredPatients to all patients
//     } else {
//       // Filter patients based on the search query (assuming 'name' is a property of patient)
//       const filtered = patients.filter((patient) =>
//           (patient.name && patient.name.toLowerCase().includes(query.toLowerCase())) ||
//       (patient.patientId && patient.patientId.toLowerCase().includes(query.toLowerCase()))
       
//       );
//       setFilteredPatients(filtered);
//     }
//   };


//   return (
//     <div>
//       <Navbar onSearch={handleSearch}/>
//       <table style={{ marginTop: "13vh" }}>
//         <tbody>
//         {filteredPatients.map((patient) => (
//           <tr key={patient._id}>
//             <td>{patient.patientId}</td>
//               <td>{patient.name}</td>
//               <td>
//                 {patient.items && patient.items.length > 0 ? (
//                   <>
//                     &nbsp;&nbsp; <FcMoneyTransfer />
//                     &nbsp;&nbsp;{patient.items[0].price}
//                   </>
//                 ) : (
//                   "No items available"
//                 )}
//               </td>
//               <td>
//                 <select onChange={(e) => (window.location.href = e.target.value)}>
//                   <option value="/Patient">select</option>
//                   <option value="/Vitals">Vitals</option>
//                   <option value="/TestResults">Test Results</option>
//                   <option value="/PrescriptionDesk">Prescription</option>
//                   <option value="/Attachment">Attachments</option>
//                 </select>
//               </td>
//               <td>{patient.hour}Hrs &nbsp;{patient.minute}mins</td>
            
//               <td>{patient.doctor}</td>
//               {patient.items.map((item, index) => (
//                       <div>{item.type}</div>
//                     ))}
            
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Patient;
// import React, { useState, useEffect } from "react";
// import "./patient.css";
// import { FcMoneyTransfer } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const Patient = () => {
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetch('http://localhost:5000/api/v1/combined-data')
//       .then((response) => response.json())
//       .then((data) => {
//         setPatients(data);
//         setFilteredPatients(data); // Initialize filteredPatients with all patients
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);
//   const handleSearch = (query) => {
//     setSearchQuery(query);
  
//     if (!query) {
//       setFilteredPatients(patients); // Reset the filteredPatients to all patients
//     } else {
//       // Filter patients based on the search query (assuming 'name' is a property of patient)
//       const filtered = patients.filter((patient) =>
//           (patient.name && patient.name.toLowerCase().includes(query.toLowerCase())) ||
//       (patient.patientId && patient.patientId.toLowerCase().includes(query.toLowerCase()))
       
//       );
//       setFilteredPatients(filtered);
//     }
//   };


//   return (
//     <div>
//       <Navbar onSearch={handleSearch}/>
//       <table style={{ marginTop: "13vh" }}>
//         <tbody>
//           {filteredPatients.map((patient) => (
//             <tr key={patient._id}>
//               <td>{patient.patientId}</td>
//               <td>{patient.name}</td>
//               <td>
//                 {patient.items && patient.items.length > 0 ? (
//                   <>
//                     &nbsp;&nbsp; <FcMoneyTransfer />
//                     &nbsp;&nbsp;{patient.items[0].price}
//                   </>
//                 ) : (
//                   "No items available"
//                 )}
//               </td>
//               <td>
                // <select onChange={(e) => (window.location.href = e.target.value)}>
                //   <option value="/Patient">select</option>
                //   <option value="/Vitals">Vitals</option>
                //   <option value="/TestResults">Test Results</option>
                //   <option value="/PrescriptionDesk">Prescription</option>
                //   <option value="/Attachment">Attachments</option>
                // </select>
//               </td>
//               <td>{patient.hour}Hrs &nbsp;{patient.minute}mins</td>
            
//               <td>{patient.doctor}</td>
//               {patient.items.map((item, index) => (
//                       <div>{item.type}</div>
//                     ))}
            
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Patient;

import React, { useState, useEffect } from "react";
import "./patient.css";
import { FcMoneyTransfer } from "react-icons/fc";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/combined-data")
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data); // Initialize filteredPatients with all patients
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredPatients(patients); // Reset the filteredPatients to all patients
    } else {
      // Filter patients based on the search query (assuming 'name' is a property of patient)
      const filtered = patients.filter(
        (patient) =>
          (patient.name &&
            patient.name.toLowerCase().includes(query.toLowerCase())) ||
          (patient.patientId &&
            patient.patientId.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPatients(filtered);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <table style={{ marginTop: "13vh" }}>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.patientId}</td>
              <td>
              <Link to={`/patient/${patient.patientId}/PatientNav`}>
                {patient.name}
              </Link>
            </td>
              <td>
                {patient.items && patient.items.length > 0 ? (
                  <>
                    &nbsp;&nbsp; <FcMoneyTransfer />
                    &nbsp;&nbsp;{patient.items[0].price}
                  </>
                ) : (
                  "No items available"
                )}
              </td>
              <td>
                <select onChange={(e) => (window.location.href = e.target.value)}>
                  <option value="/Patient">select</option>
                  <option value={`/patient/${patient.patientId}/vitals`}>Vitals</option>
                  <option value={`/patient/${patient.patientId}/testresults`}>Test Results</option>
                  <option value={`/patient/${patient.patientId}/PrescriptionData`}>Prescription</option>
                  <option value={`/patient/${patient.patientId}/attachment`}>Attachments</option>
                </select>
              </td>

              
              <td>
                {patient.hour}Hrs &nbsp;{patient.minute}mins
              </td>
              <td>{patient.doctor}</td>
              {patient.items.map((item, index) => (
                <div key={index}>{item.type}</div>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
