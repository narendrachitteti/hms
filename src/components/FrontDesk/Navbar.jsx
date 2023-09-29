import {React, useState} from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { BiCalendar } from "react-icons/bi";
import { BsFillPeopleFill,BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown, AiOutlinePlusSquare} from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPatientMenu, setShowAddPatientMenu] = useState(false);

  const handleSearch = () => {
   
    onSearch(searchQuery);
  };
const toggleAddPatientMenu = () => {
  setShowAddPatientMenu(!showAddPatientMenu);
};
  return (
    <>
      <div className="navbar-doctor">
        <div className="left">
          <div className="logo">
          <Link to="/Homepage" className="doc-link-nav">
              {" "}
            <small>JC</small>
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/Bills" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
              <FaMoneyCheck />
              </span>
              All Bills
            </Link>
          </div>
          <div className="nav-item">
          <Link to="/Patient" className="doc-link-nav">
              {" "}
            <span className="icon-docks">
            <MdCalendarMonth />
            </span>
              patients Q
            </Link>
          </div>
        </div>
        <div className="right">
            <div className="add-patient-dropdown">
              <MdPersonAddAlt1 className="add-patient-icon" onClick={toggleAddPatientMenu} />
              {showAddPatientMenu && (
                <div className="add-patient-menu">
                  <Link to="/Addpatient" className="add-patient-card">
                    <AiOutlinePlusSquare/>&nbsp;Add Patient
                  </Link><hr/>
                  <Link to="/Existingpatient" className="add-patient-card">
                    <BsReverseLayoutTextWindowReverse/>&nbsp;Existing Patient
                  </Link>
                </div>
              )}
            </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients"
              className="search-bar-doc"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="searchingButton" onClick={handleSearch}>
              <BsSearch />
            </button>
          </div>
          <span className="icon-profile">
            <CgProfile />
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
