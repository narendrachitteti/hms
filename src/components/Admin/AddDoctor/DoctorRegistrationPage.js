import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./DoctorRegistrationPage.css"
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';


const DoctorRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password:'',
    age: '',
    gender: '',
    bloodgroup: '',
    mobilenumber: '',
    email: '',
    address: '',
    degree: '',
    workexperience: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    try {
      console.log('form data ',formData);
      await axios.post('http://localhost:5005/doctorregister',formData);
      alert('Saved Successfully');
      const response = await axios.get('http://localhost:5005/api/doctors');
      // Assuming formData contains userId, password, and designation
      console.log('resp ',response.data)
    
      const mostRecentDoctor = response.data[response.data.length - 1];
      console.log('mostRecentDoctor ',mostRecentDoctor._id);
    // Create an object with the parameters to be sent to the admin table
    const adminData = { 
      userId:mostRecentDoctor._id,
      password:formData.password,
      designation: 'Doctor', // You mentioned that you want to set the designation as 'Doctor'
    };
      await axios.post('http://localhost:5005/admintable',adminData);
      navigate('/doctor')
    } catch (error) {
      alert('Error while logging in', error);
    }
    // Handle form submission here, e.g., send data to the server
  };

  return (
    <div>
    <div>
    <Sidebar/>
    <Navbar/>
    </div>
    <div
      className="container-reg-form89"
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: '50%',
        margin: '0 auto', 
        marginTop:"8%",
        marginBottom:"15px",
        textAlign: 'center', 
      }}
    >
      <h2 className='doctor-heading89'>Doctor Registration Form</h2>
      <div className='drpcvvroyal-heading89'>
      <form onSubmit={handleSubmit}>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal">
            Name:
          </label>
          <input className="drpcvvroyal"
            type= "text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>

        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
           
          >
            Password:
          </label>
          <input className="drpcvvroyal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>

        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Age:
          </label>
          <input className="drpcvvroyal"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
           
          >
            Blood Group:
          </label>
          <input className="drpcvvroyal"
            type="text"
            name="bloodgroup"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Mobile Number:
          </label>
          <input className="drpcvvroyal"
            type="tel"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Email:
          </label>
          <input className="drpcvvroyal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Address:
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
              minHeight: '60px', // Set a minimum height for better visibility
            }}
          ></textarea>
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Degree:
          </label>
          <input className="drpcvvroyal"
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
        <label className="drpcvvroyal"
            
          >
            Work Experience (in years):
          </label>
          <input className="drpcvvroyal"
            type="number"
            name="workexperience"
            value={formData.workexperience}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div className="form-groupdrpcvvroyal">
          <label className="drpcvvroyal"
            
          >
            Department:
          </label>
          <input className="drpcvvroyal"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '5px',
              fontSize:"16px",
              border: '1px solid #ccc',
              borderRadius: '3px',
            }}
          />
        </div>
        <div>
          <button className="Reg-button89"
            type="submit"
            // style={{
            //   backgroundColor: '#007bff',
            //   color: '#fff',
            //   padding: '10px 20px',
            //   border: 'none',
            //   borderRadius: '3px',
            //   cursor: 'pointer',
            // }}
          >
            Register
          </button>
        </div>
        
      </form>
    </div>
    </div>
    </div>
  );
};

export default DoctorRegistrationPage;