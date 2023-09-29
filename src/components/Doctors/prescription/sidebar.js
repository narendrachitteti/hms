import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import {FaWpforms} from "react-icons/fa"
import {GiTestTubes} from "react-icons/gi"
import {ImAttachment} from "react-icons/im"
import {CgFileDocument} from "react-icons/cg"

const Sidebar = () => {
  return (
    <div className="sidebar-docktor">
 <Link to='/case' className='doc-link-nav'>     <div className="sidebar-item">
        <span className="sidebar-icon">
            <CgFileDocument/>
          </span>Case</div></Link>
  <Link to='/tests' className='doc-link-nav'>   <div className="sidebar-item"><span className="sidebar-icon">
            <GiTestTubes/>
          </span>Tests</div></Link> 
 <Link to='/attach'  className='doc-link-nav'> <div className="sidebar-item"><span className="sidebar-icon">
            <ImAttachment/>
          </span>Attach</div></Link>
 <Link to='/forms'  className='doc-link-nav'>    <div className="sidebar-item"><span className="sidebar-icon">
            <FaWpforms/>
          </span>Forms</div></Link> 
    </div>
  );
};

export default Sidebar;
