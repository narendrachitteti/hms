
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import hospitaldashboard from './Jananiclinic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const [formData, setFormData] = useState({ role: 'Option', doctorOption: 'Doctor1', email: '', password: '' });
  const [roleError, setRoleError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Clear the role error message when the dropdown is changed
    setRoleError('');
  };

  const roleEmailHeadingMap = {
    Doctor: 'Doctor Id',
    Laboratory: 'Laboratory Id',
    Pharmacy: 'Pharmacy Id',
    AddAdmin: 'Admin Id',
    AddReciption: 'Reciption Id',
  };

  const rolePasswordMap = {
    Doctor: 'doctor',
    Laboratory: 'laboratory',
    Pharmacy: 'pharmacy',
    AddAdmin: 'admin',
    AddReciption:'reception'
  };

  const roleIdMap = {
    Doctor1: '1',
    Doctor2: '2',
    Doctor3: '3',
    Laboratory: '2',
    Pharmacy: '3',
    AddAdmin: '4',
    AddReciption:'5'
  };

   const doctorUserIdsAndPasswords = {
      Doctor1: 'doctor1',
      Doctor2: 'doctor2',
      Doctor3: 'doctor3',
      Laboratory: 'laboratory',
      Pharmacy: 'pharmacy',
      AddAdmin: 'admin',
      AddReciption: 'reception'
    };

 

  const handleLogin = async (e) => {
    e.preventDefault();
 
    const enteredRole = formData.role;
    const enteredId = formData.username;
    const enteredPassword = formData.password;
    console.log('enteredid ' + enteredId);
    console.log('enteredPassword ' + enteredPassword);
    console.log('enteredRole ' + enteredRole);
     try {
      const response = await axios.get('http://localhost:5005/admintable');
      const userData = response.data; // Assuming your API returns an array of user objects
      console.log('response ',response);
      console.log('userData',userData.userId);
      console.log('userData',userData.password);
      // Find the user with the entered username
    //  const user = userData.find((user) => user.username === enteredId);
    const user = userData.find((user) => user.userId === enteredId && user.designation === enteredRole && user.password === enteredPassword);

     console.log('user',user.designation);
     if(user){
      if (user.designation==='Doctor') {
        console.log('user');
        // Valid credentials
        navigate('/forms', { state: { username: enteredId } });
      } else if(user.designation==='Admin'){
        navigate('/Frontpage', { state: { username: enteredId } });
        //setLoginError('Invalid credentials');
      }else if(user.designation==='Staff'){
        navigate('/staff', { state: { username: enteredId } });
        //setLoginError('Invalid credentials');labservicetable
      }else if(user.designation==='Laboratory'){
        navigate('/labservicetable', { state: { username: enteredId } });
        //setLoginError('Invalid credentials');labservicetable
      }else if(user.designation==='Pharmacy'){
        navigate('/PharmacyHome', { state: { username: enteredId } });
        //setLoginError('Invalid credentials');labservicetable
      }else if(user.designation==='Reception'){
        navigate('/Homepage', { state: { username: enteredId } });
        //setLoginError('Invalid credentials');labservicetable
      }
    }else{ 
      setLoginError('User ID and password entered are not correct');

    }
    } catch (error) {
      setLoginError('Error while logging in');
    }
  
    setFormData({ role: 'Option', doctorOption: 'Option', username: '', password: '' });
  };
  
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="admin">
      <img
        style={{ width: '730px', height: '620px', marginTop: '15px', marginLeft: '30px' }}
        src={hospitaldashboard}
        alt="logo"
      />
      <div className="signinpage">
        <form className="forml" onSubmit={handleLogin}>
          <h2 className="headinggs">Janani Clinic</h2>
          <h3 className="headingg">Sign in</h3>
          <br />
           <p>
            <label
              htmlFor="role"
              style={{
                textAlign: 'left',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              
            </label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '150px',
                height: '30px',
                color: 'black',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              <option value="Option">Select</option>
              <option value="Doctor">Doctor</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Admin">Admin</option>
              <option value="Reception">Reception</option>
            </select>
            {roleError && <p className="error-message">{roleError}</p>}
          </p>
          {formData.role === 'Doctor' && (
            <p>
              <label
                htmlFor="doctorOption"
                style={{
                  textAlign: 'left',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                
              </label>
             
            </p>
          )}
          <p> 
            <label
              htmlFor="username"
              style={{
                marginRight: '400px',
                marginBottom: '5px',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {roleEmailHeadingMap[formData.role] || 'Email'}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Your User name"
            />
         </p>
          <p>
            <label
              htmlFor="password"
              style={{
                marginRight: '400px',
                marginBottom: '5px',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </span>
            </div>
          </p>
          <br></br>
          <p className="text-center mt-4">
            <button className="buttonn" type="submit">
              Login
            </button>
          </p>
          <p className="error-message">{loginError}</p>
        </form>
        <footer></footer>
      </div>
    </div>
  );
}
