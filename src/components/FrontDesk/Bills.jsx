// import React, { useState } from "react";
// import "./Bills.css";
// import { MdDelete } from "react-icons/md";
// import { AiFillPrinter } from "react-icons/ai";
// import Navbar from "./Navbar";

// const Bills = () => {
//   const [popupVisible, setPopupVisible] = useState(false);

//   const handleOpenPopup = () => {
//     setPopupVisible(true);
//   };
//   const handleClosePopup = () => {
//     console.log("Closing popup"); // Add this line for debugging
//     setPopupVisible(false);
//   };
//   return (
//     <>

//     <div>
//       <div className="popup-overlay-G11">
//         <div className="popup-G11">
//           <div className="popup-cG11">
//             <h className="heading-G11">Total Due: 7373</h>

//             <table className="popup-table-11">
//               <tbody>
//                 <tr>
//                   <td>01-SEP-23</td>
//                   <td>123</td>
//                   <td>Consulting</td>
//                   <td>200</td>
//                   <td>
//                     <AiFillPrinter />
//                     60
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">710</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">810</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-FEB-24</td>
//                   <td>173</td>
//                   <td>Consulting</td>
//                   <td>200</td>
//                   <td>
//                     <AiFillPrinter />
//                     50
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">150</td>
//                   <td className="table-bck-11">15</td>
//                   <td className="table-bck-11">10</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>11-APR-24</td>
//                   <td>193</td>
//                   <td>Consulting</td>
//                   <td>200</td>
//                   <td>
//                     <AiFillPrinter />
//                     270
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">6150</td>
//                   <td className="table-bck-11">175</td>
//                   <td className="table-bck-11">130</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>22-SEP-24</td>
//                   <td>123</td>
//                   <td>Consulting</td>
//                   <td>200</td>
//                   <td>
//                     <AiFillPrinter />
//                     10
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">150</td>
//                   <td className="table-bck-11">15</td>
//                   <td className="table-bck-11">10</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>22-AUG-23</td>
//                   <td>3570</td>
//                   <td>Consulting</td>
//                   <td>2900</td>
//                   <td>
//                     <AiFillPrinter />
//                     730
//                   </td>
//                   <td>30%</td>
//                   <td>560</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">550</td>
//                   <td className="table-bck-11">143</td>
//                   <td className="table-bck-11">134</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>25-AUG-23</td>
//                   <td>153</td>
//                   <td>Consulting</td>
//                   <td>20</td>
//                   <td>
//                     <AiFillPrinter />
//                     90
//                   </td>
//                   <td>10%</td>
//                   <td>50</td>
//                   <td>0</td>
//                   <td className="table-bck-11">Follow-Up consulting</td>
//                   <td className="table-bck-11">50</td>
//                   <td className="table-bck-11">515</td>
//                   <td className="table-bck-11">310</td>
//                   <td className="table-bck-11" style={{ color: "red" }}>
//                     <MdDelete />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Bills;



// import React, { useState, useEffect } from 'react';
// import { MdDelete } from 'react-icons/md';
// import { AiFillPrinter } from 'react-icons/ai';
// import './Bills.css';
// import Navbar from './Navbar';

// const Bills = () => {
//   const [currentData, setCurrentData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   useEffect(() => {
//     fetch('http://localhost:5000/api/v1/combined-data')
//       .then((response) => response.json())
//       .then((data) => setCurrentData(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   const handleDelete = (id) => {
//     // Send a DELETE request to the server to delete the record by ID
//     fetch(`http://localhost:5000/api/v1/combined-data/${id}`, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.message === 'Record deleted successfully') {
//           // Remove the deleted record from the currentData state
//           setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
//         } else {
//           console.error('Failed to delete record');
//         }
//       })
//       .catch((error) => console.error('Error deleting record:', error));
//   };
//   const handlePrint = (item) => {
//     // Create a print window with the specific row data
//     const printWindow = window.open('', '', 'width=600,height=600');
    
