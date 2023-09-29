import React from 'react'
import axios from 'axios';
import'./Billing.css'
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/Navbar';
import FrontDesk from './FrontDesk'
import { Link } from 'react-router-dom'; 


function Billing  ()  {
  return (
    <div>
      <div>
    <Sidebar/>
    <Navbar/>
    </div>
    <div className='billing-column899'>
    <div className='main-div'>


    <Link  to='/FrontDesk' className='card-link-dec899'>
     <div class="card-billing89">  
        <h2 className='pb-3'>Front Desk</h2>
        <p>Total No.of Appointments : 56</p>
        <p>Amount : Rs.11200</p>   
    </div>
    </Link>
    
    <Link to="/Pharmacy" className='card-link-dec899'>
    <div className="card-billing89">
    <h2  className='pb-3'>Pharmacy</h2>        
        <p>Total No.of Medicine Sold : 154</p>
        <p>Amount : Rs.11200</p> 
        </div>
        </Link>


        <Link to="/LabTest" className='card-link-dec899'>
    <div className="card-billing89">
    <h2  className='pb-3 '>Laboratory</h2>
    
        
        <p>Total No.of Tests : 36</p>
        <p>Amount : Rs.10500</p>
        
        </div>
        </Link>
    </div>
    </div>
    </div>
    
  )
}

export default Billing;