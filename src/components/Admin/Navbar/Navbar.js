import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import "./Navbar.css";
// import { BiCalendar } from "react-icons/bi";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { MdCall } from "react-icons/md";
// import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
// import { CgMenuGridO } from "react-icons/cg";
// import { AiFillCaretDown } from "react-icons/ai";
import Sidebar from "./Sidebar";
import { Link } from 'react-router-dom';


// import { MdSettings } from 'react-icons/md';
// import { RiLogoutBoxRLine } from 'react-icons/ri';

const NavBar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    console.log('Toggle profile dropdown');
    setShowProfileDropdown(!showProfileDropdown);
  };
  return (
    <>
    <div>
      <Sidebar/>
      <div className="navbar-doctor">
        <div className="left-doc">
          <div className="logo-doc">
            <small>JC</small>
          </div>
         
        </div>
        <div className="right-doc">
       
        {/* <input type="text" placeholder="Search" className="search-bar-doc" /> */}
       
        <div className="profile-icon-container" onClick={toggleProfileDropdown}>
          <span className="icon-profile">
            <CgProfile />
          </span>
        </div>


        
        {showProfileDropdown && (
          <div className="profile-dropdown-logout">
           
           <div className='icon-size899'   >   <CgProfile /> </div>
           
            <div className="user-id">Admin</div>
           
           
            <div className="dropdown-item-logout">
             <Link to='/'>
              <button className='sign-out-button'> Sign Out</button>
              </Link>
            </div>
            </div>
         
        )}
      </div>
      </div>
      </div>
    </>
  );
};

export default NavBar