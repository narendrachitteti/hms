// import React, { useState } from "react";
// import "./TestResults.css";
// import Navbar from "./Navbar";

// const TestResults = () => {
//   const [dropdownStates, setDropdownStates] = useState(Array(10).fill(false)); // Assuming you have 10 dropdowns
//   const dropdownLabels = [
//     "HAEMATOLOGY",
//     "BIO CHEMISTRY",
//     "LIPID PROFILE",
//     "KIDNEY FUNCTION TEST",
//     "LIVER FUNCTION TEST",
//     "UACR",
//     "URINE ROUTINE",
//     "THYROID FUNCTION TEST",
//     "PCOS/ Hirsutism Profile/ Infertiity Profile",
//     "Others",
//   ];

//   const toggleDropdown = (index) => {
//     const newDropdownStates = [...dropdownStates];
//     newDropdownStates[index] = !newDropdownStates[index];
//     setDropdownStates(newDropdownStates);
//   };

//   const handleCommonTestsClick = () => {
//     console.log("Common tests button clicked");
//   };

//   const handleAdditionalTestsClick = () => {
//     console.log("Additional Test button clicked");
//   };

//   return (
//     <>
//     <Navbar />
//     <div>
//       <div className="navbar_65">
//         <div className="navbar-left">
//           <button className="navbar-button" onClick={handleCommonTestsClick}>
//             Common tests
//           </button>{" "}
//           &nbsp;&nbsp;&nbsp;
//           <button
//             className="navbar-button"
//             onClick={handleAdditionalTestsClick}
//           >
//             Additional Test
//           </button>
//         </div>
//         <div className="navbar-middle">
//           <span className="patient-name">Patient Name: Chandarakanth</span>
//         </div>
//         <div className="navbar-right">
//           <label htmlFor="auto-calendar">Auto Calendar</label>&nbsp;&nbsp;
//           <label className="switch">
//             <input type="checkbox" />
//             <span className="slider_12 round"></span>
//           </label>
//           &nbsp;&nbsp;
//           <button className="save-button">Save</button>&nbsp;&nbsp;
//         </div>
//       </div>
//       <div className="search-bar-container">
//         <input type="text" placeholder="Search..." className="search-bar" />
//         <button className="add-date-button">Add Date</button>
//       </div>
//       <div className="droupdownmainven">
//         <div className="droupdownsven">
//           {dropdownLabels.map((label, index) => (
//             <div
//               key={index}
//               className="droupdownstoggleven"
//               onClick={() => toggleDropdown(index)}
//             >
//               {label}
//               <hr />
//               {dropdownStates[index] && (
//                 <div className="dropdown-contentven">
//                   <div>hi</div>
//                   <hr />
//                   <div>hi</div>
//                   <hr />
//                   <div>hi</div>
//                   <hr />
//                   <div>hi</div>
//                   <hr />
//                   <div>hi</div>
//                   <hr />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default TestResults;
import React, { useState,useEffect } from 'react';
import './TestResults.css';
 import Navbar from "./Navbar";


