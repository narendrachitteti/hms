
import React, { useState, useRef,useEffect } from 'react';
import './prescription.css'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { CgArrowDownR } from 'react-icons/cg';
import { BiMessageAltDetail } from 'react-icons/bi';
import { RiImageAddLine } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import { FiPrinter} from 'react-icons/fi';
import { FaRegSave } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineTextsms } from 'react-icons/md';
import Medicine from './medicine';
import Navbar from '../navbar/navbar';
import Sidebar from './sidebar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const tests=[
  {value:'RBS',label:'RBS'},
  {value:'FBS',label:'FBS'},
  {value:'THYROID',label:'THYROID'},
  {value:'HIV',label:'HIV'},
  {value:'CBP',label:'CBP'},
  {value:'RFT',label:'RFT'},
  {value:'LFT',label:'LFT'},

]


const options=[
  {value:'FEVER',label:'FEVER'},
  {value:'COLD',label:'COLD'},
  {value:'COUGH',label:'COUGH'},
  {value:'HEADACHE',label:'HEADACHE'},
  {value:'NASIA',label:'NASIA'},
  {value:'WEAKNESS',label:'WEAKNESS'},
  {value:'WEIGHTLOSS',label:'WEIGHTLOSS'},

];
const data=[
  {value:'HYPERTENSION',label:'HYPERTENSION'},
  {value:'TB',label:'TB'},
  {value:'DIABETES',label:'DIABETES'},
  {value:'THYROID',label:'THYROID'},
  {value:'INSOMNIA',label:'INSOMNIA'},
  {value:'ASTHMA',label:'ASTHMA'},
]


const Prescription = () => {
  const location = useLocation();
  const selectedAppointment = location.state || {}; 
  

  // const { id, name, /* other properties */ } = selectedAppointment;


  const [tableData, setTableData] = useState([]);
    const [latestSno, setLatestSno] = useState(1);
  const [newEntry, setNewEntry] = useState({
    sno: latestSno,
    medicine: '',
    dose: '',
    when: '',
    frequency: '',
    duration: '',
    notes: '',
    
  });
  const snoInputRef = useRef(null);
  const medicineInputRef = useRef(null);
  const doseInputRef = useRef(null);
  const whenInputRef = useRef(null);
  const frequencyInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const notesInputRef = useRef(null);

  const handleKeyDown = (event, fieldName) => {
    if (event.key === 'ArrowRight' || event.key === 'Enter') {

      if (fieldName === 'sno' && medicineInputRef.current) {
        medicineInputRef.current.focus();
      } 
      else if (fieldName === 'medicine' && doseInputRef.current) {
        doseInputRef.current.focus();
      } 
      else if (fieldName === 'dose' && whenInputRef.current) {
        whenInputRef.current.focus();
      } 
      else if (fieldName === 'when'&& frequencyInputRef.current) {
        frequencyInputRef.current.focus();
      }
      else if (fieldName === 'frequency'&& durationInputRef.current) {
        durationInputRef.current.focus();
      }
      else if (fieldName === 'duration'&& notesInputRef.current) {
        notesInputRef.current.focus();
      }

      else if(fieldName=='notes'){
        addNewEntry();
      }
      
    }
  };

  const addNewEntry = () => {
    if ( newEntry.medicine.trim() !== '' && newEntry.dose.trim() !== '' && newEntry.when.trim() !== '' && newEntry.frequency.trim() !== ''&& newEntry.duration.trim() !== ''&& newEntry.notes.trim() !== '') {
      setTableData([...tableData, newEntry]);
      setLatestSno(latestSno + 1);
      setNewEntry({
        sno:latestSno + 1 ,
        medicine: '',
        dose: '',
        when: '',
        frequency: '',
        duration: '',
        notes:''
      });
      if (snoInputRef.current) {
        snoInputRef.current.focus();
      }
    }
  };

  const deleteEntry = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };


  const[selectedoptions,Setselectedoptions]=useState([]);
  const[selecteddata,Setselecteddata]=useState([]);
  const[selectedtest,Setselectedtest]=useState([]);
  const [testWhen, setTestWhen] = useState('none');
  const [nextVisit, setNextVisit] = useState('');
  const [nextVisitType, setNextVisitType] = useState('');
  const [nextVisitDate, setNextVisitDate] = useState('');
  const [printing, setPrinting] = useState(false);
  const[complaints,setComplaints]=useState('')
  const[diagnosis,setDiagnosis]=useState('')
  const[advice,setAdvice]=useState('')
  const[dietexercise,setDietexercise]=useState('')
  const[testsRequested,setTestsRequested]=useState('')
  const[vitals,setVitals]=useState([])
  
  
  const handleButtonClick = (selectedValue) => {
    setNextVisitType(selectedValue);
  };


  const handleChange=(selectedoptions)=>{
      Setselectedoptions(selectedoptions);
  }

  const handleChange1=(selecteddata)=>{
    Setselecteddata(selecteddata);
}