//     // Construct the HTML content to print
//     const contentToPrint = `
//       <html>
//         <head>
//           <title>Print Bill</title>
//         </head>
//         <body>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Service</th>
//                 <th>Price</th>
//                 <th>Paid</th>
//                 <th>Billed</th>
//                 <th>Discount</th>
//                 <th>Bill</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>${item.date}</td>
//                 <td>${item.items.map((item) => item.type).join(', ')}</td>
//                 <td>${item.items.map((item) => item.price).join(', ')}</td>
//                 <td>${item.paid ? 'Paid' : 'Not Paid'}</td>
//                 <td>${item.printerValue}</td>
//                 <td>${item.items.map((item) => item.discount).join(', ')}</td>
//                 <td>${item.totalAmount}</td>
//               </tr>
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;

//     printWindow.document.open();
//     printWindow.document.write(contentToPrint);
//     printWindow.document.close();
//     printWindow.print();
//     printWindow.close();
//   };
//   const filteredData = currentData.filter((item) => {
//     return (
//       item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.items.some((subItem) =>
//         subItem.type.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   });

//   return (
//     <>
//       <Navbar onSearch={setSearchTerm} />
//       <div>
//         <div className="popup-overlay-11-pp">
//           <div className="popup-11-pp">
//             {/* <h1 className="heading-11-pp">Total Due: 89574</h1> */}
//             <table className="popup-table-11-pp">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Service</th>
//                   <th>Price</th>
//                   <th>Paid</th>
//                   <th>Payment Mode</th>
//                   <th>Billed</th>
//                   <th>Discount</th>
//                   <th>Bill</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentData.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.date}</td>
//                     <td>
//                       {item.items.map((item, idx) => (
//                         <div key={idx}>
//                           {item.type}
//                         </div>
//                       ))}
//                     </td>
//                     {/* <td>{item.totalAmount}</td> */}
//                     <td>
//                       {item.items.map((item, idx) => (
//                         <div key={idx}>
//                           {item.price}
//                         </div>
//                       ))}
//                     </td>
//                     <td>{item.AmountStatus}</td>
//                     <td>{item.paymentMode}</td>
                    // <td><AiFillPrinter onClick={() => handlePrint(item)} /></td>
//                     <td>
//                       {item.items.map((item, idx) => (
//                         <div key={idx}>
//                           {item.discount}
//                         </div>
//                       ))}
//                     </td>
//                     <td>{item.totalAmount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Bills;
import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillPrinter } from 'react-icons/ai';
import './Bills.css';
import Navbar from './Navbar';

const Bills = () => {
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/combined-data')
      .then((response) => response.json())
      .then((data) => setCurrentData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the server to delete the record by ID
    fetch(`http://localhost:5000/api/v1/combined-data/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'Record deleted successfully') {
          // Remove the deleted record from the currentData state
          setCurrentData((prevData) => prevData.filter((item) => item._id !== id));
        } else {
          console.error('Failed to delete record');
        }
      })
      .catch((error) => console.error('Error deleting record:', error));
  };

  const handlePrint = (item) => {
    // Create a print window with the specific row data
    const printWindow = window.open('', '', 'width=600,height=600');
    
    // Construct the HTML content to print
    const contentToPrint = `
      <html>
        <head>
          <title>Print Bill</title>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Service</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Billed</th>
                <th>Discount</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${item.date}</td>
                <td>${item.items.map((item) => item.type).join(', ')}</td>
                <td>${item.items.map((item) => item.price).join(', ')}</td>
                <td>${item.AmountStatus}</td>
                <td>${item.paymentMode}</td>
                <td>${item.printerValue}</td>
                <td>${item.items.map((item) => item.discount).join(', ')}</td>
                <td>${item.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  // Filter data based on searchTerm
  const filteredData = currentData.filter((item) => {
    return (
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.some((subItem) =>
        subItem.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <div>
        <div className="popup-overlay-11-pp">
          <div className="popup-11-pp">
            <table className="popup-table-11-pp">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Paid</th>
                  <th>Payment Mode</th>
                  <th>Billed</th>
                  <th>Discount</th>
                  <th>Bill</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.type}
                        </div>
                      ))}
                    </td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.price}
                        </div>
                      ))}
                    </td>
                    <td>{item.AmountStatus}</td>
                    <td>{item.paymentMode}</td>
                    <td><AiFillPrinter onClick={() => handlePrint(item)} /></td>
                    <td>
                      {item.items.map((subItem, idx) => (
                        <div key={idx}>
                          {subItem.discount}
                        </div>
                      ))}
                    </td>
                    <td>{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bills;
