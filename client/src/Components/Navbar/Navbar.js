
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import Barcode from 'react-barcode'; 
import html2canvas from 'html2canvas'; 
import '../Navbar/Navbar.css';

const Navbar = () => {
  const [sNo, setSNo] = useState(''); 
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
  const barcodeRef = useRef(null); 


  const handleSNoChange = (e) => {
    const value = e.target.value;
    setSNo(value);
    console.log('Scanned Barcode:', value); 
  };

  const handleAddItems = () => {
    setShowAddItemsPopup(true);
  };

  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false);
  };

  const handleSave = () => {
    alert('Item Saved Successfully');
  };

  
  const generateBarcodePDF = async () => {
    if (barcodeRef.current) {
      
      const canvas = await html2canvas(barcodeRef.current, {
        backgroundColor: null,  
      });

      const imgData = canvas.toDataURL('image/png'); 

      const pdfWidth = 55;  
      const pdfHeight = 12; 

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [pdfWidth, pdfHeight], 
      });

      
      pdf.addImage(imgData, 'PNG', 10, 5, pdfWidth - 20, pdfHeight - 10);

     
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');
    }
  };

  return (
    <>
      <div className="nav-color">
        <div className="position">
          <b style={{ cursor: 'pointer' }}> Products </b>
          <Link to="/billing">
            <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
          </Link>
        </div>
      </div>

      <div className="add-items">
        <button onClick={handleAddItems}>Add Items</button>
      </div>

      <div className="table-container">
        <div className="list"> List of Items </div>
        <Table striped bordered hover className="tab">
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
              <td><input placeholder="M10213" onChange={handleSNoChange} value={sNo} /></td>
              <td><input /></td>
              <td><input /></td>
              <td><input /></td>
              <td><input /></td>
              <td><input /></td>
              <td>
                <div className="icon">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {showAddItemsPopup && (
        <div className="popup-1">
          <div className="popup-content" style={{ backgroundColor: 'white' }}>
            <div
              className="close"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <b onClick={closeAddItemsPopup} className="close-button">
                <FontAwesomeIcon icon={faXmark} />
              </b>
            </div>
            <form className="in-position">
              <div>
                <label>S.No:</label>
                <input value={sNo} onChange={handleSNoChange} />
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

      <div className="save-button">
              <button onClick={handleSave}>Save</button>   

              {/* <Link to={`/barcode/${sNo}`}>
              <button >Generate Barcode</button> 
              </Link> */}

              <button onClick={generateBarcodePDF}>Generate Barcode as PDF</button>
              {sNo && (
        <div
          ref={barcodeRef} 
          style={{
            position: 'absolute',
            marginTop:'6rem', 
            
          }}
        >
          <Barcode value={sNo} width={3.5} height={30} fontSize={12} margin={5} />
        </div>
      )}
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default Navbar;

