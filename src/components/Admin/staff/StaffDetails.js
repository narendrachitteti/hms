import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './staffdetails.css';
import NavBar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const StaffTable = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      // Filter out the deleted item from the list
      const updatedStaffList = staffList.filter((staff) => staff._id !== id);
      setStaffList(updatedStaffList);
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <>
   <NavBar/>
   <Sidebar/>
   <div className='main-container123'>
   <div className="sk14-arrows143">
     <Link to='/staff'>
             <FaArrowCircleLeft /> 
             </Link>
         
     <div className='heading678'>
      <h1 className='h1cvvroyal'>staff Details</h1>
      </div>
      </div>
      <div className="fetch-data14">
      <table className="table-for-data14">
        <thead className='thead-sk14'>
          <tr className='sktr-14'>
            <th className='sk14s'>S.No</th>
            <th className='sk14s' >Name</th>
            <th className='sk14s'>Age</th>
            <th className='sk14s'>Gender</th>
            <th className='sk14s'>Blood Group</th>
            <th className='sk14s'>Mobile Number</th>
            <th className='sk14s'>Email</th>
            <th className='sk14s'>Address</th>
            <th className='sk14s'>Degree</th>
            <th className='sk14s'>Work Experience</th>
            <th className='sk14s'>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff._id}>
              <td className='sk14k'>{index + 1}</td>
              <td>{staff.name}</td>
              <td>{staff.age}</td>
              <td>{staff.gender}</td>
              <td>{staff.bloodgroup}</td>
              <td>{staff.mobilenumber}</td>
              <td>{staff.email}</td>
              <td>{staff.address}</td>
              <td>{staff.degree}</td>
              <td>{staff.workexperience}</td>
              <td>
                <button  className='sk14bsk14' onClick={() => handleDelete(staff._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default StaffTable;