const Testresults = () => {
  const [dropdownStates, setDropdownStates] = useState(Array(10).fill(false));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [popupData, setPopupData] = useState([]);
  const [popupDates, setPopupDates] = useState({});
 

  const dropdownLabels = [
        {
          label: 'HAEMATOLOGY',
          data: ['HAEMATOLOGY Data 1', 'HAEMATOLOGY Data 2', 'HAEMATOLOGY Data 3'],
        },
        {
          label: 'BIO CHEMISTRY',
          data: ['BIO CHEMISTRY Data 1', 'BIO CHEMISTRY Data 2', 'BIO CHEMISTRY Data 3', 'BIO CHEMISTRY Data 4'],
        },
        {
          label: 'LIPID PROFILE',
          data: ['LIPID PROFILE 1', 'LIPID PROFILE 2'],
        },
        {
          label: 'KIDNEY FUNCTION TEST',
          data: ['KIDNEY FUNCTION TEST1', 'KIDNEY FUNCTION TEST 2', 'KIDNEY FUNCTION TEST 3', 'KIDNEY FUNCTION TEST 4', 'KIDNEY FUNCTION TEST 5'],
        },
        {
          label: 'LIVER FUNCTION TEST',
          data: ['LIVER FUNCTION TEST', 'LIVER FUNCTION TEST', 'LIVER FUNCTION TEST', 'LIVER FUNCTION TEST'],
        },
        {
          label: 'UACR',
          data: ['UACR', 'UACR', 'UACR', 'UACR', 'UACR', 'UACR'],
        },
        {
          label: 'URINE ROUTINE',
          data: ['URINE ROUTINE', 'URINE ROUTINE', 'URINE ROUTINE'],
        },
        {
          label: 'THYROID FUNCTION TEST',
          data: ['THYROID FUNCTION TEST', 'THYROID FUNCTION TEST', 'THYROID FUNCTION TEST', 'THYROID FUNCTION TEST', 'THYROID FUNCTION TEST'],
        },
        {
          label: 'PCOS/ Hirsutism Profile/ Infertiity Profile',
          data: ['BIO CHEMISTRY Data 1', 'BIO CHEMISTRY Data 2', 'BIO CHEMISTRY Data 3'],
        },
      ];

  

      const [filteredLabels, setFilteredLabels] = useState(dropdownLabels);

      const toggleDropdown = async (index) => {
        const newDropdownStates = [...dropdownStates];
    
        for (let i = 0; i < newDropdownStates.length; i++) {
          if (i !== index) {
            newDropdownStates[i] = false;
          }
        }
    
        newDropdownStates[index] = !newDropdownStates[index];
    
        setDropdownStates(newDropdownStates);
    
        if (newDropdownStates[index]) {
      const categoryLabel = dropdownLabels[index].label;
      try {
        const response = await fetch(`/api/tests/${categoryLabel}`);
        if (response.ok) {
          const data = await response.json();
          setPopupData(data);

          try {
            // const datesResponse = await fetch(/api/dates/${categoryLabel});
            const datesResponse = await fetch(`/api/dates/${categoryLabel}`);
            if (datesResponse.ok) {
              const datesData = await datesResponse.json();
              setPopupDates((prevState) => ({
                ...prevState,
                [categoryLabel]: datesData,
              }));
            } else {
              console.error('Failed to fetch dates for category: ', categoryLabel);
            }
          } catch (datesError) {
            console.error('Error fetching dates: ', datesError);
          }
        } else {
          console.error('Failed to fetch data for category: ', categoryLabel);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
  };

  const handleCommonTestsClick = () => {
    console.log('Common tests button clicked');
  };

  const handleAdditionalTestsClick = () => {
    console.log('Additional Test button clicked');
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = dropdownLabels.filter((label) =>
      label.label.toLowerCase().includes(query)
    );
    setFilteredLabels(filtered);
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredLabels(dropdownLabels);
    }
  }, [searchQuery]);

    

  return (
    <>
     <Navbar />
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <button className="navbar-button" onClick={handleCommonTestsClick}>
            Common tests
          </button>{' '}
          &nbsp;&nbsp;&nbsp;
        </div>
        <div className="navbar-middle">
          <span className="patient-name">Patient Name: Chandarakanth</span>
        </div>
        <div className="navbar-right">
          <label htmlFor="auto-calendar">Auto Calendar</label>&nbsp;&nbsp;
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>&nbsp;&nbsp;
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="search-barnalla"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className="droupdownmainven">
        <div className="droupdownsven">
          {filteredLabels.map((label, index) => (
            <div key={index} className="droupdownstoggleven" onClick={() => toggleDropdown(index)}>
              {label.label}
              <hr />
              {dropdownStates[index] && (
                <div className="dropdown-contentven">
                  <table className="table-style">
                    <tbody>
                      {label.data.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Display the corresponding popup */}
                  <div className="popup">
                    <table className="table-style">
                      <thead>
                        <tr>
                          <th></th>
                          <th>21-05-23</th>
                          <th>22-05-23</th>
                          <th>23-05-23</th>
                          <th>24-05-23</th>
                          <th>25-05-23</th>
                          <th>1-05-23</th>
                        </tr>
                      </thead>
                      <tbody>
                        {label.data
                          .filter((item) =>
                            item.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td>{item}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Testresults;
