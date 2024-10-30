import React, { useState } from 'react';
import '../Navbar/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false); 

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAddItems = () => {
    setShowAddItemsPopup(true); 
    setShowPopup(false); 
  };

  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false); 
  };

  const handleSave = () => {
    alert('Item Saved Successfully');
  };

  return (
    <>
      <div className='back-color'>
        <div className='nav-color'>
          <div className='position'>
            <b onClick={togglePopup} style={{ cursor: 'pointer' }}> Products </b>
            <b style={{ cursor: 'pointer' }}> Billing </b>
          </div>
        </div>
        <div className='add-items'> 
        <button onClick={handleAddItems}>Add Items</button></div> 

        <div className='table-container'>
          <div className='list'> List of Items </div>
          <Table striped bordered hover className='tab'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Attribute 1</th>
                <th>Attribute 2</th>
                <th>Attribute 3</th>
                <th>Attribute 4</th>
                <th>Attribute 5</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input placeholder='M10213' /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td>
                  <div className='icon'> 
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
              <tr>
                <td><input placeholder='M10213' /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td>
                  <div className='icon'> 
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
              <tr>
                <td><input placeholder='M10213' /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td>
                  <div className='icon'> 
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
              
            </tbody>
          </Table>

          
                  
        </div>

        {showAddItemsPopup && ( 
          <div className='popup-1'>
            <div className='popup-content' style={{ backgroundColor: 'white' }}>
              <div className='close' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                <b onClick={closeAddItemsPopup} className='close-button'> <FontAwesomeIcon icon={faXmark} /></b>
              </div>
              <form className='in-position'>
                <div>
                  <label>S.No:</label>
                  <input />
                </div>
                <div>
                  <label>Attribute 1:</label>
                  <input />
                </div>
                <div>
                  <label>Attribute 2:</label>
                  <input />
                </div>
                <div>
                  <label>Attribute 3:</label>
                  <input />
                </div>
                <div>
                  <label>Attribute 4:</label>
                  <input />
                </div>
                <div>
                  <label>Attribute 5:</label>
                  <input />
                </div>
              </form>
              
              <div className='save-button'> 
                <button onClick={handleSave}>Save</button>
                <button>Generate Barcode</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
