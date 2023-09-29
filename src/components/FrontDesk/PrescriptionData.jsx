

// import React, { useState, useEffect } from 'react';
// import './Prescription.css';
// import axios from 'axios';

// const PrescriptionData = () => {
//   const [prescription, setPrescription] = useState([]);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/complaints');
//         const responseData = response.data;
//         console.log(responseData);

//         setPrescription(responseData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPrescription();
//   }, []);

//   return (
//     <div>
//       <div className="main-container12">
//         {prescription.map((prescriptionItem, index) => (
//           <form key={index} className="previous-prescription">
//             <div className="previous-datapdcvvroyal">
//               {/* Make sure the properties exist in your response data */}
//               <p>Date: {prescriptionItem.date}, By Doctor: {prescriptionItem.doctor}</p>
//               <div className="action-buttonspdcvvroyal">
//                 <button className="action-buttonsbpdcvvroyal">Print</button>
//                 <button className="action-buttonsbpdcvvroyal">Email</button>
//                 <button className="action-buttonsbpdcvvroyal">SMS</button>
//               </div>
//             </div>

//             <div className="vitalspdcvvroyal" key={index}>
//               {/* Access vitals data */}
//               <h5 className="h5pdcvvroyal">Vitals Data :</h5>
//               <p className="ppdcvvroyal">BP(mmHg): {prescriptionItem.bpn} / {prescriptionItem.bpd}</p>&nbsp;
//               <p className="ppdcvvroyal">Pulse(bpm): {prescriptionItem.pulse}</p>
//               <p className="ppdcvvroyal">Height(cm): {prescriptionItem.height}</p>
//               <p className="ppdcvvroyal">Weight(kg): {prescriptionItem.weight}</p>
//               <p className="ppdcvvroyal">Temperature(F): {prescriptionItem.temperature}</p>
//               <p className="ppdcvvroyal">BMI: {prescriptionItem.bmi}</p>
//             </div>

//             {/* Diagnosis Section */}
//             <div className="diagnosis-sectionpdcvvroyal">
//               {/* Access complaints and diagnosis data */}
//               <h5 className="h5pdcvvroyal">Complaints :</h5>
//               {prescriptionItem.complaints.map((complaint, complaintIndex) => (
//                 <span key={complaintIndex}>
//                   {complaint}
//                   {complaintIndex < prescriptionItem.complaints.length - 1 ? ', ' : '.'}
//                 </span>
//               ))}
//             </div>

//             <div className="diagnosis-sectionpdcvvroyal">
//               {/* Access diagnosis data */}
//               <h5 className="h5pdcvvroyal">Diagnosis :</h5>
//               {prescriptionItem.diagnosis.map((diagnosis, diagnosisIndex) => (
//                 <span key={diagnosisIndex}>
//                   {diagnosis}
//                   {diagnosisIndex < prescriptionItem.diagnosis.length - 1 ? ', ' : '.'}
//                 </span>
//               ))}
//             </div>
//             <br />

//             {/* Medicine Section */}
//             <h4 className="h2pdcvvroyaltop"></h4>
//             <br />
//             <table className="complaints-tablepdcvvroyal">
//               <thead className="theadpdcvvroyal">
//                 <tr className="trowpdcvvroyal">
//                   <th className="theadpdcvvroyal">SNo</th>
//                   <th className="theadpdcvvroyal">Medicine</th>
//                   <th className="theadpdcvvroyal">Dose</th>
//                   <th className="theadpdcvvroyal">When</th>
//                   <th className="theadpdcvvroyal">Frequency</th>
//                   <th className="theadpdcvvroyal">Duration</th>
//                   <th className="theadpdcvvroyal">Notes</th>
//                 </tr>
//               </thead>
//               <tbody className="tbodypdcvvroyal">
//                 {prescriptionItem.medicine.map((medicineItem, medicineIndex) => (
//                   <tr className="trowpdcvvroyal" key={medicineIndex}>
//                     <td className="tbodypdcvvroyal">{medicineItem.sno}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.name}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.dose}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.when}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.frequency}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.duration}</td>
//                     <td className="tbodypdcvvroyal">{medicineItem.notes}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <br />

//             {/* Additional Information */}
//             <div className="additional-infopdcvvroyal">
//               {/* Access advice, dietexercise, testsRequested, nextVisit, nextVisitType, and nextVisitDate */}
//               <p className="ppdcvvroyal"><span>Advice :</span> {prescriptionItem.advice}</p>
//               <br />
//               <p className="ppdcvvroyal"><span>Diet and Exercise :</span> {prescriptionItem.dietexercise}</p>
//               <br />
//               <div className="diagnosis-sectionpdcvvroyal">
//                 <h5 className="h5pdcvvroyal">Tests Requested :</h5>
//                 {prescriptionItem.testsRequested.map((testsRequested, testsRequestedIndex) => (
//                   <span key={testsRequestedIndex}>
//                     {testsRequested}
//                     {testsRequestedIndex < prescriptionItem.testsRequested.length - 1 ? ', ' : '.'}
//                   </span>
//                 ))}
//               </div>
//               <br />
//               <p className="ppdcvvroyal"><span>Next Visit :</span> {prescriptionItem.nextVisit} {prescriptionItem.nextVisitType} OR {prescriptionItem.nextVisitDate}</p>
//               <br />
//             </div>
//           </form>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionData;

