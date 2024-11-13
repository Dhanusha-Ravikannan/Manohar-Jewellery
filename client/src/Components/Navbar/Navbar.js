
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import '../Navbar/Navbar.css';

  const Navbar = ({ setSelectedProduct }) => {
  const [tagNo, setTagNo] = useState('');
  const [weight1, setWeight1] = useState('');
  const [weight2, setWeight2] = useState('');
  const [weight3, setWeight3] = useState('');
  const [weight4, setWeight4] = useState('');
  const [weight5, setWeight5] = useState('');
  const [sNo, setSNo] = useState('');
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [showBarcode, setShowBarcode] = useState(false); 
  const barcodeRef = useRef(null);
  const [editProductId, setEditProductId] = useState(); 
  const [barcodeInput, setBarcodeInput] = useState('');
  const [viewOnly, setViewOnly] = useState(false);  

  const tagNoRef = useRef(null);
  const weight1Ref = useRef(null);
  const weight2Ref = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/getAll');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  
  useEffect(() => {
    const handleBarcodeScan = async (e) => {
      if (e.key === 'Enter') {
        try {
          const billNumber = "someBillNumber"; 
          const response = await axios.get(`http://localhost:5000/api/products/getSerial/${billNumber}/${barcodeInput}`);

          if (response.status === 200) {
            setSelectedProduct(response.data.product);
          } else {
            console.error("Product not found.");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
        setBarcodeInput(''); 
      } else {
        setBarcodeInput((prevInput) => prevInput + e.key); 
      }
    };

    window.addEventListener('keydown', handleBarcodeScan);
    return () => {
      window.removeEventListener('keydown', handleBarcodeScan);
    };
  }, [barcodeInput, setSelectedProduct]);

  const handleAddItems = () => {
    setShowAddItemsPopup(true);
    setShowBarcode(false);
    setEditProductId(null); 
    setViewOnly(false);  
  };
  
  const handleEyeClick = (product) => {
    setShowAddItemsPopup(true);
    setShowBarcode(true);  
    setEditProductId(product.id); 
    setViewOnly(true);  
    
    
    setTagNo(product.tag_number);
    setWeight1(product.before_weight);
    setWeight2(product.after_weight);
    setWeight3(product.difference);
    setWeight4(product.adjustment);
    setWeight5(product.final_weight);
    setSNo(product.product_number);
  };

  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false);
    setShowBarcode(false); 
    resetForm();
  };

  const resetForm = () => {
    setTagNo('');
    setWeight1('');
    setWeight2('');
    setWeight3('');
    setWeight4('');
    setWeight5('');
    setSNo('');
  };

  const calculateWeightsAndSerial = () => {
    const beforeWeight = parseFloat(weight1);
    const afterWeight = parseFloat(weight2);

    if (!isNaN(beforeWeight) && !isNaN(afterWeight)) {
      const difference = Math.abs(beforeWeight - afterWeight);
      const adjustment = difference - (difference * 0.001); 
      const finalWeight = adjustment - (adjustment * 0.1);

      setWeight3(difference); 
      setWeight4(adjustment); 
      setWeight5(finalWeight); 

      const weight5Str = finalWeight.toFixed(3).replace('.', '').slice(0, 3);
      setSNo(`${tagNo}00${weight5Str}`); 
    }
  };

  const handleWeightChange = (setter) => (e) => {
    setter(e.target.value);
    calculateWeightsAndSerial(); 
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef) {
      e.preventDefault(); 
      nextRef.current.focus();
    }
  };

  const handleSave = async () => {
    try {
      calculateWeightsAndSerial();
      const productData = {
        tag_number: tagNo,
        before_weight: weight1,
        after_weight: weight2,
        difference: weight3,
        adjustment: weight4,
        final_weight: weight5,
        product_number: sNo, 
      };

      if (editProductId) {
        const response = await axios.put(`http://localhost:5000/api/products/update/${editProductId}`, productData);
        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editProductId ? { ...product, ...response.data.updateProduct } : product
            )
          );
          setShowBarcode(true);
          alert('Product updated successfully');
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/products/create', productData);
        if (response.status === 200) {
          setProducts((prevProducts) => [...prevProducts, response.data.newProduct]);
          setShowBarcode(true); 
          alert('Product saved successfully');
        }
      }      
    } catch (error) {
      console.error('Error saving product:', error.response ? error.response.data : error.message);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
        if (response.status === 200) {
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          alert('Product deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        alert('Failed to delete product');
      }
    }
  };

  const generateBarcodePDF = async () => {
    if (barcodeRef.current) {
      const canvas = await html2canvas(barcodeRef.current, { backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [55, 12],
      });
      pdf.addImage(imgData, 'PNG', 10, 5, 35, 5);
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
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
              <th>Product No</th>
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
                <td><input value={product.before_weight} readOnly /></td>
                <td><input value={product.after_weight} readOnly /></td>
                <td><input value={product.difference.toFixed(3)} readOnly /></td>
                <td><input value={product.adjustment.toFixed(3)} readOnly /></td>
                <td><input value={product.final_weight.toFixed(3)} readOnly /></td>
                <td>
                  <div className="icon">
                    <FontAwesomeIcon icon={faEye} onClick={() => handleEyeClick(product)} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
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
                <label>Tag No:</label>
                <input
                  ref={tagNoRef}
                  value={tagNo}
                  onChange={(e) => setTagNo(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, weight1Ref)}
                  readOnly={viewOnly} 
                />
              </div>
              <div>
                <label>Before Weight:</label>
                <input
                  ref={weight1Ref}
                  value={weight1}
                  onChange={handleWeightChange(setWeight1)}
                  onKeyDown={(e) => handleKeyDown(e, weight2Ref)}
                  readOnly={viewOnly} 
                />
              </div>
              <div>
                <label>After Weight:</label>
                <input
                  ref={weight2Ref}
                  value={weight2}
                  onChange={handleWeightChange(setWeight2)}
                  onKeyDown={(e) => handleKeyDown(e, null)}
                  readOnly={viewOnly} 
                />
              </div>
              <div>
                <label>Difference:</label>
                <input value={weight3} readOnly />
              </div>
              <div>
                <label>Adjustment:</label>
                <input value={weight4} readOnly />
              </div>
              <div>
                <label>Final weight:</label>
                <input value={weight5} readOnly />
              </div>
              <div>
                <label>Product No:</label>
                <input value={sNo} readOnly />
              </div>
            </form>
            <div className="save-button">
              {!viewOnly && (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button className="pdf-button" onClick={generateBarcodePDF}>Generate Barcode as PDF</button>
                </>
              )}
            </div>
            {showBarcode && (
              <div ref={barcodeRef} style={{ marginTop: '2rem' }}>
                <Barcode value={sNo} width={2} height={30} fontSize={12} margin={5} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
