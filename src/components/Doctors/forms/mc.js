// import React, { useState } from 'react';
// import './Mc.css'; 

// const Mc = () => {
//   const [formData, setFormData] = useState({
//     patientName14: '',
//     treatmentFrom14: '',
//     treatmentTo14: '',
//     treatmentFor14: '',
//     resumeDutyFrom14: '',
//   });

//   const [tableData, setTableData] = useState([]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     if (
//       formData.patientName14 &&
//       formData.treatmentFrom14 &&
//       formData.treatmentTo14 &&
//       formData.treatmentFor14 &&
//       formData.resumeDutyFrom14
//     ) {
//       setTableData([...tableData, formData]);
//       setFormData({
//         patientName14: '',
//         treatmentFrom14: '',
//         treatmentTo14: '',
//         treatmentFor14: '',
//         resumeDutyFrom14: '',
//       });
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="container14">
//       <h2 className='f14  '>Medical Form</h2>
//       <form>
//         <label>
//           Patient Name:
//           <input
//             type="text"
//             name="patientName14"
//             value={formData.patientName14}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <div className="date-range14">
//           <label>
//             Treatment From:
//             <input
//               type="date"
//               name="treatmentFrom14"
//               value={formData.treatmentFrom14}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Treatment To:
//             <input
//               type="date"
//               name="treatmentTo14"
//               value={formData.treatmentTo14}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <br />
//         <label>
//           Treatment For:
//           <input
//             type="text"
//             name="treatmentFor14"
//             value={formData.treatmentFor14}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Resume Duty From:
//           <input
//             type="date"
//             name="resumeDutyFrom14"
//             value={formData.resumeDutyFrom14}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//       </form>
//       <button className="button14" onClick={handleSave}>
//         Save
//       </button>
//       <div>
//         <hr />
//         <h2>Table</h2>
//         <table className="table14">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Treatment From</th>
//               <th>Treatment To</th>
//               <th>Treatment For</th>
//               <th>Resume Duty From</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((data, index) => (
//               <tr key={index}>
//                 <td>{data.patientName14}</td>
//                 <td>{data.treatmentFrom14}</td>
//                 <td>{data.treatmentTo14}</td>
//                 <td>{data.treatmentFor14}</td>
//                 <td>{data.resumeDutyFrom14}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div>
//           <button className="button14" onClick={handlePrint}>
//             Print
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Mc;




// import React, { useState, useEffect } from 'react';
// import './Mc.css';
// import { Link } from 'react-router-dom';

// const Mc = () => {
//   const [formData, setFormData] = useState({
//     patientName14: '',
//     treatmentFrom14: '',
//     treatmentTo14: '',
//     treatmentFor14: '',
//     resumeDutyFrom14: '',

//   });
      

 

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     if (
//       formData.patientName14 &&
//       formData.treatmentFrom14 &&
//       formData.treatmentTo14 &&
//       formData.treatmentFor14 &&
//       formData.resumeDutyFrom14
//     ) {
//       try {
//         const response = await fetch('http://localhost:3001/Mc', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.status === 200) {
//           alert('Data saved successfully.');
          
//         } else {
//           alert('Failed to save data.');
//         }
//       } catch (error) {
//         alert('Error saving data:', error);
//       }
//     }

//     setFormData(
//       {
//         patientName14: '',
//         treatmentFrom14: '',
//         treatmentTo14: '',
//         treatmentFor14: '',
//         resumeDutyFrom14: '',
//       }
//     );
//   };

//   return (
//     <div className="container14">
//       <h2 className='f14  '>Medical Form</h2>
//       <form>
//         <label>
//           Patient Name:
//           <input
//             type="text"
//             name="patientName14"
//             value={formData.patientName14}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Treatment From:
//           <input
//             type="date"
//             name="treatmentFrom14"
//             value={formData.treatmentFrom14}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Treatment To:
//           <input
//             type="date"
//             name="treatmentTo14"
//             value={formData.treatmentTo14}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Treatment For:
//           <input
//             type="text"
//             name="treatmentFor14"
//             value={formData.treatmentFor14}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Resume Duty From:
//           <input
//             type="date"
//             name="resumeDutyFrom14"
//             value={formData.resumeDutyFrom14}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />
        
//        <Link to='/'> <button className="button14" type="button" onClick={handleSave}>
//           Save
//         </button></Link>
//       </form>
     
//     </div>
//   );
// };

// export default Mc;


import React, { useState } from 'react';
import './mc.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';


const Mc = () => {
  const [formData, setFormData] = useState({
    patientName14: '',
    treatmentFrom14: '',
    treatmentTo14: '',
    treatmentFor14: '',
    resumeDutyFrom14: '',
    // Add other input fields here
  });

  const [formErrors, setFormErrors] = useState({
    patientName14: '',
    treatmentFrom14: '',
    treatmentTo14: '',
    treatmentFor14: '',
    resumeDutyFrom14: '',
    // Add other input fields here
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = 'This field is required.';
        isValid = false;
      } else {
        newErrors[field] = '';
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5005/Mc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          alert('Data saved successfully.');
          setFormData({
            patientName14: '',
            treatmentFrom14: '',
            treatmentTo14: '',
            treatmentFor14: '',
            resumeDutyFrom14: '',
            // Add other input fields here
          });
        } else {
          alert('Failed to save data.');
        }
      } catch (error) {
        alert('Error saving data:', error);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      patientName14: '',
      treatmentFrom14: '',
      treatmentTo14: '',
      treatmentFor14: '',
      resumeDutyFrom14: '',
      // Add other input fields here
    });
    setFormErrors({
      patientName14: '',
      treatmentFrom14: '',
      treatmentTo14: '',
      treatmentFor14: '',
      resumeDutyFrom14: '',
      // Add other input fields here
    });
  };

  return (
<>

<Navbar />
      <div className='two-containers-docks'>
        <Sidebar />

    <div className="container14">
      <Link to='/'>  <button className="close-button14" onClick={handleClear}>
        X
      </button>
      </Link>
      <h2 className="f14">Medical Form</h2>
    
      <form>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName14"
            value={formData.patientName14}
            onChange={handleChange}
            required
          />
          <div className="error">{formErrors.patientName14}</div>
        </label>
        <br />
        <label>
          Treatment From:
          <input
            type="date"
            name="treatmentFrom14"
            value={formData.treatmentFrom14}
            onChange={handleChange}
            required
          />
          <div className="error">{formErrors.treatmentFrom14}</div>
        </label>
        <br />
        <label>
          Treatment To:
          <input
            type="date"
            name="treatmentTo14"
            value={formData.treatmentTo14}
            onChange={handleChange}
            required
          />
          <div className="error">{formErrors.treatmentTo14}</div>
        </label>
        <br />
        <label>
          Treatment For:
          <input
            type="text"
            name="treatmentFor14"
            value={formData.treatmentFor14}
            onChange={handleChange}
            required
          />
          <div className="error">{formErrors.treatmentFor14}</div>
        </label>
        <br />
        <label>
          Resume Duty From:
          <input
            type="date"
            name="resumeDutyFrom14"
            value={formData.resumeDutyFrom14}
            onChange={handleChange}
            required
          />
          <div className="error">{formErrors.resumeDutyFrom14}</div>
        </label>
        <br />
        {/* Add other input fields here */}
        {/* <Link to="/"> */}
          <button className="button14" type="button" onClick={handleSave}>
            Save
          </button>
        {/* </Link> */}
      </form>
    </div>
    </div>
    </>
  );
};

export default Mc;
