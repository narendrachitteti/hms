import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const IndividualPatient= () => {
    const { id } = useParams(); // Get the patient ID from route parameters
    const [patient, setPatient] = useState(null);
  
    useEffect(() => {
      // Fetch patient data using the patient ID
      fetch(`http://localhost:5000/api/v1/patients/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPatient(data);
        })
        .catch((error) => console.error("Error fetching patient data:", error));
    }, [id]);
  
    if (!patient) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Patient Details</h2>
        <p>Name: {patient.name}</p>
        <p>ID: {patient.patientId}</p>
        {/* Render other patient details here */}
      </div>
    );
  };
  
  export default IndividualPatient;
