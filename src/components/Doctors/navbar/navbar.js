// navBar.js
import React ,{useState}from 'react';
import {Link} from 'react-router-dom'
import './navbar.css';
import {BiCalendar} from "react-icons/bi"
import {BsFillPeopleFill} from "react-icons/bs"
import {MdCall} from "react-icons/md"
import {MdPersonAddAlt1} from "react-icons/md"
import {CgProfile} from "react-icons/cg"
import {CgMenuGridO} from "react-icons/cg"
import {AiFillCaretDown} from "react-icons/ai"
import Sidebar from '../prescription/sidebar';


const Navbar = () => {

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    console.log('Toggle profile dropdown');
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
    
    <div className="navbar-doctor">
      <div className="left">
        <div className="logo">
      <small>JC</small></div>
        <div className="nav-item">
    <Link to='/appointments' className='doc-link-nav'>   <span className="icon-docks">
          <BiCalendar/>
          </span>
          Appointments</Link>
        </div>
  <Link to='/consultations' className='doc-link-nav'>      <div className="nav-item">
          <span className="icon-docks">
            <BsFillPeopleFill/>
          </span>
          Consultations
        </div></Link>

        
        
      </div>
      <div className="right">
        {/* <span className="icon-add">
          <MdPersonAddAlt1/></span>
        <input type="text" placeholder="Search" className="search-bar-doc" /> */}
        {/* <span className="icon">Doctors Icon</span> */}
        <div className="dots-box">
          {/* <div className="dots-icon"><CgMenuGridO/></div> */}
          <div className="dots-content">
            {/* Dots content */}
          </div>
        </div>
        
        <div className="profile-icon-container" onClick={toggleProfileDropdown}>
          <span className="icon-profile">
            <CgProfile />
          </span>
        </div>


        
        {showProfileDropdown && (
          <div className="profile-dropdown-logout">
           
           <div className='icon-size899'   >   <CgProfile /> </div>
           
            <div className="user-id">Doctor</div>
           
           
            <div className="dropdown-item-logout">
             <Link to='/'>
              <button className='sign-out-button'> Sign Out</button>
              </Link>
            </div>
            </div>
         
        )}
      </div>
    </div>

   
    </>
  );
};

export default Navbar;