const handleChange2=(selectedtest)=>{
    Setselectedtest(selectedtest);
}

const handleSave = async () => {

  console.log('handleSave function called');
  const selectedComplaints = selectedoptions.map(option => option.value);
  const selectedDiagnosis = selecteddata.map(option => option.value);
  const selectedTests = selectedtest.map(option => option.value);
  const testWhenToSend = testWhen === "none" ? "" : testWhen;

  console.log('selectedTests:', selectedTests);
console.log('testWhenToSend:', testWhenToSend);

  try {
    await axios.post('http://localhost:5000/Complaints', { 
      complaints: selectedComplaints,
    diagnosis:selectedDiagnosis,
    medicine:tableData,
    advice,
    dietexercise ,
    testsRequested:selectedTests,
    testWhen: testWhenToSend,
    nextVisit:nextVisit,
nextVisitType:nextVisitType,
nextVisitDate,
  });

    alert('Saved Successfully');
  } catch (error) {
    console.error('Error while saving:', error);
    alert('Error while saving. Please check the console for more details.');
  }

  Setselectedoptions([]);
  Setselecteddata([]);
  Setselectedtest([]);
   // Clear the selected options array
  setComplaints(''); 
  setDiagnosis('');
  setAdvice('');
  setDietexercise('');
  setTestsRequested('');
  setNextVisit('');
  setNextVisitType('');
  setNextVisitDate('');
  setTableData([]); // Clear the tableData array
  setNewEntry({
    sno: '',
    medicine: '',
    dose: '',
    when: '',
    frequency: '',
    duration: '',
    notes: '',
  });
  // Clear the complaints input field
};

useEffect(() => {
  // Fetch vitals data from the API
  const fetchVitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Vitals');
      const responseData = response.data;
      console.log(responseData);
      setVitals(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchVitals();
}, []);



const handlePrint = () => {
  setPrinting(true);

  const printWindow = window.open('', '_blank');
  const content = document.getElementById('print-content').innerHTML;
  printWindow.document.write('<html><head><title>Prescription</title></head><body>');
  printWindow.document.write(content);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
  setPrinting(false);
};


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'yellow' : 'white', // Change to your desired background color
  }),
};

