import React,{useState} from 'react'
import './gynic.css'
// import icon from './icon.png'
// import { response } from 'express';
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';
import { Link } from 'react-router-dom';

const Gynic = () => {
    const [tableData, setTableData]=useState([
        {pregnancy:'',delivery:'',baby:'',birthWeight:'',puerperium:''},
    ]);
    const [tableData1, setTableData1] = useState([
      {
        date: '',
        complaints: '',
        weight: '',
        bloodPressure: '',
        edema: '',
        cvsr: '',
        pog: '',
      },
    ]);
    const [activeButton, setActiveButton] = useState('Gynic');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
      };
    const [savedData, setSavedData]=useState([]);
    // Function to handle changes in table input fields
  const handleTableInputChange = (e, rowIndex, columnName) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = e.target.value;
    setTableData(updatedData);
  };

  // Function to add a new row to the table
  const addTableRow = () => {
    setTableData([...tableData, { pregnancy: '', delivery: '', baby: '', birthWeight: '', puerperium: '' }]);
  };
  // Function to remove a row from the table
  const removeTableRow = (rowIndex) => {
    const updatedData = [...tableData];
    updatedData.splice(rowIndex, 1);
    setTableData(updatedData);
  };

  
  const handleTableInputChange1 = (e, rowIndex, columnName) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = e.target.value;
    setTableData(updatedData);
  };
  const addTableRow1 = () => {
    setTableData1([
      ...tableData1,
      {
        date: '',
        complaints: '',
        weight: '',
        bloodPressure: '',
        edema: '',
        cvsr: '',
        pog: '',
      },
    ]);
  };
  const removeTableRow1 = (rowIndex1) => {
    const updatedData1 = [...tableData1];
    updatedData1.splice(rowIndex1, 1);
    setTableData1(updatedData1);
  };
  const saveData=()=>{
    const combinedData=[...tableData, ...tableData1];
    
    // setSavedData(combinedData);
  
  
  fetch('http://localhost:3000/api/Gynic/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(combinedData),
  })
    .then((response) => {
    if(response.ok) {
      // console.log(data); // Log the response from the server
      // Optionally, you can clear the form or show a success message here
    alert('data saved successfully!')
    }else{
      alert("error");
    }
  })
    .catch((error) => {
      console.error('Error saving data:', error);
      // Handle the error, e.g., show an error message to the user
      alert('error saving data.plz try again')
    });
    };
    

  return (
<>

<Navbar/>
    
    <Sidebar/>
  
    <div className='two-containers-docks23' >
    <div className="button-containercvvroyaldiabetis">
      <button
        className={`button-generalcvvroyal ${activeButton === 'General' ? 'active' : ''}`}
        onClick={() => handleButtonClick('General')}
      >
        General
      </button>
      <Link to='/diabetic'>
        <button
          className={`button-diabetescvvroyal ${activeButton === 'Diabetes' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Diabetes')}
        >
          Diabetes
        </button>
      </Link>
     
      <Link to='/dental'>
        <button
          className={`button-diabetescvvroyal ${activeButton === 'Dental' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Dental')}
        >
          Dental
        </button>
      </Link>
      <Link to='/gynic'>
        <button
          className={`button-diabetescvvroyal ${activeButton === 'Gynic' ? 'active' : ''}`}
          onClick={() => handleButtonClick('Gynic')}
        >
          Gynic
        </button>
      </Link>

    </div>
    <div className='A7total'>

    
    <div className='A7header'>
       <div className='header-content'>
        </div>
    <h1  className='A7h1common' >Janani</h1>
    <p  className='A7h1common'>
     <b  className='A7h1common'>JANANI SPECIALITY OBSTETRICS & GYNECOLOGY CLINIC</b><br/>
      629, 8th B Main Road, 3rd Stage, 2nd Block,<br/>
      Basaveshwaranagar, Bangalore -560079<br/>
     Clinic : 2322 5550, 90368177,<br/>
     E-mail : jananiclinics@gmail.com</p>
    </div>
    <b    className='A7h1common'  ><p>(In cas of emergency contact Citi Hospital, Chard Road Hospital, Kade Hospital,Sidwin Hospital,Kangaroo Care)</p></b>
   <hr/>
        <div className='containerA7'>
        <div className='A7leftdiv'>
        <b  className='A7h1common' ><p  className='A7h1common'>Name : <input></input> </p> 
        <p className='A7h1common'  >W/o : <input  className='A7h1common'></input></p><br/><br/>
        <p className='A7h1common' >ML :<input></input></p>
        <p className='A7h1common' >MH :<input></input></p><br/>
        <p className='A7h1common' >Obsteric History : G__ P__ L__ A__</p></b>
        </div>
        <div className='A7rightdiv'>
         <b className='A7h1common' ><p  className='A7h1common'>
        Age : <input  className='A7h1common'></input><br/>
        D.O.B : <input  className='A7h1common'></input><br/>
        Tel. No :___________________<br/>
         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ___________________
        </p>
        <div className='containerA7'><div className='A7subdivs outer-container'>L.M.P<input></input></div>&nbsp;
        <div className='A7subdivs outer-container'>E.D.D<input></input></div>&nbsp;
        <div className='A7subdivs outer-container'>E.D.D by scan<input></input></div></div>&nbsp;
        <br/>
        <p  className='A7h1common'>Blood Group & Rh : <input  className='A7h1common'></input></p>
        
        <p className='A7h1common'>Husband's Blood Group & Rh :<input  className='A7h1common'></input></p>
        </b>
        </div>
       
   </div>
   <div className='A7tabdiv'>
   <table className='A7tab'>
    <thead  className='A7h1common'>
    <tr  className='A7h1common'>
    <th  className='A7h1common'>NO.</th>
    <th  className='A7h1common'>PREGNANCY</th>
    <th  className='A7h1common'>DELIVERY</th>
    <th  className='A7h1common'>BABY</th>
    <th  className='A7h1common'>BIRTH WEIGHT</th>
    <th  className='A7h1common'>PUERPERIUM</th>
    </tr>
    </thead>
    <tbody  className='A7h1common'>
          {tableData.map((rowData, rowIndex) => (
            <tr   className='A7h1common'  key={rowIndex}>
              <td  className='A7h1common'>{rowIndex + 1}</td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.pregnancy}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'pregnancy')}
                />
              </td>
              <td  className='A7h1common' >
                <input  className='A7h1common'
                  type="text"
                  value={rowData.delivery}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'delivery')}
                />
              </td>
              <td  className='A7h1common' >
                <input  className='A7h1common'
                  type="text"
                  value={rowData.baby}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'baby')}
                />
              </td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.birthWeight}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'birthWeight')}
                />
              </td>
              <td  className='A7h1common'>
                <input  className='A7h1common'
                  type="text"
                  value={rowData.puerperium}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'puerperium')}
                />
              </td>
              {/* <td>
                <button onClick={() => removeTableRow(rowIndex)}>Remove</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <button  className='A7h1common' onClick={addTableRow}>Add Row</button>
   </div>
   <div  className='A7h1common'>
   <div className='containerA7'>
        <div className='A7leftdiv1'>
            <b  className='A7h1common'>
        <p  className='A7h1common'>DRUG ALLERGY : <input></input></p> <br/>
        <p  className='A7h1common'>MEDICAL HISTORY:<input></input></p><br/><br/>
        <br/>
        <p className='A7h1common'>RUBELLA STATUS :<input></input> </p></b>
        </div>
        <div className='A7rightdiv1'>
         <b className='A7h1common'><p className='A7h1common'>
        FAMILY HISTORY  
        </p></b><br/>
        <div className='containerA7'>
        <div className='A7h1common'>HT:<input  className='A7h1common'></input></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div  className='A7h1common'>DM:<input className='A7h1common'></input></div>
        </div><br/>
        <p  className='A7h1common'>Cong. Anomalies :<input  className='A7h1common'></input></p>
        <p  className='A7h1common'>Thyroid Disorder :<input  className='A7h1common'></input></p>
        <p className='A7h1common'>Twins :<input  className='A7h1common'></input></p>
        </div>
       
   </div>
   <hr/>
   <div>
   <div className='containerA7'>
        <div className='A7rightdiv1'>
            <p>Height :<input></input> </p> 
        <p>Breasts :<input></input></p>
        <p>C.V.S :<input></input> </p>
        <p>R.S<input></input></p>
        </div>
        <div className='A7rightdiv1'>
            <p>Weight :<input></input> </p> 
        <p>B.M.I :<input></input></p>
        <p>P.A :<input></input> </p>
        </div>
        <div className='A7rightdiv1'>
            <p>Tet Vac :<input></input> </p> 
        <p>Td Vac :<input></input></p>
        <p>Boosterix :<input></input> </p>
        <p>Influenza Vaccine :<input></input></p>
        </div>
       </div>
   </div>
   
   <div className='A7lastdiv'>
   <b>Please bring the card during each visit and on admission</b>
   
   </div>
   </div>
   <br/>
   <br/>
   <br/>
   <div className='A7tabdiv'>
      <table className="A7tab">
        <thead>
          <tr>
            <th>Date</th>
            <th>Complaints</th>
            <th>Wt(in Kgs)</th>
            <th>B.P. (mm of Hg)</th>
            <th>Edema</th>
            <th>C.V.S.R.S</th>
            <th>POG</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  value={rowData.date}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'date')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.complaints}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'complaints')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.weight}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'weight')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.bloodPressure}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'bloodPressure')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.edema}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'edema')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.cvsr}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'cvsr')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={rowData.pog}
                  onChange={(e) => handleTableInputChange(e, rowIndex, 'pog')}
                />
              </td>
              {/* <td>
                <button onClick={() => removeTableRow(rowIndex)}>Remove</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addTableRow}>Add Row</button>
    </div>
    <div className='empid144submitb'>
          <button className='empid144subbuton' type="submit" onClick={saveData}>Save</button>
   <Link to='/gynic1'> <button className='empid144nxtbuton' type="button">Next</button></Link>
        </div>
    </div>
    </div>
    </>
  );
};

export default Gynic;