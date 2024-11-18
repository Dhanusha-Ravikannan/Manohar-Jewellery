import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import { useParams, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import "../Products/Products.css";
import Navbarr from "../Navbarr/Navbarr";

const Products = () => {
  const { lot_id } = useParams();
  const location = useLocation();
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [showBarcode, setShowBarcode] = useState(false);
  const barcodeRef = useRef(null);
  const searchParams = new URLSearchParams(location.search);
  const lotnameQuery = searchParams.get("lotname");
  const [lotNumber, setLotNumber] = useState(lotnameQuery || lot_id || "");
  const [bulkWeightBefore, setBulkWeightBefore] = useState("");
  const [bulkWeightAfter, setBulkWeightAfter] = useState("");
  const [beforeWeight, setBeforeWeight] = useState("");
  const [afterWeight, setAfterWeight] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [difference, setDifference] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [status, setStatus] = useState("");

  const afterWeightRef = useRef(null);
  const differenceRef = useRef(null);
  const adjustmentRef = useRef(null);
  const finalWeightRef = useRef(null);
  const productNumberRef = useRef(null);
  const productWeightRef = useRef(null);

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextField.current.focus();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/products/getAll/"+lot_id
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddItems = () => {
    setShowAddItemsPopup(true);
    setShowBarcode(false);
  };

  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false);
    setShowBarcode(false);
  };

  useEffect(() => {
    const fetchLotDetails = async () => {
      console.log("Fetching lot details...");
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/lot/lot_data`,
          {
            lot_id,
          }
        );
        const lotData = response.data;
        console.log("Fetched Lot Data:", lotData);
        if (lotData) {
          setBulkWeightBefore(lotData.bulk_weight_before || "");
          setBulkWeightAfter(lotData.bulk_weight_after || "");
        }
      } catch (error) {
        console.error("Failed to fetch lot details:", error);
      }
    };

    fetchLotDetails();
  }, [lot_id]);

  const handleUpdateWeights = async () => {
    if (!bulkWeightBefore || !bulkWeightAfter) {
      alert("Please enter both Bulk Weight Before and Bulk Weight After.");
      return;
    }
    try {
      const payload = {
        lot_id: Number(lot_id),
        bulk_weight_before: parseFloat(bulkWeightBefore),
        bulk_weight_after: parseFloat(bulkWeightAfter),
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/lot/modify_lot",
        payload
      );

      if (response.status === 200) {
        alert("Bulk weights updated successfully!");
      }
    } catch (error) {
      console.error("Error updating bulk weights:", error);
      alert("There was an error updating the bulk weights.");
    }
  };

  const handleCalculate = async () => {
    if (!bulkWeightBefore || !bulkWeightAfter) {
      alert("Please enter both Bulk Weight Before and Bulk Weight After.");
      return;
    }

    try {
      // Make a request to the backend to calculate adjustments
      const response = await axios.get(
        `http://localhost:5000/api/v1/products/calculate/${lot_id}`
      );

      if (response.status === 200) {
        const calculatedProducts = response.data.products;

        // Update the products state with the calculated products
        setProducts(calculatedProducts);

        // Update the input fields with the first product's calculated values
        const firstProduct = calculatedProducts[0];
        setBeforeWeight(firstProduct.before_weight || "");
        setAfterWeight(firstProduct.after_weight || "");
        setDifference(firstProduct.difference?.toFixed(3) || "");
        setAdjustment(firstProduct.adjustment?.toFixed(3) || "");
        setFinalWeight(firstProduct.final_weight?.toFixed(2) || "");
        setProductNumber(firstProduct.product_number || "");
        setStatus(firstProduct.status || "");

        alert("Calculated values updated successfully!");
      }
    } catch (error) {
      console.error("Error calculating adjustments:", error);
      alert("There was an error calculating the adjustments.");
    }
  };

  const handleSave = async () => {
    if (!beforeWeight && !afterWeight && !productNumber && !productWeight) {
      alert("Please fill in at least one field before saving.");
      return;
    }

    try {
      const payload = {
        tag_number: lotNumber,
        before_weight: beforeWeight || null,
        after_weight: afterWeight || null,
        barcode_weight: productWeight || null,
        lot_id: Number(lot_id),
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/products/create",
        payload
      );

      if (response.status === 200) {
        setProducts((prevProducts) => [
          ...prevProducts,
          response.data.newProduct,
        ]);
        alert("Product saved successfully!");
        closeAddItemsPopup();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("There was an error saving the product.");
    }
  };

  const generateBarcodePDF = async () => {
    if (
      !lotNumber ||
      !beforeWeight ||
      !afterWeight ||
      !productNumber ||
      !productWeight
    ) {
      alert("Please fill all fields to generate a barcode.");
      return;
    }

    if (barcodeRef.current) {
      const canvas = await html2canvas(barcodeRef.current, {
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [55, 12],
      });
      pdf.addImage(imgData, "PNG", 6, 4, 45, 7);
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
      setShowBarcode(true);
    }
  };

  return (
    <>
      <Navbarr />

      <div className="add-items">
        <button onClick={handleAddItems}>Add Items</button>
      </div>

      <div className="weight">
        <div className="cont">
          <label>Bulk Weight Before:</label>
          <input
            value={bulkWeightBefore}
            onChange={(e) => setBulkWeightBefore(e.target.value)}
          />
        </div>
        <div className="cont">
          <label>Bulk Weight After:</label>
          <input
            value={bulkWeightAfter}
            onChange={(e) => setBulkWeightAfter(e.target.value)}
          />
        </div>
        <button onClick={handleUpdateWeights}>Update</button>
      </div>
      <div className="update">
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      <div className="table-container">
        <div className="list">List of Items</div>
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
              <th> status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <input value={product.product_number} readOnly />
                </td>
                <td>
                  <input value={product.before_weight || ""} readOnly />
                </td>
                <td>
                  <input value={product.after_weight || ""} readOnly />
                </td>
                <td>
                  <input
                    value={product.difference?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={product.adjustment?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={product.final_weight?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  {" "}
                  <input value={product.status} />{" "}
                </td>
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
                <input
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  readOnly
                  onKeyDown={(e) => handleKeyDown(e, afterWeightRef)}
                />
              </div>
              <div>
                <label>Before Weight:</label>
                <input
                  value={beforeWeight}
                  onChange={(e) => setBeforeWeight(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, afterWeightRef)}
                />
              </div>
              <div>
                <label>After Weight:</label>
                <input
                  value={afterWeight}
                  onChange={(e) => setAfterWeight(e.target.value)}
                  ref={afterWeightRef}
                  onKeyDown={(e) => handleKeyDown(e, differenceRef)}
                />
              </div>
              <div>
                <label>Difference:</label>
                <input
                  value={difference}
                  onChange={(e) => setDifference(e.target.value)}
                  ref={differenceRef}
                  onKeyDown={(e) => handleKeyDown(e, adjustmentRef)}
                />
              </div>
              <div>
                <label>Adjustment:</label>
                <input
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  ref={adjustmentRef}
                  onKeyDown={(e) => handleKeyDown(e, finalWeightRef)}
                />
              </div>
              <div>
                <label>Final Weight:</label>
                <input
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  ref={finalWeightRef}
                  onKeyDown={(e) => handleKeyDown(e, productNumberRef)}
                />
              </div>
              <div>
                <label>Product Number:</label>
                <input
                  value={productNumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                  ref={productNumberRef}
                  onKeyDown={(e) => handleKeyDown(e, productWeightRef)}
                />
              </div>
              <div>
                <label>Product Weight:</label>
                <input
                  value={productWeight}
                  onChange={(e) => setProductWeight(e.target.value)}
                  ref={productWeightRef}
                />
              </div>
            </form>
            <div className="save-button">
              <button onClick={handleSave}>Save</button>
              <button onClick={generateBarcodePDF}>Generate Barcode</button>
              {showBarcode && (
                <div ref={barcodeRef} style={{ display: "none" }}>
                  <Barcode value={lotNumber} />
                </div>
              )}
            </div>

            {showBarcode && (
              <div
                style={{ marginTop: "2rem", width: "400px", height: "60px" }}
              >
                <h1
                  ref={barcodeRef}
                  style={{ textAlign: "left", width: "400px", height: "60px" }}
                >
                  <Barcode
                    value={lotNumber}
                    width={2}
                    height={33}
                    fontSize={20}
                    margin={5}
                  />
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;




