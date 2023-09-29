import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcSurvey } from "react-icons/fc";
import { BiSolidUserRectangle } from "react-icons/bi";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { LuCreditCard } from "react-icons/lu";
import { BiSolidUser } from "react-icons/bi";
import { CgDropOpacity } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import "./CSS/PopupNavbar.css";


function PopupNavbar() {
  // Modal state

  const [activeLink, setActiveLink] = useState("/AddBillLab"); // Set the initial active link

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <div className="popup-overlay-Tj_1">
        <div className="popup-content_1">
          <div className="patient-right_1">
            <nav>
              <ul>
                <li
                  className={activeLink === "/AddBillLab" ? "active" : ""}
                  // onClick={() => openModal("addBills")}
                >
                  <Link
                    to="/AddBillLab"
                    onClick={() => handleLinkClick("/AddBillLab")}
                  >
                    <FcSurvey /> Add Bills
                  </Link>
                </li>
                <li className={activeLink === "/Appnt" ? "active" : ""}>
                  <Link to="/Appnt" onClick={() => handleLinkClick("/Appnt")}>
                    <BiSolidUserRectangle /> Appnt
                  </Link>
                </li>
                <li className={activeLink === "/Billingforms" ? "active" : ""}>
                  <Link
                    to="/Billingforms"
                    onClick={() => handleLinkClick("/Billingforms")}
                  >
                    <AiOutlineBars /> Bills
                  </Link>
                </li>
                <li className={activeLink === "/PaidTable" ? "active" : ""}>
                  <Link
                    to="/PaidTable"
                    onClick={() => handleLinkClick("/PaidTable")}
                  >
                    <LuCreditCard /> paid
                  </Link>
                </li>
                <li className={activeLink === "/VisitsTable" ? "active" : ""}>
                  <Link to="/VisitsTable" onClick={() => handleLinkClick("/VisitsTable")}>
                    <BiSolidUser /> visits
                  </Link>
                </li>
                <li className={activeLink === "/LabTable" ? "active" : ""}>
                  <Link to="/LabTable" onClick={() => handleLinkClick("/LabTable")}>
                    <CgDropOpacity /> Lab
                  </Link>
                </li>
                <li className={activeLink === "/LabEdit" ? "active" : ""}>
                  <Link to="/LabEdit" onClick={() => handleLinkClick("/LabEdit")}>
                    <MdEdit /> Edit
                  </Link>
                </li>
                {/*                 <li className={activeLink === "/Billingforms" ? "active" : ""}>

                  <Link to={"/TestsTable"}>
                    <button className="close-popup-button-Tj_1">
                      <AiOutlineClose />
                    </button>
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* <div>
      Modals
      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                x
              </button>
              {selectedModal === 'tests' && 
              <TestsModalContent />
            }
            {selectedModal === 'status' &&
              <StatusModalContent />  
            }
            {selectedModal === 'print' &&
              <PrintModalContent />
            }
              {selectedModal === "addBills" && <Billingforms />}
            </div>
          </div>
        </>
      )}
      </div> */}
    </>
  );
}

export default PopupNavbar;
