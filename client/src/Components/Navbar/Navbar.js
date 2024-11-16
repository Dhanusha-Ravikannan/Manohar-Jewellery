// import React, { useState, useRef } from 'react';
// import axios from 'axios';  
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
// import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import Barcode from 'react-barcode';
// import html2canvas from 'html2canvas';
// import '../Navbar/Navbar.css';


//   const Navbar = () => {
 
//   const [sNo, setSNo] = useState('');
//   const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [showBarcode, setShowBarcode] = useState(false); 
//   const barcodeRef = useRef(null);


// const [lotNumber, setLotNumber] = useState('');
// const [beforeWeight, setBeforeWeight] = useState('');
// const [afterWeight, setAfterWeight] = useState('');
// const [productNumber, setProductNumber] = useState('');
// const [productWeight, setproductWeight] = useState('');



//   const handleAddItems = () => {
//     setShowAddItemsPopup(true);
//     setShowBarcode(false);
   
//   };
  

//   const closeAddItemsPopup = () => {
//     setShowAddItemsPopup(false);
//     setShowBarcode(false); 
//     resetForm();
//   };

//   const resetForm = () => {
//     setSNo('');
//   };


//   const handleSave = async () => {
//     try {
//       const payload = {
//         tag_number: lotNumber,
//         before_weight: beforeWeight,
//         after_weight: afterWeight,
//         product_number: productNumber,
//         barcode_weight: productWeight,
//       };
  
//       const response = await axios.post('http://localhost:5002/api/v1/products/create', payload);
  
//       if (response.status === 200) {
//         setProducts((prevProducts) => [...prevProducts, response.data.newProduct]);
//         setShowBarcode(true);
//         alert('Product saved successfully');
//         closeAddItemsPopup(); 
//       }
//     } catch (error) {
//       console.error('Error saving product:', error.response ? error.response.data : error.message);
//       alert('Failed to save product');
//     }
//   };
  
  


//   // const handleSave = async () => {
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/api/products/create', );
//   //     if (response.status === 200) {

//   //       console.log("iiiiiiiiiiiiiiiiiii", response.data.newProduct)
       
//   //       setProducts((prevProducts) => [...prevProducts, response.data.newProduct]);
  
//   //       setShowBarcode(true); 
//   //       alert('Product saved successfully');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error saving product:', error.response ? error.response.data : error.message);
//   //     alert('Failed to save product');
//   //   }
//   // };

//   const generateBarcodePDF = async () => {
//     if (barcodeRef.current) {
//       const canvas = await html2canvas(barcodeRef.current, { backgroundColor: null });
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: [55, 12],
//       });
//       pdf.addImage(imgData, 'PNG', 6, 4, 45, 7);
//       const pdfBlob = pdf.output('blob');
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, '_blank');
//     }
//   };
 
//   return (
//     <>
//       <div className="nav-color">
//         <div className="position">
//           <b style={{ cursor: 'pointer' }}> Products </b>
//           <Link to="/billing">
//             <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
//           </Link>
//         </div>
//       </div>
//       <div className="add-items">
//         <button onClick={handleAddItems}>Add Items</button>
//         <div className='weight'> 
//     <div className='cont'> 
//     <label> Before Weight:  <input /> </label> 
//     </div>
//     <div className='cont'> 
//     <label> After Weight: <input/> </label> 
//     </div>
//     <button > Update</button>
    
//     </div>
//       </div>
//       <div className='update'>
//       <button> Completed  </button>
//       </div>
//       <div className="table-container">
//         <div className="list"> List of Items </div>
//         <Table striped bordered hover className="tab">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Product Number</th>
//               <th>Before Weight</th>
//               <th>After Weight</th>
//               <th>Difference</th>
//               <th>Adjustment</th>
//               <th>Final weight</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={product.id}>
//                 <td>{index + 1}</td>
//                 <td><input value={product.product_number} readOnly /></td>
//                 <td><input value={product.before_weight} readOnly /></td>
//                 <td><input value={product.after_weight} readOnly /></td>
//                 <td><input value={product.difference.toFixed(3)} readOnly /></td>
//                 <td><input value={product.adjustment.toFixed(3)} readOnly /></td>
//                 <td><input value={product.final_weight.toFixed(3)} readOnly /></td>
//                 <td>
//                   <div className="icon">
//                     <FontAwesomeIcon icon={faEye} />
//                     <FontAwesomeIcon icon={faTrash}  />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {showAddItemsPopup && (
//         <div className="popup-1">
//           <div className="popup-content">
//             <div className="close">
//               <b onClick={closeAddItemsPopup} className="close-button">
//                 <FontAwesomeIcon icon={faXmark} />
//               </b>
//             </div>
            
//              <form className="in-position">
//               <div>
//                 <label>Lot Number:</label>
//                 <input /> 
//               </div>
//               <div>
//                 <label>Before Weight:</label>
//                 <input/> 
//               </div>
//               <div>
//                 <label>After Weight:</label>
//                 <input />
//               </div>
//               <div>
//                 <label>Difference:</label>
//                 <input />
//               </div>
//               <div>
//                 <label>Adjustment:</label>
//                 <input />
//               </div>
//               <div>
//                 <label>Final weight:</label>
//                 <input  />
//               </div>
//               <div>
//                 <label>Product No:</label>
//                 <input />
//               </div>
//               <div>
//                 <label>Product Weight:</label>
//                 <input  />
//               </div>
//             </form>



