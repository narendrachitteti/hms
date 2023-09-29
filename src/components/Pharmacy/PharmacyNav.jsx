// navBar.js
import React from "react";
import "./Navpharmacy.css";
import { Link, useNavigate } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CgMenuGridO } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import {
  FaUserPlus,
  FaUserCircle,
  FaTrophy,
  FaMoneyCheck,
} from "react-icons/fa";
import { LiaPhoneSquareSolid } from "react-icons/lia";
import { FiSearch } from "react-icons/fi";
import { FcAssistant } from "react-icons/fc";
import {
  MdOutlineLocalHospital,
  MdCalendarMonth,
  MdViewList,
} from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import InvoiceStock from "./InvoiceStock";
import Masterdashboard from "./Masterdashboard";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue !== "") {
      navigate(selectedValue);
    }
  };
  return (
    <>
      <div className="navbar-doctor">
        <div className="left">
          <div className="logo">
            <Link to="/PharmacyHome" className="doc-link-nav">
              {" "}
              <small>JC</small>
            </Link>
          </div>
          <div className="nav-item">
          {/* <div>Billing</div> */}
            <select
              name=""
              id=""
              className="selectnavpha"
              onChange={handleSelectChange}
            >
              <a href="#" class="dropdown-toggle" disabled>Billing</a>
              <option value="/BillingDashboard">Dashboard</option>
              <option value="/BillingDashboard">Billing Dashboard</option>
              <option value="/PharmacyBilling">Billing</option>
              <option value="/AllBills"> All Billing</option>
            </select>
          </div>
          <div className="nav-item">
            <select name="" id=""  className="selectnavpha" onChange={(e) => navigate(e.target.value)}>
              <option value="">Inventory</option>
              <option value="/Inventory">Inventory Stock</option>
              <option value="/MedicineList">Medicine List</option>
              <option value="/Pharmacystock">Inventory</option>
            </select>
          </div>
          <div className="nav-item">
            <select name="" id="" className="selectnavpha" onChange={(e) => navigate(e.target.value)}>
              <option value="">Invoice</option>
              <option value="/InvoiceStock">Invoice Stocks</option>
              <option value="/Stockists">Stockists</option>
            </select>
          </div>
          <div className="nav-item">
            <select name="" id="" className="selectnavpha" onChange={(e) => navigate(e.target.value)}>
              <option value="">Purchase Order</option>
              <option value="/Masterdashboard">Master Dashboard</option>
              <option value="/CreateOrder">Create Order</option>
              <option value="/OrderList">Order list</option>
            </select>
          </div>
          <div className="nav-item">
            <select name="" id="" className="selectnavpha" onChange={(e) => navigate(e.target.value)}>
              <option value="">Reports</option>
              <option value="/Billingreports">Billing Reports</option>
              <option value="/Stockadjustment">Stock Adjustments</option>
            </select>
          </div>
          {/* <div className="nav-item">
            <Link to="/FindReports" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
                <BsFillPeopleFill />
              </span>
              Find Report
            
          </div>
          <div className="nav-item">
            <Link to="/labservicetable" className="doc-link-nav">
              {" "}
              <span className="icon-docks">
                <BsFillPeopleFill />
              </span>
              Services
            
          </div> */}
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

export default Navbar;
