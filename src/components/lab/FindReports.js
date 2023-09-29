import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPrint } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import LabReport from "./LabReport";
import LabNavbar from "./LabNavbar";
import "./CSS/TestsTable.css";

const FindReports = () => {
 
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Rename 'date' to 'selectedDate'
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData); // Use state to hold filtered data
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const openModal = (type) => {
    setSelectedModal(type);
    setShowModal(true);
  };

  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
  };

  const reportsBackendURL = "http://localhost:5000/api/reports";
  // console.log("Request URL:", reportsBackendURL);

  useEffect(() => {
    axios
      .get(reportsBackendURL)
      .then((response) => {
        setTableData(response.data);
        setFilteredData(response.data); // Initially, set filteredData to all data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGoButtonClick = () => {
    const formattedSelectedDate = selectedDate.toISOString().substring(0, 10);

    const filtered = tableData.filter((item) => {
      return (
        (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.id.toString().includes(searchText) ||
          item.billNo.toString().includes(searchText)) &&
        item.date === formattedSelectedDate
      );
    });

    setFilteredData(filtered);
  };

  const handleTodayButtonClick = () => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().substring(0, 10);

    const filtered = tableData.filter((item) => {
      return (
        (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.id.toString().includes(searchText) ||
          item.billNo.toString().includes(searchText)) &&
        item.date === formattedCurrentDate
      );
    });

    setFilteredData(filtered);
  };
  



  //   const filteredData = tableData.filter((item) => {
  //     const formattedSelectedDate = date.toISOString().substring(0, 10);
  //     return (
  //       (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //       item.id.toString().includes(searchText) ||
  //       item.billNo.toString().includes(searchText)) &&
  //       item.date === formattedSelectedDate
  //     );
  //   });


  // const handleDateSelect = (selectedDate) => {
  //   setSelectedDate(selectedDate);
  
  //   const formattedSelectedDate = selectedDate.toISOString().substring(0, 10);
  //   const currentDate = new Date();
  //   const formattedCurrentDate = currentDate.toISOString().substring(0, 10);
  
  //   const dateToCompare =
  //     formattedSelectedDate === formattedCurrentDate
  //       ? formattedCurrentDate
  //       : formattedSelectedDate;
  
  //   const filtered = tableData.filter((item) => {
  //     return item.date === dateToCompare;
  //   });
  
  //   setFilteredData(filtered);
  // };
  
  const handleSearch = (searchValue) => {
    setSearchText(searchValue);

    const searchTextLower = searchValue.toLowerCase();

    const filtered = tableData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTextLower) ||
        item.id.toString().includes(searchTextLower) ||
        item.billNo.toString().includes(searchTextLower)
      );
    });

    setFilteredData(filtered);
  };

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const CustomDate = ({ value, onClick }) => (
    <div className="date-input">
      <input
        type="text"
        className="input_1"
        value={value}
        onClick={onClick}
        readOnly
      />
      <AiFillCalendar onClick={onClick} className="calendar_icon_1" size={30} />
    </div>
  );

  return (
    <div>
      <LabNavbar />
      {/* <Tests /> */}

      <div className="head_right_1">
        <div className="calFull_1">
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            customInput={<CustomDate />}
          />
        </div>
        <div className="btns_1">
          <button className="go_1"  onClick={handleGoButtonClick}>
            Go
          </button>
          <button className="go_1" onClick={handleTodayButtonClick}>
            Today
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar_1">
        <div className="search-input_1">
          <AiOutlineSearch className="search-icon_1" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.billNo}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
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

              
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showModal && (
        <>
          <div className="modal-overlay_1" onClick={closeModal}></div>
          <div className="modal_1">
            <div className="modal-content_1">
              <button className="close-button_1" onClick={closeModal}>
                x
              </button>
              
            {selectedModal === 'status' &&
              <LabReport onClose={closeModal} />  
          }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FindReports;
