import React from "react";
import PopupNavbar from "./PapupNavbar";
import "./CSS/Appnt.css";
import AppntSideBar from "./AppntSideBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import EditAppointmentForm from "./EditAppointmentForm";
import PatientNav from "../FrontDesk/PatientNav";



function Appnt() {
  
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetch-appointments');
      setAppointments(response.data.map((appointment, index) => ({
        ...appointment,
        id: appointment._id, 
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleSave = async (editedAppointment) => {
    try {
      
      await axios.put(`http://localhost:5000/api/update-appointment/${editedAppointment.id}`, editedAppointment);

      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === editedAppointment.id) {
          return editedAppointment;
        }
        return appointment;
      });

      setAppointments(updatedAppointments);
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  return (
    <>
      <PatientNav />
      <AppntSideBar/>
      <div style={{ display: "flex" }}>
        <div className="container_6">
         
          <div className="btn_table_6">
            <table className="appointments-table_6">
               <thead>
        
        </thead> 
              <tbody>
                {appointments.map((appointments, index) => (
                  <tr key={index}>
                    <td>{appointments.date}</td>
                    <td>{appointments.time}</td>
                    <td>{appointments.status}</td>
                    <td>{appointments.doctor}</td>
                    <td>{appointments.appointmentType}</td>
                    <td>
                    <Link >
                        <span
                          className="edit-link_6"
                          onClick={() => handleEditClick(appointments)}
                        >
                          Edit Appointment
                          </span>
                          </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingAppointment && (
              <EditAppointmentForm
                appointment={editingAppointment}
                onSave={handleSave}
                onCancel={handleCancelEdit}
              />
            )}
          
   
          </div>
        </div>
      </div>
    </>
  );
}

export default Appnt;