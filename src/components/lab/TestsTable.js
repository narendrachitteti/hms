import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";
import LabNavbar from "./LabNavbar";
import LabReport from "./LabReport";
import Tests from "./Tests";
import "./CSS/TestsTable.css";

const TestsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const openModal = (type, test) => {
    setSelectedModal(type);
    setShowModal(true);
  };

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  const testsBackendURL = "http://localhost:5000/api/tests";

  useEffect(() => {
    // Fetch data from backend
    axios
      .get(testsBackendURL)
      .then((response) => {
        console.log(response); // Log the entire response
        setTableData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = tableData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toString().includes(searchText) ||
      item.billNo.toString().includes(searchText)
    );
  });

  return (
    <div>
      <LabNavbar />
      <Tests />

      {/* Search Bar */}
      <div className="search-bar_1">
        <div className="search-input_1">
          <AiOutlineSearch className="search-icon_1" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input-field_1"
          />
        </div>
      </div>

      {/* Table */}
      <table className="labser-table_1">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Bill</th>
            <th>Status</th>
            <th>Print</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.billNo}</td>
              <td>{item.id}</td>
              <Link to={"/AddBillLab"}>
                <td>{item.name}</td>
              </Link>
              <td>
                <FaPrint /> {item.bill}
              </td>
              

              <td
                onClick={() => openModal("status")}
                style={{ cursor: "pointer" }}
              >
                Result
              </td>

              <td
                
              >
                Print
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showModal && (
        <>
          <div
            className={`modal-overlay_1 ${selectedModal}-modal-overlay_1`}
            onClick={closeModal}
          ></div>
          <div className={`modal_1 ${selectedModal}-modal_1`}>
            <div className={`modal-content_1 ${selectedModal}-content_1`}>
              <button className="close-button_1" onClick={closeModal}>
                x
              </button>
              {selectedModal === "status" && <LabReport onClose={closeModal} />}

              {/* <button type="button" className="cancel-button" onClick={closeModal}>
                Cancel
              </button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestsTable;
