import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import { AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import PharmacyNav from './PharmacyNav';

function Inventory() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetchInventoryData();
  }, [activeCategory]);

  const fetchInventoryData = async () => {
    try {
      let response = null;

      switch (activeCategory) {
        case 'stocks':
          response = await axios.get('http://127.0.0.1:5000/inventorydata');
          break;
        case 'expiry':
          response = await axios.get('http://127.0.0.1:5000/inventorydata/expiry');
          break;
        case 'low':
          response = await axios.get('http://127.0.0.1:5000/inventorydata/low');
          break;
        case 'zero':
          response = await axios.get('http://127.0.0.1:5000/inventorydata/zero');
          break;
        default:
          break;
      }

      if (response) {
        setInventoryData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <PharmacyNav/>
      <div className="cont-OP">
        <p className='heading-top-OP'><strong>Inventory Stocks</strong></p>
        <div className="heading-table-OP">
          <div className={`heading-cell-OP ${activeCategory === 'stocks' ? 'active' : ''}`} onClick={() => handleCategoryClick('stocks')}>Stocks</div>
          <div className={`heading-cell-OP ${activeCategory === 'expiry' ? 'active' : ''}`} onClick={() => handleCategoryClick('expiry')}>Expiry Stocks</div>
          <div className={`heading-cell-OP ${activeCategory === 'low' ? 'active' : ''}`} onClick={() => handleCategoryClick('low')}>Low Stocks</div>
          <div className={`heading-cell-OP ${activeCategory === 'zero' ? 'active' : ''}`} onClick={() => handleCategoryClick('zero')}>Zero Stocks</div>
        </div>
        {activeCategory && (
          <div>
            <div className="searchbar-OP">
              <input type="text" placeholder={`Search ${activeCategory} stocks `} />
            </div>
            <table className="data-table-OP">
              <thead>
                <tr>
                  <th>Medicine Name   <AiOutlineAlignLeft/></th>
                  <th>Remaining Units  <AiOutlineAlignRight/></th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.medicinename}</td>
                    <td>{item.remainingunits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Inventory;
