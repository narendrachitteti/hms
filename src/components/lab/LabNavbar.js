// navBar.js
import React from "react";
import { Link } from "react-router-dom";
//import "./CSS/Navbar.css";
import { BiCalendar } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";

const LabNavbar = () => {
  return (
    <>
      <div className="navbar-doctor">
        <div className="left">
          <div className="logo">
          <Link to="/TestsTable" className="doc-link-nav">
              {" "}
            <small>JC</small>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/TestsTable" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
                <BiCalendar />
              </span>
              Tests
            </Link>
          </div>
          <div className="nav-item">
          <Link to="/FindReports" className="doc-link-nav">
              {" "}
            <span className="icon-docks">
              <BsFillPeopleFill />
            </span>
            Find Report
            </Link>
          </div>
          <div className="nav-item">
          <Link to="/labservicetable" className="doc-link-nav">
              {" "}
            <span className="icon-docks">
              <BsFillPeopleFill />
            </span>
            Services
            </Link>
          </div>
          {/* <div className="nav-item dropdown">
            <span className="icon-docks">
              <AiFillCaretDown />
            </span>
            Options
          </div> */}
          {/* <div className="nav-item">
            <span className="icon-docks">
              <MdCall />
            </span>
            Online Consultation
          </div> */}
        </div>
        <div className="right">
          {/* <span className="icon-add">
            <MdPersonAddAlt1 />
          </span> */}
          <input type="text" placeholder="Search" className="search-bar-doc" />
          {/* <span className="icon">Doctors Icon</span> */}
          {/* <div className="dots-box">
            <div className="dots-icon">
              <CgMenuGridO />
            </div>
            <div className="dots-content">Dots content</div>
          </div> */}
          <span className="icon-profile">
            <CgProfile />
          </span>
        </div>
      </div>
    </>
  );
};

export default LabNavbar;