import React, { useState, useEffect } from 'react';
import './Prescription.css'; // Make sure to import your CSS file
import axios from 'axios';

const PrescriptionData = () => {
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/complaints');
        const responseData = response.data;
        console.log(responseData);

        setPrescription(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrescription();
  }, []);

  return (
    <div>
      <div className="prescription-container">
        {prescription.map((prescriptionItem, index) => (
          <form key={index} className="prescription-form">
            <div className="prescription-header">
              {/* Make sure the properties exist in your response data */}
              <p>Date: {prescriptionItem.date}, By Doctor: {prescriptionItem.doctor}</p>
              <div className="action-buttons">
                <button className="print-button">Print</button>
                <button className="email-button">Email</button>
                <button className="sms-button">SMS</button>
              </div>
            </div>

            <div className="vitals-data" key={index}>
              {/* Access vitals data */}
              <h5 className="vitals-heading">Vitals Data :</h5>
              <p className="vitals-info">BP(mmHg): {prescriptionItem.bpn} / {prescriptionItem.bpd}</p>&nbsp;
              <p className="vitals-info">Pulse(bpm): {prescriptionItem.pulse}</p>
              <p className="vitals-info">Height(cm): {prescriptionItem.height}</p>
              <p className="vitals-info">Weight(kg): {prescriptionItem.weight}</p>
              <p className="vitals-info">Temperature(F): {prescriptionItem.temperature}</p>
              <p className="vitals-info">BMI: {prescriptionItem.bmi}</p>
            </div>

            {/* Diagnosis Section */}
            <div className="complaints-section">
              {/* Access complaints and diagnosis data */}
              <h5 className="complaints-heading">Complaints :</h5>
              {prescriptionItem.complaints.map((complaint, complaintIndex) => (
                <span key={complaintIndex}>
                  {complaint}
                  {complaintIndex < prescriptionItem.complaints.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </div>

            <div className="diagnosis-section">
              {/* Access diagnosis data */}
              <h5 className="diagnosis-heading">Diagnosis :</h5>
              {prescriptionItem.diagnosis.map((diagnosis, diagnosisIndex) => (
                <span key={diagnosisIndex}>
                  {diagnosis}
                  {diagnosisIndex < prescriptionItem.diagnosis.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </div>
            <br />

            {/* Medicine Section */}
            <h4 className="medicine-heading"></h4>
            <br />
            <table className="medicine-table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-header">SNo</th>
                  <th className="table-header">Medicine</th>
                  <th className="table-header">Dose</th>
                  <th className="table-header">When</th>
                  <th className="table-header">Frequency</th>
                  <th className="table-header">Duration</th>
                  <th className="table-header">Notes</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {prescriptionItem.medicine.map((medicineItem, medicineIndex) => (
                  <tr className="table-row" key={medicineIndex}>
                    <td className="table-data">{medicineItem.sno}</td>
                    <td className="table-data">{medicineItem.name}</td>
                    <td className="table-data">{medicineItem.dose}</td>
                    <td className="table-data">{medicineItem.when}</td>
                    <td className="table-data">{medicineItem.frequency}</td>
                    <td className="table-data">{medicineItem.duration}</td>
                    <td className="table-data">{medicineItem.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />

            {/* Additional Information */}
            <div className="additional-info">
              {/* Access advice, dietexercise, testsRequested, nextVisit, nextVisitType, and nextVisitDate */}
              <p className="advice-info"><span>Advice :</span> {prescriptionItem.advice}</p>
              <br />
              <p className="diet-exercise-info"><span>Diet and Exercise :</span> {prescriptionItem.dietexercise}</p>
              <br />
              <div className="tests-requested-section">
                <h5 className="tests-requested-heading">Tests Requested :</h5>
                {prescriptionItem.testsRequested.map((testsRequested, testsRequestedIndex) => (
                  <span key={testsRequestedIndex}>
                    {testsRequested}
                    {testsRequestedIndex < prescriptionItem.testsRequested.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </div>
              <br />
              <p className="next-visit-info"><span>Next Visit :</span> {prescriptionItem.nextVisit}<br/>
              <span>VisitType:</span> {prescriptionItem.nextVisitType}<br/>
              <span>Visit Date:</span> {prescriptionItem.nextVisitDate}</p>
              <br />
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionData;
