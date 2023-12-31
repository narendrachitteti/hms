import React, { useState, useEffect } from 'react';
import './forms.css';
import { FaArrowCircleUp, FaEdit, FaPrint } from 'react-icons/fa';
import { FaArrowCircleLeft } from 'react-icons/fa';
import EditForm from './editform'; 
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';


const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [serialNumber, setSerialNumber] = useState(1);
  const [editIndex, setEditIndex] = useState(null);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormButtonClick = () => {
    if (selectedOption === 'medical') {
     
      window.location.href = '/Mc';
    } else if (selectedOption === 'select') {
      
      window.location.href = '/Mc'; 
    }
  };

  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    
    async function fetchTableData() {
      try {
        const response = await fetch('http://localhost:5005/Mc');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTableData();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index); 
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  const handleEditSave = async (editedData) => {
    try {
      const response = await fetch(`http://localhost:5005/Mc/${editedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedTableData = [...tableData];
        updatedTableData[editIndex] = editedData;
        setTableData(updatedTableData);
        setEditIndex(null);
        alert(' Data updated successfully')
      } else {
        console.error('Failed to update data in MongoDB');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handlePrintRow = (index) => {
    const dataToPrint = tableData[index];

   
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    
   
    printWindow.document.write('<h1 > <hr/>    + JANANI CLINIC HOSPITAL </h1><hr/> <br/><h2> Medical Certificate</h2>');
    printWindow.document.write(`<p>Patient Name: ${dataToPrint.patientName14}</p>`);
    printWindow.document.write(`<p>Treatment From: ${dataToPrint.treatmentFrom14}</p>`);
    printWindow.document.write(`<p>Treatment To: ${dataToPrint.treatmentTo14}</p>`);
    printWindow.document.write(`<p>Treatment For: ${dataToPrint.treatmentFor14}</p>`);
    printWindow.document.write(`<p>Resume Duty From: ${dataToPrint.resumeDutyFrom14}</p>`);

    
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (

    <div>

<Navbar />
     
        <Sidebar />
        <div className='two-containers-docks'>
<div className="sk14">
        <div className='certificate-back-button'>
          <div className="sk14-arrows14">
            {/* <FaArrowCircleLeft /> */}
          </div>
          <div className="sk14-dropdown-container14">
            <div className="sk14-input-container14">
              <select
                className="sk14-dropdown14"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="select">Select Form</option>
                <option value="medical">Medical Form</option>
              </select>
              <button className="sk14-form-button14" onClick={handleFormButtonClick}>
                <FaArrowCircleUp />
                Add Form
              </button>
            </div>
          </div>
        </div>
        <div className='certificate-fetch-container14'>
          
          <h4  className='hesd14s'>Medical Certificates :</h4>
          <table className="table14">
            <thead>
              <tr className='table-con234'>
                <th className='ks14table-head'>S.No</th>
                <th className='ks14table-head'>Patient Name</th>
                <th className='ks14table-head'>Treatment From</th>
                <th className='ks14table-head'>Treatment To</th>
                <th className='ks14table-head'>Treatment For</th>
                <th className='ks14table-head'>Resume Duty From</th>
                <th className='ks14table-head'>Edit</th>
                <th className='ks14table-head'>Print</th>

              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index} className='ks14row'>
                  <td className='ks14table-data'>{serialNumber + index}</td>
                  <td className='ks14table-data'>{data.patientName14}</td>
                  <td className='ks14table-data'>{data.treatmentTo14}</td>
                  <td className='ks14table-data'>{data.treatmentFrom14}</td>
                  <td className='ks14table-data'>{data.treatmentFor14}</td>
                  <td className='ks14table-data'>{data.resumeDutyFrom14}</td>
                  <td className='ks14table-data'>
                    
                  <button className="edit-button14" onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </button>
                    
                  </td>
                  <td className='ks14table-data'>
                    <button className="print-button14" onClick={() => handlePrintRow(index)}>
                      <FaPrint />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      </div>
      {editIndex !== null && (
        <EditForm
          data={tableData[editIndex]}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </div>
    </div>
  );
};

export default DropdownComponent;

     