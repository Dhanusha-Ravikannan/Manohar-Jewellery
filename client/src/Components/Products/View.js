import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Products/View.css";
import jsPDF from "jspdf";
import Barcode from "react-qr-code";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { transform_text } from "../utils";
import Button from "@mui/material/Button";
import images from '../../Components/Logo/manohar.jpg'


const WeightFormPopup = ({
  showPopup,
  closePopup,
  productId,
  product,
  productInfo,
  updateProductList,
}) => {
  console.log(product, "1111111111111111");
  
  const [beforeWeight, setBeforeWeight] = useState(productInfo.before_weight);
  const [afterWeight, setAfterWeight] = useState(productInfo.after_weight);
  const [barcodeWeight, setBarcodeWeight] = useState( productInfo.barcode_weight);
  const [showBarcode, setShowBarcode] = useState(false);
  const [selectedProductNo, setSelectedProductNo] = useState(null);
  const barcodeRef = useRef(null);
  const beforeWeightRef = useRef(null);
  const afterWeightRef = useRef(null);
  const barcodeWeightRef = useRef(null); 

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleExportPdf = async () => {
    if (barcodeRef.current) {
      try {
        const canvas = await html2canvas(barcodeRef.current, {
          backgroundColor: null,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [55, 12],
        });
        pdf.addImage(imgData, "PNG", 2, 3, 45, 7);
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
 
        window.open(pdfUrl, "_blank");
      } catch (error) {
        console.error("Error exporting barcode as PDF:", error);
      }
    }
  };

  console.log("hhhhhhhh", productInfo, productId);

  const handleGenerateBarcode = (productNo) => {
    if (!productNo) {
      console.error("Product number is undefined or invalid!");
      return;
    }
    setSelectedProductNo(productNo);
    setShowBarcode(true);
  };


  const handleSave = async () => {
    try {
      const updatedData = {
        before_weight: parseFloat(beforeWeight),
        after_weight: parseFloat(afterWeight),
        barcode_weight: parseFloat(barcodeWeight),
      };

      await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/update/${productId}`,updatedData);
      console.log("Updated Product Data:", updatedData);
      alert("Product saved successfully!");
      window.location.reload()

      updateProductList();
      closePopup();
      
      window.location.reload()
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    const handleBarcodeScan = (e) => {
      setShowBarcode((prevData) => prevData + e.key);

      if (e.key === "Enter") {
        console.log("Scanned Barcode:", showBarcode);
        setShowBarcode("");
      }
    };

    window.addEventListener("keydown", handleBarcodeScan);

    return () => {
      window.removeEventListener("keydown", handleBarcodeScan);
    };
  }, [showBarcode]);

  useEffect(() => {
    console.log("Product Object: ", product);
    if (product && product.product_number) {
      console.log("Product Number: ", product.product_number);
    }
  }, [product]);

  return (
    
    showPopup && (
      <div className="popup-2">
        <div className="popup-contentt">
          <div className="clos">
            <div onClick={closePopup} className="close-button" >
            <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <form className="in-position">
            <div>
              <label>Before Weight:</label>
              <input
                type="number"
                value={beforeWeight}
                onChange={(e) => setBeforeWeight(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, afterWeightRef)}
                ref={beforeWeightRef}
                placeholder="Enter Before Weight"
              />
            </div>
            <div>
              <label>After Weight:</label>
              <input
                type="number"
                value={afterWeight}
                onChange={(e) => setAfterWeight(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, barcodeWeightRef)}
                ref={afterWeightRef}
                placeholder="Enter After Weight"
              />
            </div>
            <div>
              <label>Barcode Weight:</label>
              <input
                type="number"
                value={barcodeWeight}
                onChange={(e) => setBarcodeWeight(e.target.value)}
                ref={barcodeWeightRef}
                placeholder="Enter Barcode Weight"
              />
            </div>
          </form>

          <br></br>
          <div
            className="button-group"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              onClick={handleSave}
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#25274D",
                color: "white",
                width: "20%",
              }}
            >
              Save
            </Button>
            <br></br>
 
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={() => handleGenerateBarcode(product.product_number)}
                variant="contained"
                size="small"
                style={{ backgroundColor: "#25274D", color: "white" }}
              >
                Generate QR
              </Button>
              <Button
                onClick={handleExportPdf}
                variant="contained"
                size="small"
                style={{ backgroundColor: "#25274D", color: "white" }}
              >
                Export as PDF
              </Button>
            </div>
          </div>

  



{showBarcode && selectedProductNo &&(
  
  <div
    ref={barcodeRef}
    style={{
      position:'relative',
      display: "flex",
      alignItems: "center",
      marginTop: "1rem",
      marginRight:"1rem",
      
     
    }}
  > <span> <img src={images} alt="jewelery" className="log"/></span><span></span>
    
    <div
      style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        
      }}
    >
   
      <Barcode value={selectedProductNo || ""} size={70} /> 
    </div>
    <div
      style={{
        fontSize: "15px",
        marginLeft: "0.3rem",
        fontWeight: "bold",
      }}
    >
      <div>{product.barcode_weight}</div>
      <div>{transform_text(product.product_number)}</div>
      
      
    </div>
  </div>
)}






          





















          </div>
        </div>
      )
    
    
  );
};

export default WeightFormPopup;




