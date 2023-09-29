import React, { useState, useEffect } from 'react';
import './Billingreports.css';
import { AiFillPrinter, AiOutlineDownload } from 'react-icons/ai';
import axios from 'axios';
import PharmacyNav from './PharmacyNav';

function Billingreports() {
  const [billingData, setBillingData] = useState({});
  const fromDateId = 'fromDate';
  const toDateId = 'toDate';
  const dateRangeTitle = 'Date Range';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'billing_report.html';
    link.click();
  };

  useEffect(() => {
    // Fetch billing data from the API
    axios
      .get('http://localhost:3001/properties') // Replace with your server URL
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <><PharmacyNav/>
    <div className="page-containerven">
      <div className="content-containerven">
        <div className="Bleft-sideven">
          <h1>Billing Reports</h1>
          {/* Add the rest of your content here */}
        </div>
      </div>
      <div className="bexportSectionven">
        <div className="bexportTitlev">{dateRangeTitle}</div>
        <div className="bexport-contentv">
          <label htmlFor={fromDateId}>From:</label>
          <input className="stockistsfromven" type="date" id={fromDateId} name="fromDate" /> &nbsp;&nbsp;&nbsp;
          <label htmlFor={toDateId}>To:</label>
          <input className="stockiststoven" type="date" id={toDateId} name="toDate" /> &nbsp;&nbsp;&nbsp;
          <button className="bexportButtonv">Go</button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-containerven">
        <table className="report-table">
          <thead>
            <tr>
              <th colSpan={4}>Billing Reports</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Billed</th>
              <td>{billingData.Totalbilled}</td>
              <td>
                <AiFillPrinter onClick={handlePrint} />
              </td>
              <td>
                <AiOutlineDownload onClick={handleDownload} />
              </td>
            </tr>
            <tr>
              <th>Outstanding</th>
              <td>{billingData.outstanding}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Collection</th>
              <td>{billingData.collection}</td>
              <td>
                <AiFillPrinter onClick={handlePrint} />
              </td>
              <td>
                <AiOutlineDownload onClick={handleDownload} />
              </td>
            </tr>
            <tr>
              <th>Cash</th>
              <td>{billingData.collectedbycash}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Card</th>
              <td>{billingData.collectedbycard}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Mobile</th>
              <td>{billingData.mobile}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Return</th>
              <td>{billingData.Return}</td>
              <td>
                <AiFillPrinter onClick={handlePrint} />
              </td>
              <td>
                <AiOutlineDownload onClick={handleDownload} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Billingreports;