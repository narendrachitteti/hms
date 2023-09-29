import React, { useState, useEffect } from 'react';
import './uploadfiles.css'; // Import your CSS file
import Navbar from '../navbar/navbar';
import Sidebar from '../prescription/sidebar';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        getFiles(); // Refresh the file list after a successful upload
      } else {
        alert('Error uploading file.');
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.data);
      } else {
        console.error('Error fetching files.');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>

<Navbar/>
    <div className='two-containers-docks' >
    <Sidebar/>
    <div className='upload-file-empid1432'>
      <div className='file-upload-empid1432'>

        {/* <h4>File Upload</h4> */}
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>

      <div className='empid1431savedfiles'>
        {/* <h4 className='empid1431sf'>Saved Files</h4> */}
        <table className="empid1431filetable">
          <thead className='empid1431thead'>
            <tr className='empid1431trow'>
              <th className='empid1431th'>Serial Number</th>
              <th className='empid1431th'>File Name</th>
              <th className='empid1431th'>Uploaded Date</th>
              <th className='empid1431th'>Time</th>
            </tr>
          </thead>

          <tbody className='empid1431tbody'>
            {files.map((file, index) => (
              <tr key={index} className="empid1431tr">
                <td className='empid1431td'>{index + 1}</td>
                <td className='empid1431td'>
                  <a
                    href={`http://localhost:5000/uploads/${file.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.originalname}
                  </a>
                </td>
                <td className='empid1431td'>
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </td>
                <td className='empid1431td'>
                  {new Date(file.uploadedAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    </div>
  );
};

export default FileUpload;