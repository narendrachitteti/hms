import React, {useState, useEffect} from "react";
import "./Existingpatient.css"; // Import your CSS file for styling
import Navbar from "./Navbar";
import { BsPrinter } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";

const ExistingPatient = () => {
  const [currentData, setCurrentData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
      patientId:"",  
      name: "",
        gender: "",
        age: "",
        mobile: "",
        bloodGroup: "",
        email: "",
        address: "",
      });
    const [pid,setID]=useState([]);
      const [addedItems, setAddedItems] = useState([]);
      const [selectedType, setSelectedType] = useState("type");
      const [unitPrice, setUnitPrice] = useState("");
      const [discount, setDiscount] = useState("");
      const [inputError, setInputError] = useState(false);
      const [showAdditionalForm, setShowAdditionalForm] = useState(false);
      const [showBill, setShowBill] = useState(false);
      const [selectedDoctor, setSelectedDoctor] = useState("");
      const [appointmentDate, setAppointmentDate] = useState("");
      const [selectedDuration, setSelectedDuration] = useState("");
      const [selectedHour, setSelectedHour] = useState("");
      const [selectedMinute, setSelectedMinute] = useState("");
      const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("");
      const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
      const [selectedAmountStatus, setselectedAmountStatus] = useState("");
      const [email, setEmail] = useState("");
      const isInputValid = selectedType && unitPrice && discount;
      const totalAmount = addedItems.reduce((total, item) => {
        return total + (item.price - (item.price * item.discount) / 100);
      }, 0);
    
      const handleAddClick = () => {
        if (isInputValid) {
          setInputError(false);
          const newItem = {
            pid:pid,
            type: selectedType,
            price: unitPrice,
            discount: discount,
          };
          
          setAddedItems([...addedItems, newItem]);
          setUnitPrice('');
          setDiscount('');
          setSelectedType('');
          setShowAdditionalForm(true);
        } else {
          setInputError(true);
        }
      };
    
      const handleDeleteClick = (index) => {
        const updatedItems = [...addedItems];
        updatedItems.splice(index, 1);
        setAddedItems(updatedItems);
      };
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const requestData = {
          patientData: {
            patientId:formData.patientId,
            name: formData.name,
            gender: formData.gender,
            age: formData.age,
            mobile: formData.mobile,
            bloodGroup: formData.bloodGroup,
            email: formData.email,
            address: formData.address,
          },
          services: addedItems,
          appointment: {
            doctor: selectedDoctor,
            date: appointmentDate,
            duration: selectedDuration,
            time: `${selectedHour}:${selectedMinute} ${selectedTimeOfDay}`,
          },
          payment: {
            mode: selectedPaymentMode,
            amountStatus: selectedAmountStatus,
            email,
            totalAmount,
          },
        };
      
        try {
            const response = await axios.post('http://localhost:5006/api/v1/existingpatients-data', requestData);
            console.log(response.data);
        
            window.alert('Patient added successfully');
            // navigate('/Patient',  { state: { patientName: name } });
            // fetchPatients();
            if (response.status === 201) {
              console.log('Patient added:', response.data);
            } else {
              console.error('Failed to add patient');
            }
          } catch (error) {
            console.error(error);
          }
        };
    
      const handlePrintClick = () => {

      };
      const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
      };
      
      const handleUnitPriceChange = (e) => {
        setUnitPrice(e.target.value);
      };
      
      const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
      };
      
      const handleContinueClick = () => {
        setShowAdditionalForm(false);
        setShowBill(true);
      };
    
      const handleBackClick = () => {
        setShowAdditionalForm(false);
      };
    
      const isAdditionalFormValid = selectedDoctor && appointmentDate && selectedDuration && selectedHour && selectedMinute && selectedTimeOfDay;
    
    useEffect(() => {
        fetch('http://localhost:5000/api/v1/combined-data')
          .then((response) => response.json())
          .then((data) => setCurrentData(data))
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

      useEffect(() => {
        const filteredPatient = currentData.find((item) => {
          return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.mobile.includes(searchTerm) ||  // Include mobile in search
            item.patientId.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        if (filteredPatient) {
            setFormData({
              patientId: filteredPatient.patientId || "",
              name: filteredPatient.name || "",
              gender: filteredPatient.gender || "",
              age: filteredPatient.age || "",
              mobile: filteredPatient.mobile || "",
              bloodGroup: filteredPatient.bloodGroup || "",
              email: filteredPatient.email || "",
              address: filteredPatient.address || "",
            });
          } else {
            // Clear the form data if no matching patient is found
            setFormData({
              patientId: "",
              name: "",
              gender: "",
              age: "",
              mobile: "",
              bloodGroup: "",
              email: "",
              address: "",
            });
          }
        }, [searchTerm, currentData]);
      
  return (
    <>
    <Navbar  onSearch={setSearchTerm} />
    <div className="existing-patient-container">
      <h2>Existing Patient Details</h2>
      <form className="existing-patient-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
            <label className="existing-labels" htmlFor="pid">
              Patient ID:
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={(e) =>
                
              setFormData({ ...formData, patientId: e.target.value })

              }
            />
          </div>
      <div className="form-group">
            <label className="existing-labels" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="existing-labels" htmlFor="gender">
              Gender:
            </label>
            <select
              id="number"
              className="existing-select"
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="select">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="name">
            Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="mobile">
            Mobile number:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="name">
            Blood Group:
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="email">
            Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label className="existing-labels" htmlFor="address">
            Address:
            </label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="input-table-container12">
        <table className="input-table12">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
              <th>Discount (%)</th>
              <th>Action</th>

              
            </tr>
          </thead>
          <tbody>
            {addedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>₹{item.price}</td>
                <td>{item.discount}%</td>
                <td>
                  <button onClick={() => handleDeleteClick(index)}>
                    <AiOutlineDelete size={'20px'}/>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <select className='select12' value={selectedType} onChange={handleTypeChange}>
                  <option value="type">Select service</option>
                  <option value="consultation">Consultation</option>
                  <option value="followupconsultation">follow-Up Consultation</option>
                  <option value="freefollowup">Free followup</option>
                  <option value="operation">Operation</option>
                </select>
              </td>
              <td>
                <input
                  className="input23"
                  type="number"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                 
                />
              </td>
              <td>
                <input
                  className="input23"
                  type="number"
                  value={discount}
                  onChange={handleDiscountChange}
                  
                />
              </td>
              <td>
                <button onClick={handleAddClick} className="add-button12">
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {inputError && (
        <p className="error-message">Please enter required fields.</p>
    )}
      </div>
      {showAdditionalForm && !showBill && (
        <div className="additional-form-border additional-form">
          <div className="input-group">
            <label className="label-with-border12" htmlFor="doctor">Choose Doctor:</label>
            <select className="input-field" id="doctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option>Select doctor</option>
              <option value="Dr.John">Dr.John</option>
              <option value="Dr.Sameer">Dr.Sameer</option>
              <option value="Dr.Arjun">Dr.Arjun</option>
            </select>
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="appointmentDate">Appointment Date:</label>
            <input className="input-field" type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="duration">Duration:</label>
            <select className="input-field" id="duration" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
              <option>Select duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>
          <div className="input-group">
            <label className="label-with-border12" htmlFor="appointmentTime">Appointment Time:</label>
            <div className="time-inputs">
              <select className="time-dropdown" value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                <option value="">Hour</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <select className="time-dropdown" value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
                <option value="">Minute</option>
                {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select
              className="time-dropdown"
              value={selectedTimeOfDay}
              onChange={(e) => setSelectedTimeOfDay(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            </div>
          </div>
          
          <div className="button-group">
            <button onClick={handleBackClick} className="back-button">
              Back
            </button>
            <button onClick={handleContinueClick} disabled={!isAdditionalFormValid}>
              Continue            </button>
          </div>
          {inputError && <p className="error-message">Please enter all fields.</p>}
        </div>
      )}
      {!showAdditionalForm && addedItems.length > 0 && !showBill && (
          <div className="total-section">
            <label className="label-with-border12">Consultations</label>
            <span className="total-value">
              &nbsp;&nbsp;₹{totalAmount.toFixed(2)}
            </span>
            <br />
            <hr />
            <label className="label-with-border12">Total:</label>
            <span className="total-value">
              &nbsp;&nbsp;&nbsp;&nbsp;₹{totalAmount.toFixed(2)}
            </span>
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="create-bill-button"
              onClick={() => setShowBill(true)}
            >
              Create Bill
            </button>
          </div>
        )}
      {showBill && (
        <div className="total-section">
          <label className="label-with-border12">Consultations:</label>
          <span className="total-value">₹{totalAmount.toFixed(2)}</span>
          <hr />
          <label className="label-with-border12">Total Balance:</label>
          <span className="total-value">₹{totalAmount.toFixed(2)}</span>
          <div className="input-group">
            <label className="label-with-border12">Mode:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select
              className="input-field"
              value={selectedPaymentMode}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="wallet">M-Wallet</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="input-group">
            <label className="label-with-border12">Amount Status:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select
              className="input-field"
              value={selectedAmountStatus}
              onChange={(e) => setselectedAmountStatus(e.target.value)}
            ><option value="----">----</option>
              <option value="paid">paid</option>
              <option value="Not Paid">Not paid</option>
              
            </select>
            </div>
          <div className="button-group">
          {/* &nbsp;&nbsp;&nbsp;<button className="pay-button">
              Pay ₹{totalAmount.toFixed(2)}
            </button><br/><br/>&nbsp;&nbsp;&nbsp; */}
            <button className="print-bill-button" onClick={handlePrintClick}>
              <BsPrinter size={'20px'}/>&nbsp;Print Bill
            </button>
          </div>
          <div className="input-group">
            <input
              className="input-field email-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="email-icon" style={{ color: 'blue',fontSize: '20px'}}>
  <TfiEmail />
</span>
          </div>
        </div>
      )}
    </form>
        <button className="existing-button" type="submit">Submit</button>
      
    </div>
    </>
  );
};

export default ExistingPatient;
