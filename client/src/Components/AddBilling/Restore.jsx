


import React, { useState } from "react";
import "../AddBilling/AddBilling.css";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import Navbarr from "../Navbarr/Navbarr";
import { REACT_APP_BACKEND_SERVER_URL } from "../../config";

const RestoreBills = () => {
  const [scannedProducts, setScannedProducts] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    productNo: true,
    beforeWeight: true,
    afterWeight: true,
    difference: true,
    adjustment: true,
    finalWeight: true,
  });

  const { bill_number, bill_type } = useParams();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleScan = async (product_number) => {
    try {
      const response = await axios
        .get(
          `${REACT_APP_BACKEND_SERVER_URL}/api/v1/products/restore/${product_number}`
        )
        .then((x) =>
          alert("Product changed to active successfully").catch((e) =>
            console.log(e)
          )
        );

      
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const exportPDF = async () => {
    const input = document.getElementById("page-to-pdf");

    
    const filteredColumns = [
      checkboxes.productNo && "Product.No",
      checkboxes.beforeWeight && "Before weight",
      checkboxes.afterWeight && "After weight",
      checkboxes.difference && "Difference",
      checkboxes.adjustment && "Adjustment",
      checkboxes.finalWeight && "Final weight",
    ].filter(Boolean); // Remove undefined or false values

    const filteredData = scannedProducts.map((product) => {
      return {
        productNo: checkboxes.productNo ? product.product_number : null,
        beforeWeight: checkboxes.beforeWeight ? product.before_weight : null,
        afterWeight: checkboxes.afterWeight ? product.after_weight : null,
        difference: checkboxes.difference ? product.difference : null,
        adjustment: checkboxes.adjustment ? product.adjustment : null,
        finalWeight: checkboxes.finalWeight ? product.final_weight : null,
      };
    });

   
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("billing_details.pdf");
  };

  const totalBeforeWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0)
    .toFixed(3);
  const totalAfterWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0)
    .toFixed(3);
  const totalDifference = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.difference || 0), 0)
    .toFixed(3);
  const totalAdjustment = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0)
    .toFixed(3);
  const totalFinalWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0)
    .toFixed(3);

  return (
    <>
      <div className="background">
        <Navbarr />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="back-tab">
          <div className="page-to-pdf" id="page-to-pdf">
            <h2>Restore Product</h2>
            <BarcodeReader onScan={handleScan} />

          </div>

          


        </div>
      </div>
    </>
  );
};

export default RestoreBills;
