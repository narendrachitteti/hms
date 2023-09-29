import React, { useState } from 'react';
import './attachment.css';

const Attachment = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [fileInputs, setFileInputs] = useState([0]);
  const [uploadedFilename, setUploadedFilename] = useState('');
const pid= localStorage.getItem('id')
  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setFileInputs([0]);
    setUploadedFilename('');
    setPopupVisible(false);
  };

// In your Attachment component where you handle file uploads:
const handleFileUpload = async (index, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pid', pid); // Use the patient ID stored in local storage

  try {
    const response = await fetch('http://localhost:3004/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('File uploaded successfully.');
      alert('File uploaded successfully.');
      setUploadedFilename(file.name);
    } else {
      console.error('Error uploading file.');
      alert('Error uploading file.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file: ' + error.message);
  }

  if (index === fileInputs[fileInputs.length - 1]) {
    setFileInputs([...fileInputs, index + 1]);
  }
};


  const handleSaveFile = async (index) => {
    try {
      const response = await fetch('http://localhost:3001/save ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, filename: uploadedFilename }),
      });

      if (response.ok) {
        console.log('File information saved successfully.');
        alert('File information saved successfully.');
      } else {
        console.error('Error saving file information.');
        alert('Error saving file information.');
      }
    } catch (error) {
      console.error('Error saving file information:', error);
      alert('Error saving file information: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Front Desk</h1>
      <button onClick={handleOpenPopup}>Attachments</button>

      {popupVisible && (
        <div className="attachments-overlay">
          <div className="popup231">
            <div className="popup-header">
              <h2 className="attachments-title">Attachments</h2>
              <button className="popup-close-button" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <hr />
            <div className="attachments-content">
              <div className="popup-scrollable-content">
                {fileInputs.map((inputIndex) => (
                  <div key={inputIndex}>
                    <input
                      className="attachment"
                      type="file"
                      onChange={(e) => handleFileUpload(inputIndex, e.target.files[0])}
                    />
                    <button
                      className="save-button"
                      onClick={() => handleSaveFile(inputIndex)}
                    >
                      Save
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Attachment;