const lastVital = vitals.length > 0 ? vitals[vitals.length - 1] : {};
  return (
    <div >
       
       <Navbar/>
    
    <Sidebar/>
        
    <div id='print-content' >
    <div className='others12' >
    <header className='patient-name12'>
      <h6>{selectedAppointment.name} &nbsp;&nbsp;&nbsp;{selectedAppointment.id}&nbsp;&nbsp;</h6>
    </header>

    
   <div >
    
   <label className='vitals-heading12'>Vitals</label>
    
   
    
   <div className='vitals-container12' key={vitals.id}>
   <div className='vitals12' >
<label htmlFor='bp' className='vitals-label12'>BP(mmHg)</label>
<input style={inputStyle}type='text' name='bp' className='vitals-input12' value={ lastVital.bpn}/>/
<input type='text' name='bp' className='vitals-input12' value={ lastVital.bpd}/>
<label htmlFor='pulse' className='vitals-label12'>Pulse(bpm)</label>
<input type='text' name='pulse'  value={ lastVital.sugar} className='vitals-input12'/>
<label htmlFor='height' className='vitals-label12'>Height(cm)</label>
<input type='text' name='height'className='vitals-input12'value={ lastVital.height} />
<label htmlFor='weight' className='vitals-label12'>Weight(kg)</label>
<input type='text' name='weight' className='vitals-input12'value={ lastVital.weight} />
<label htmlFor='temparature' className='vitals-label12'>Tempatature(F)</label>
<input type='text' name='temparature' className='vitals-input12' value={ lastVital.temperature} />
</div>


<div className='vitals12'>
<label htmlFor='spo2' className='vitals-label12'>SPO2(%)</label>
<input type='text' name='spo2'className='vitals-input12'value={ lastVital.spo2} />
<label htmlFor='pallor' className='vitals-label12'>Pallor()</label>
<input type='text' name='pallor' className='vitals-input12'value={ lastVital.pallor}/>
<label htmlFor='edema' className='vitals-label12'>Edema()</label>
<input type='text' name='edema' className='vitals-input12' value={lastVital.edema}/>
<label htmlFor='icterus' className='vitals-label12'>Icterus(cm)</label>
<input type='text' name='icterus'className='vitals-input12'value={ lastVital.lcterus} />
<label htmlFor='lymphademopathy' className='vitals-label12'>Lymphademopathy()</label>
<input type='text' name='lymphademopathy' className='vitals-input12'value={ lastVital.lymphadenopathy}/>


</div>
<div className='vitals12'>
  <label htmlFor='clubbing'className='vitals-label12'>Clubbing()</label>
  <input type='text' name='clubbing'className='vitals-input12'value={ lastVital.ciubbing} />
<label htmlFor='cyanosis'className='vitals-label12'>Cyanosis()</label>
<input type='text' name='cyanosis' className='vitals-input12'value={ lastVital.cyanosis}/>
<label htmlFor='jvp'className='vitals-label12'>JVP()</label>
<input type='text' name='jvp'className='vitals-input12'value={ lastVital.jvp} />

</div>

</div>
   
  
<div className='form'>
<div className='complaints12'>
     
      <div className='complaints-labels12' >
        <label  className='label-heading12'>Complaints</label><br/>
       
    </div> 
    <div className='complaints-select12' >
        
        <Select
        name='complaints'
        options={options}
        value={selectedoptions}
        onChange={handleChange}
        isMulti={true}
        >

        </Select>
        
    
    </div>

    

    </div>

    <div className='complaints12'>
    <div className='complaints-labels12' >
    <label className='label-heading12' >Diagnosis</label><br/>
       
       
    </div>
    <div className='complaints-select12'>
        
        <Select
        name='diagnosis'
        options={data}
        value={selecteddata}
        onChange={handleChange1}
        isMulti={true}
        >

        </Select>
        
    </div>
    </div>
    
    
    
   <div>
   <div className='medicine-container12'>
   <div >
    
    <table style={tableStyle} >
        <thead  >
          <tr className='table-r12'>
            <th  style={thStyle} className='td-sno12'>SNo</th>
            <th style={thStyle}>MEDICINE</th>
            <th style={thStyle}>Dose</th>
            <th style={thStyle}>When</th>
            <th style={thStyle}>Frequency</th>
            <th style={thStyle}>Duration</th>
            <th style={thStyle}> Notes/Instructions</th>
             {/* Column for delete button */}
          </tr>
        </thead>
        <tbody >
          {tableData.map((entry, index) => (
            <tr key={index} className='table-r12'>
              <td style={tdStyle}>{entry.sno}</td>
              <td style={tdStyle}>{entry.medicine}</td>
              <td style={tdStyle}>{entry.dose}</td>
              <td style={tdStyle}>{entry.when}</td>
              <td style={tdStyle}>{entry.frequency}</td>
              <td style={tdStyle}>{entry.duration}</td>
              <td style={tdStyle}>{entry.notes}</td>
              
                <i onClick={() => deleteEntry(index)}> <MdDelete/></i>
              
            </tr>
          
          ))}
          <tr className='table-r12'>
            <td className='table-c12'>
              <input
                type="text"
                className='prescription-input12'
                value={newEntry.sno}
                onChange={(e) => setNewEntry({ ...newEntry, sno: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'sno')}
                ref={snoInputRef}
              />
            </td>
            <td className='table-c12'>
              <select
                
                className='prescription-input12'
                value={newEntry.medicine}
                onChange={(e) => setNewEntry({ ...newEntry, medicine: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'medicine')}
                ref={medicineInputRef}>
                    <option value=''></option>
                    <option value='CITEREZ 10 MG TABLET'>CITEREZ 10 MG TABLET</option>
                    <option value='ALDOCTONE 25MG TABLET'>ALDOCTONE 25MG TABLET</option>
                    <option value='PARACETOMAL 125MG SYRUP'>PARACETOMAL 125MG SYRUP</option>
                    <option value='TADORA 20MG TABLET'>TADORA 20MG TABLET</option>
                    <option value='UPWARDZ 20MG TABLET'>UPWARDZ 20MG TABLET</option>
                    
                </select>
              
            </td>
            <td className='table-c12'>
              <select
            
            className='prescription-input12'
                value={newEntry.dose}
                onChange={(e) => setNewEntry({ ...newEntry, dose: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'dose')}
                ref={doseInputRef}
              >
             <option></option>
             <option value='1-0-1'>1-0-1</option>
             <option value='0-1-0'>0-1-0</option>
             <option value='1-0-0'>1-0-0</option>
             <option value='1-0-1'>1-0-1</option>
             <option value='0-0-1'>0-0-1</option>
             <option value='1-1-1'>1-1-1</option>
              </select>
            </td>

            <td className='table-c12'>
              <select
                
                
                className='prescription-input12'
                
                value={newEntry.when}
                onChange={(e) => setNewEntry({ ...newEntry, when: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'when')}
                ref={whenInputRef}
              ><option></option>
                <option value='After Food'>After Food</option>
                <option value='Before Food'>Before Food</option>
                <option value='Before Breakfast'>Before Breakfast</option>
                <option value='After Breakfast'>After Breakfast</option>
                <option value='Empty Stomatch'>Empty Stomatch</option>
              </select>
            </td>
            <td className='table-c12'>
              <select
                
                className='prescription-input12'
                value={newEntry.frequency}
                onChange={(e) => setNewEntry({ ...newEntry, frequency: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'frequency')}
                ref={frequencyInputRef}
              >
                <option></option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
                <option value='daily'>daily</option>
              </select>
            </td>
            <td className='table-c12'>
              <select
                type='text'
                className='prescription-input12'
                value={newEntry.duration}
                onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'duration')}
                ref={durationInputRef}
              >
                <option></option>
                <option value='4days'>4days</option>
                <option value='1 week'>1 week</option>
                <option value='1 month'>1month</option>
                <option value='15 days'>15 days</option>
              </select>
            </td>
            <td className='table-c12'>
              <input
                type="text"
                className='prescription-input12'
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                onKeyDown={(e) => handleKeyDown(e, 'notes')}
                ref={notesInputRef}
              />
            </td>
            
          </tr>
        </tbody>
      </table>

</div>


</div>
   </div> 

  
     <div className='complaints12'>
      <div className='complaints-labels12' >
        <label className='label-heading12'>Advice</label><br/>
        
       
    </div> 
    <div className='complaints-select12'>
        <textarea name='advice'
        value={advice}
         onChange={(e) => setAdvice(e.target.value)}
        className='advice12'></textarea>
      </div>
</div>

<div className='complaints12'>
      <div className='complaints-labels12'>
        <label className='label-heading12'>Diet & Exercise</label><br/>
        
       
    </div> 
    <div className='complaints-select12'>
        <textarea name='diet and exercise'
        className='advice12'
        value={dietexercise}
         onChange={(e) => setDietexercise(e.target.value)}
        ></textarea>
      </div>
      </div>
      
      
      <div className='complaints12'>
  <div className='label-div12'>
    <label className='label-heading12'>Tests Requested</label><br/>
    
  </div>
  <div className='select-div12'>
    <Select
    name='tests requested'
      options={tests}
      value={selectedtest}
      onChange={handleChange2}
      isMulti={true}
      styles={customStyles}
    />
  </div>
  <div className='test-when-div12'>
  <div className='input-container12'>
    <label>Test (When)</label><br/>
    
  </div>
  <div className='select-container12'>
  <input
  name='testwhen'
    type="text"
    value={testWhen}
    onChange={(e) => setTestWhen(e.target.value)}
    className='custom-input12'
  />
  <select
  name='testwhen'
    value={testWhen}
    onChange={(e) => setTestWhen(e.target.value)}
    className='custom-input12'
  >
    <option value="">none</option>
    <option value="fasting">fasting</option>
    <option value="after-brkfst">after-brkfst</option>
    <option value="anytime">anytime</option>
  </select>
</div>

</div>

</div>




    <div className='complaints-labels12' >
    <label className='label-heading12'>Next Visit&nbsp;&nbsp; </label>
        <input
        name='nextvisit'
          className="small-input12"
          value={nextVisit}
          onChange={(e) => setNextVisit(e.target.value)}
        />
        
      <button
        className={`button-advise12 ${nextVisitType === 'days' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('days')}
      >
        Days
      </button>
      <button
        className={`button-advise12 ${nextVisitType === 'weeks' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('weeks')}
      >
        Weeks
      </button>
      <button
        className={`button-advise12 ${nextVisitType === 'months' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('months')}
      >
        Months
      </button>
    
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>OR</b>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
        name='date'
          type="date"
          value={nextVisitDate}
          onChange={(e) => setNextVisitDate(e.target.value)}
        />
    </div>

    </div>
    {/* <button onClick={handleSave}>Save</button> */}
    </div>
    <footer className='footer-container12'>
  <div className='button-group12'>
  <button  className='spesbutton12' name='save' onClick={handleSave}><FaRegSave/>&nbsp;Save</button>
  
<button className='spesbutton12' name='print' onClick={handlePrint}><FiPrinter/>&nbsp;Print</button>
<button  className='spesbutton12' name='email'><AiOutlineMail/>&nbsp;Email</button>
<button  className='spesbutton12' name='sms'><MdOutlineTextsms/>&nbsp;SMS</button>

</div>
</footer>
    </div>   
    
</div>



    </div>

    


    
    
  )
}

const inputStyle ={
  width:'40px',
  

};
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  //   backgroundColor: '#B0C4DE',
};
const h11 = {
  marginTop: '10px',
  textAlign: 'left'
}

const thStyle = {
  backgroundColor: '#ccc',

  fontWeight: 'bold',
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ccc',
  color: 'black',
};

const tdStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ccc',
  

};

const evenRowStyle = {
  backgroundColor: 'dark'
};

export default Prescription 
