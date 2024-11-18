import React, { useState, useRef } from "react";
import axios from "axios";
import "../Products/View.css";
import Products from "./Products";

const WeightFormPopup = ({
  showPopup,
  closePopup,
  productId,
  productInfo,
  updateProductList,
}) => {
  const [beforeWeight, setBeforeWeight] = useState(productInfo.before_weight);
  const [afterWeight, setAfterWeight] = useState(productInfo.after_weight);
  const [barcodeWeight, setBarcodeWeight] = useState(productInfo.barcode_weight);

  const beforeWeightRef = useRef(null);
  const afterWeightRef = useRef(null);
  const barcodeWeightRef = useRef(null);
  console.log("kkkkkkkkkk", productId);
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        before_weight: parseFloat(beforeWeight),
        after_weight: parseFloat(afterWeight),
        barcode_weight: parseFloat(barcodeWeight),
      };

      await axios.put(
        `http://localhost:5000/api/v1/products/update/${productId}`,
        updatedData
      );
      console.log("hhhhhhhhhh", updatedData);
      updateProductList();

      closePopup();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    showPopup && (
      <div className="popup-1">
        <div className="popup-content">
          <div className="close">
            <b onClick={closePopup} className="close-button">
              X
            </b>
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
          <div className="save-button">
            <button onClick={() => handleSave(Products.lot)}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default WeightFormPopup;