//             <div className="save-button">
//             {(!showBarcode) && (
//                 <>
//                   <button onClick={handleSave}>Save</button>
//                   <button className="pdf-button" onClick={generateBarcodePDF} >Generate Barcode as PDF</button>
//                   <div>
                
//                 </div>
//                 </>
//               )}
//             </div>
//             {showBarcode && (
//               <div  style={{ marginTop: '2rem',width:"400px",height:"60px" }} > 
//                 <h1 ref={barcodeRef} style={{ textAlign:"left",width:"400px",height:"60px" }}>
//                   <Barcode value={sNo} width={2} height={33} fontSize={20} margin={5} />
                  
//                   </h1> 
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import '../Navbar/Navbar.css';

const Navbar = () => {
  
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [showBarcode, setShowBarcode] = useState(false);
  const barcodeRef = useRef(null);

  const [lotNumber, setLotNumber] = useState('');
  const [beforeWeight, setBeforeWeight] = useState('');
  const [afterWeight, setAfterWeight] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [finalWeight, setFinalWeight]=useState('');
  const [difference,setDifference]=useState('');
  const [adjustment,setAdjustment]=useState('')
  const [barcodeWeight,setBarcodeWeight]=useState('')

  const handleAddItems = () => {
    setShowAddItemsPopup(true);
    setShowBarcode(false);
  };

  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false);
    setShowBarcode(false);
    resetForm();
  };

  const resetForm = () => {
    setLotNumber('');
    setBeforeWeight('');
    setAfterWeight('');
    setDifference('');
    setAdjustment('');
    setFinalWeight('');
    setProductNumber('');
    setProductWeight('');
    setBarcodeWeight('');
  };

  const handleSave = async () => {
    try {
      const payload = {
        tag_number: lotNumber,
        before_weight: beforeWeight || null,
        after_weight: afterWeight || null,
        barcode_weight: productWeight || null,
      };

      const response = await axios.post(
        'http://localhost:5002/api/v1/products/create',
        payload
      );

      if (response.status === 200) {
        setProducts((prevProducts) => [...prevProducts, response.data.newProduct]);
        alert('Product saved successfully');
        closeAddItemsPopup();
      }
    } catch{
      
    }
  };

  const generateBarcodePDF = async () => {
    if (!lotNumber || !beforeWeight || !afterWeight || !productNumber || !productWeight) {
      alert('Please fill all fields to generate a barcode.');
      return;
    }

    if (barcodeRef.current) {
      const canvas = await html2canvas(barcodeRef.current, { backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [55, 12],
      });
      pdf.addImage(imgData, 'PNG', 6, 4, 45, 7);
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      setShowBarcode(true);
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
              <th>Product Number</th>
              <th>Before Weight</th>
              <th>After Weight</th>
              <th>Difference</th>
              <th>Adjustment</th>
              <th>Final weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td><input value={product.product_number} readOnly /></td>
                <td><input value={product.before_weight || ''} readOnly /></td>
                <td><input value={product.after_weight || ''} readOnly /></td>
                <td><input value={product.difference?.toFixed(3) || ''} readOnly /></td>
                <td><input value={product.adjustment?.toFixed(3) || ''} readOnly /></td>
                <td><input value={product.final_weight?.toFixed(3) || ''} readOnly /></td>
                <td>
                  <div className="icon">
                    <FontAwesomeIcon icon={faEye} />
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showAddItemsPopup && (
        <div className="popup-1">
          <div className="popup-content">
            <div className="close">
              <b onClick={closeAddItemsPopup} className="close-button">
                <FontAwesomeIcon icon={faXmark} />
              </b>
            </div>
            <form className="in-position">
              <div>
                <label>Lot Number:</label>
                <input value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
              </div>
              <div>
                <label>Before Weight:</label>
                <input value={beforeWeight} onChange={(e) => setBeforeWeight(e.target.value)} />
              </div>
              <div>
                <label>After Weight:</label>
                <input value={afterWeight} onChange={(e) => setAfterWeight(e.target.value)} />
              </div>
              <div>
                <label>Difference</label>
                <input value={productNumber} onChange={(e) => setDifference(e.target.value)} />
              </div>
              <div>
                <label>Adjustment</label>
                <input value={productWeight} onChange={(e) => setAdjustment(e.target.value)} />
              </div>
              <div>
                <label>Final Weight</label>
                <input value={productWeight} onChange={(e) => setFinalWeight(e.target.value)} />
              </div>
              <div>
                <label>Product Number:</label>
                <input value={productWeight} onChange={(e) => setProductNumber(e.target.value)} />
              </div>
              <div>
                <label>Product Weight:</label>
                <input value={productWeight} onChange={(e) => setProductWeight(e.target.value)} />
              </div>
            </form>
            <div className="save-button">
              <button onClick={handleSave}>Save</button>
              <button className="pdf-button" onClick={generateBarcodePDF}>
                Generate Barcode as PDF
              </button>
            </div>
            {showBarcode && (
              <div style={{ marginTop: '2rem', width: '400px', height: '60px' }}>
                <h1 ref={barcodeRef} style={{ textAlign: 'left', width: '400px', height: '60px' }}>
                  <Barcode value={lotNumber} width={2} height={33} fontSize={20} margin={5} />
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
