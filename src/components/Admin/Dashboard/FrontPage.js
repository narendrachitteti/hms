import React from 'react';
import { MdPersonAdd } from 'react-icons/md';

import {BsPersonSquare } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import {FaHospitalUser} from 'react-icons/fa'
import {MdSearch} from 'react-icons/md'
import  {FcMoneyTransfer} from 'react-icons/fc'
import './Frontpage.css';
import Cards from './Cards';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';
const FrontPage = () => {
  return (
    <div >
      <Navbar/>
         <Sidebar/>
        <div className="topbarcvvroyal">
        <h1 className='jc89' ><span className='span-heading89'>J</span>anani clinic</h1>
        {/* <div >
          <input type="text" placeholder="Search..." className="search-inputcvvroyal" />
          <MdSearch className="search-iconcvvroyal" />
        </div> */}
      </div>
     
        <div className="maindivcvvroyal">
          {/* <div className="commondivcvvroyal">
            <div>
              <h1>Doctor </h1>
              <h1>2</h1>
            </div>
            <FaHospitalUser className="overviewIconcvvroyal" />
          </div>

          <div className="commondivcvvroyal">
            <div>
              <h1>Patient </h1>
             <h1>120</h1>
           
            </div>
            <MdPersonAdd className="overviewIconcvvroyal" />
          </div>

         

          <div className="commondivcvvroyal">
            <div>
              <h1>LabTest</h1>
              <h1>50</h1>
            </div>
            <MdPayment className="overviewIconcvvroyal" />
          </div>

          <div className="commondivcvvroyal">
            <div>
              <h1>Add Staff</h1>
              <h1>40</h1>
            </div>
            <BsPersonSquare className="overviewIconcvvroyal" />
          </div>
          <div className="commondivcvvroyal">
            <div>
              <h1>Billing</h1>
              <h1>120</h1>
            </div>
            <FcMoneyTransfer className="overviewIconcvvroyal" />
          </div> */}
           <div>
        <Cards/>
      </div>
          
        </div>
        
     
    </div>
  );
};

export default FrontPage;