import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Listmedicines.css';
import { FiAlertTriangle } from 'react-icons/fi';
import { AiOutlineAlignRight, AiOutlineAlignLeft } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import PharmacyNav from './PharmacyNav';

const ListMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [editedMedicine, setEditedMedicine] = useState(null);

  // State variables for adding a new medicine
  const [newMedicine, setNewMedicine] = useState({
    medid: '',
    medname: '',
    manufacturer: '',
    category: '',
    stock: 0,
  });

  // State variable to track whether the form for adding a new medicine is open
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // State variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/properties')
      .then(response => {
        setMedicines(response.data);
        // Initially, set the filtered medicines to all medicines
        setFilteredMedicines(response.data);
      })
      .catch(error => {
        console.error('Error fetching medicines:', error);
      });
  }, []);

  const handleEdit = (medicine) => {
    setEditedMedicine({ ...medicine }); // Copy medicine data for editing
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/Listmedicines/${editedMedicine._id}`, editedMedicine);

      // Update the medicine in the medicines array
      const updatedMedicines = medicines.map((medicine) =>
        medicine._id === editedMedicine._id ? editedMedicine : medicine
      );
      setMedicines(updatedMedicines);

      // Update the filteredMedicines array if the search query matches the edited medicine
      const updatedFilteredMedicines = filteredMedicines.map((medicine) =>
        medicine._id === editedMedicine._id ? editedMedicine : medicine
      );
      setFilteredMedicines(updatedFilteredMedicines);

      // Clear the editedMedicine state
      setEditedMedicine(null);
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  // Function to handle form submission for adding a new medicine
  const handleAddMedicineSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add the new medicine
      await axios.post('http://localhost:5000/Listmedicines', newMedicine);

      // Refresh the list of medicines
      const response = await axios.get('http://localhost:5000/properties');
      setMedicines(response.data);

      // Clear the form and close it
      setNewMedicine({
        medid: '',
        medname: '',
        manufacturer: '',
        category: '',
        stock: 0,
      });
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  // Function to handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter medicines based on search query
  useEffect(() => {
    const filtered = medicines.filter((medicine) =>
      medicine.medname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [searchQuery, medicines]);

  return (
    <><PharmacyNav/>
    <div className="main-cont-PO-11">
      <p className="Listheading-PO-11">
        <strong>List Medicines</strong> <span><hr /></span>
      </p>

      {/* Search input */}
      <div className="search-contain-PO-11">
        <input
          type="text"
          placeholder="Search Medicines"
          className="search-bar-PO-11"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <br />

      {/* Add Medicine Form */}
      {isAddFormOpen && (
        <div className="add-medicine-form">
          <form onSubmit={handleAddMedicineSubmit}>
            <div className="input-group-PO-11">
              <label htmlFor="medid">MEDID:</label>
              <input
                type="text"
                id="medid"
                placeholder="MEDID"
                name="medid"
                value={newMedicine.medid}
                onChange={(e) => setNewMedicine({ ...newMedicine, medid: e.target.value })}
              />
            </div>
            <div className="input-group-PO-11">
              <label htmlFor="medname">Medname:</label>
              <input
                type="text"
                id="medname"
                placeholder="Medname"
                name="medname"
                value={newMedicine.medname}
                onChange={(e) => setNewMedicine({ ...newMedicine, medname: e.target.value })}
              />
            </div>
            <div className="input-group-PO-11">
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input
                type="text"
                id="manufacturer"
                placeholder="Manufacturer"
                name="manufacturer"
                value={newMedicine.manufacturer}
                onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
              />
            </div>
            <div className="input-group-PO-11">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                placeholder="Category"
                name="category"
                value={newMedicine.category}
                onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
              />
            </div>
            <div className="input-group-PO-11">
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                placeholder="Stock"
                name="stock"
                value={newMedicine.stock}
                onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
              />
            </div>
            <button type="submit" className="but-PO-11">Add to List</button>
          </form>
        </div>
      )}

      {/* Button to toggle add medicine form */}
      <button onClick={() => setIsAddFormOpen(!isAddFormOpen)} className="but-PO-11">
        {isAddFormOpen ? 'Cancel' : 'Add Medicine'}
      </button>

      <br />

      {/* Rest of the component */}
      <div className="contain-PO-11">
        <div className="json-data">
          <table className="medicine-table-PO-11">
            <thead>
              <tr>
                <th>MEDID <AiOutlineAlignRight /></th>
                <th>Medname <AiOutlineAlignLeft /></th>
                <th>Manufacturer <AiOutlineAlignLeft /></th>
                <th>Category <AiOutlineAlignLeft /></th>
                <th>Stock Alert</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.medid}</td>
                  <td>{medicine.medname}</td>
                  <td>{medicine.manufacturer}</td>
                  <td>{medicine.category}</td>
                  <td>
                    {parseInt(medicine.stock) < 10 ? (
                      <button className="stock-alert-button red">
                        <FiAlertTriangle />
                      </button>
                    ) : (
                      <button className="stock-alert-button green">
                        <FiAlertTriangle />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(medicine)}>
                      <BiSolidEditAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editedMedicine && (
            <div className="edit-form">
              <label htmlFor="editedMedid">MEDID:</label>
              <input
                type="text"
                id="editedMedid"
                value={editedMedicine.medid}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, medid: e.target.value })}
              />
              <label htmlFor="editedMedname">Medname:</label>
              <input
                type="text"
                id="editedMedname"
                value={editedMedicine.medname}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, medname: e.target.value })}
              />
              <label htmlFor="Manufacturer">Manufacturer:</label>
              <input
                type="text"
                id="manufacturer"
                value={editedMedicine.manufacturer}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, manufacturer: e.target.value })}
              />
              <label htmlFor="Category">Category:</label>
              <input
                type="text"
                id="editedcategory"
                value={editedMedicine.category}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, category: e.target.value })}
              />
              <label htmlFor="Stock">Stock:</label>
              <input
                type="number"
                id="editedstock"
                value={editedMedicine.stock}
                onChange={(e) => setEditedMedicine({ ...editedMedicine, stock: e.target.value })}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
   </>
  );
};

export default ListMedicines;