
// import React, { useEffect, useState } from "react";
// import "../AddBilling/AddBilling.css";
// import Table from "react-bootstrap/esm/Table";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import Checkbox from "@mui/material/Checkbox";
// import { useParams } from "react-router-dom";
// import BarcodeReader from "react-barcode-reader";
// import axios from "axios";
// import Navbarr from "../Navbarr/Navbarr";
// import { transform_text } from "../utils";

// const AddBilling = () => {
//   const [scannedProducts, setScannedProducts] = useState([]);
//   const [checkboxes, setCheckboxes] = useState({
//     productNo: true,
//     beforeWeight: true,
//     afterWeight: true,
//     difference: true,
//     adjustment: true,
//     finalWeight: true,
//   });

//   const { bill_number, bill_type } = useParams();
//   const fetchBillNo = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/bills/bills/` + bill_number
//       );
//       setScannedProducts(response.data.products);
//     } catch (error) {
//       console.log("Error fetching bill data:", error);
//     }
//   };
 
//   useEffect(() => {
//     fetchBillNo();
//   }, []);

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setCheckboxes((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const handleScan = async (product_number) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/v1/products/getSerial/${bill_number}/${product_number}/${bill_type}`
//       );

//       if (response.status === 200) {
//         setScannedProducts((prevProducts) => [
//           ...prevProducts,
//           response.data.product,
//         ]);
//       } else {
//         console.error("Failed to fetch product");
//       }
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };

//   const exportPDF = async () => {
//     const input = document.getElementById("page-to-pdf");

    
//     const filteredColumns = [
//       checkboxes.productNo && "Product.No",
//       checkboxes.beforeWeight && "Before weight",
//       checkboxes.afterWeight && "After weight",
//       checkboxes.difference && "Difference",
//       checkboxes.adjustment && "Adjustment",
//       checkboxes.finalWeight && "Final weight",
//     ].filter(Boolean); 

//     const filteredData = scannedProducts.map((product) => {
//       return {
//         productNo: checkboxes.productNo ? product.product_number : null,
//         beforeWeight: checkboxes.beforeWeight ? product.before_weight : null,
//         afterWeight: checkboxes.afterWeight ? product.after_weight : null,
//         difference: checkboxes.difference ? product.difference : null,
//         adjustment: checkboxes.adjustment ? product.adjustment : null,
//         finalWeight: checkboxes.finalWeight ? product.final_weight : null,
//       };
//     });

   
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF();
//     const imgWidth = 190;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//     pdf.save("billing_details.pdf");
//   };

//   const totalBeforeWeight = scannedProducts
//     .reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0)
//     .toFixed(3);
//   const totalAfterWeight = scannedProducts
//     .reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0)
//     .toFixed(3);
//   const totalDifference = scannedProducts
//     .reduce((acc, product) => acc + parseFloat(product.difference || 0), 0)
//     .toFixed(3);
//   const totalAdjustment = scannedProducts
//     .reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0)
//     .toFixed(3);
//   const totalFinalWeight = scannedProducts
//     .reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0)
//     .toFixed(3);

//   return (
//     <>
//       <div className="background">
//         <Navbarr />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <div className="back-tab">
//           <div className="page-to-pdf" id="page-to-pdf">
//             <h2>Bill Details</h2>
//             <BarcodeReader onScan={handleScan} />

//             <Table striped bordered hover className="tab">
              // <thead>
              //   <tr>
              //     <th>S.No</th>
              //     {checkboxes.productNo && <th>Product.No</th>}
              //     {checkboxes.beforeWeight && <th>Before weight</th>}
              //     {checkboxes.afterWeight && <th>After weight</th>}
              //     {checkboxes.difference && <th>Difference</th>}
              //     {checkboxes.adjustment && <th>Adjustment</th>}
              //     {checkboxes.finalWeight && <th>Final weight</th>}
              //   </tr>
              // </thead>
//               <tbody>
//                 {scannedProducts.length > 0 ? (
//                   scannedProducts.map((product, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       {checkboxes.productNo && <td>{transform_text(product.product_number)}</td>}
//                       {checkboxes.beforeWeight && <td>{product.before_weight}</td>}
//                       {checkboxes.afterWeight && <td>{product.after_weight}</td>}
//                       {checkboxes.difference && <td>{product.difference}</td>}
//                       {checkboxes.adjustment && <td>{product.adjustment}</td>}
//                       {checkboxes.finalWeight && <td>{product.final_weight}</td>}
                    
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7">No product scanned</td>
//                   </tr>
//                 )}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan="2">
//                     <b>Total Weight =  </b>
//                   </td>
//                   {checkboxes.afterWeight && <td>
//                     <b>{totalBeforeWeight}</b>
//                   </td>}
//                   {checkboxes.beforeWeight && <td>
//                     <b>{totalAfterWeight}</b>
//                   </td>}
//                   {checkboxes.difference && <td>
//                     <b>{totalDifference}</b>
//                   </td>}
//                   {checkboxes.adjustment && <td>
//                     <b>{totalAdjustment}</b>
//                   </td>}
//                   {checkboxes.finalWeight && <td>
//                     <b>{totalFinalWeight}</b>
//                   </td>}
//                 </tr>
//               </tfoot>
//             </Table>
//           </div>

          // <div className="button-save">
          //   <button className="pdf" onClick={exportPDF}>
          //     Export as PDF
          //   </button>
          // </div>

          // <div className="checkboxes">
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.productNo}
          //       onChange={handleCheckboxChange}
          //       name="productNo"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     Product Number
          //   </label>
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.beforeWeight}
          //       onChange={handleCheckboxChange}
          //       name="beforeWeight"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     Before weight
          //   </label>
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.afterWeight}
          //       onChange={handleCheckboxChange}
          //       name="afterWeight"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     After weight
          //   </label>
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.difference}
          //       onChange={handleCheckboxChange}
          //       name="difference"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     Difference
          //   </label>
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.adjustment}
          //       onChange={handleCheckboxChange}
          //       name="adjustment"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     Adjustment
          //   </label>
          //   <label>
          //     <Checkbox
          //       checked={checkboxes.finalWeight}
          //       onChange={handleCheckboxChange}
          //       name="finalWeight"
          //       style={{ color: "rgb(36, 36, 66)" }}
          //     />
          //     Final weight
          //   </label>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBilling;





import React, { useState, useEffect } from "react";
import "../AddBilling/AddBilling.css";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useNavigate } from "react-router-dom";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
 
import Navbarr from "../Navbarr/Navbarr";
 
const AddBilling = () => {
  const navigate = useNavigate();
  const [scannedProducts, setScannedProducts] = useState([]);
  const [billName, setBillName] = useState("");
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({
    serialNo: true,
    productNumber: true,
    beforeWeight: true,
    afterWeight: true,
    difference: true,
    adjustment: true,
    finalWeight: true,
  });
  const { bill_number, bill_type } = useParams();
  
  const exportPDF = async () => {
    const input = document.getElementById("page-to-pdf");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    const pdfName = billName.trim() ? `${billName}.pdf` : "billing_details.pdf";
    pdf.save(pdfName);
  };

  const fetchBillNo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/bills/bills/` + bill_number
      );
      setScannedProducts(response.data.products);
    } catch (error) {
      console.log("Error fetching bill data:", error);
    }
  };

  useEffect(() => {
    fetchBillNo();
  }, []);

  const handleScan = async (product_number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/products/getSerial/${bill_number}/${product_number}/${bill_type}`
      );
      if (response.status === 200) {
        setScannedProducts((prevProducts) => [
          ...prevProducts,
          response.data.product,
        ]);
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };


  const handleSellApprove = async (value) => {
    try {
      console.log(value, "llllllllllllllllllllll");
      console.log("Selected products:", checkedProducts);

      const response = await axios.post(
        "http://localhost:5000/bills/bill-details",
        {
          button: value,
          bill_name: billName,
          selected_products: checkedProducts,
         
        }
      );

      console.log("Backend response:", response); 
 
      if (response.status === 200) {
        alert(`Bill ${value === "Sell" ? "SOLD" : "APPROVED"} successfully!`);
        navigate(`/billing/${response.data.bill.bill_number}`);
      }
    } catch (error) {
      console.error("Error sending Sell data:", error);
      alert("Error saving bill.");
    }
  };

  const handleCheckboxChange = (productId, id) => {
    setCheckedProducts((prevCheckedProducts) => {
      let updatedCheckedProducts;
      const isProductChecked = prevCheckedProducts.some(
        (product) => product.productId === productId
      );
      if (isProductChecked) {
        updatedCheckedProducts = prevCheckedProducts.filter(
          (id) => id.productId !== productId
        );
      } else {
        updatedCheckedProducts = [...prevCheckedProducts, { productId, id }];
      }
      return updatedCheckedProducts;
    });
  };

  const handleColumnCheckboxChange = (column) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [column]: !prevSelectedColumns[column],
    }));
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
  const totalBarcodeWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.barcode_weight || 0), 0)
    .toFixed(3);

  return (
    <>
      <Navbarr />
      <div className="back-tab">
        <div id="page-to-pdf">
          <h2> Bill Details</h2>
          <BarcodeReader onScan={handleScan} />

          <Table striped bordered hover className="add-tab">
            <thead>
              <tr>
                {selectedColumns.serialNo && <th>  S.No </th>}
                {selectedColumns.productNumber && <th> Product.No </th>}
                {selectedColumns.beforeWeight && <th> Before Weight </th>}
                {selectedColumns.afterWeight && <th> After Weight </th>}
                {selectedColumns.difference && <th> Difference </th>}
                {selectedColumns.adjustment && <th> Adjustment </th>}
                {selectedColumns.finalWeight && <th> Final Weight </th>}
                {bill_number === "bill" && <th> Checkbox </th>}
              </tr>
            </thead>
            <tbody>
              {scannedProducts.length > 0 ? (
                scannedProducts.map((product, index) => (
                  <tr key={index}>
                    {selectedColumns.serialNo && <td>{index + 1}</td>}
                    {selectedColumns.productNumber && <td>{product.product_number}</td>}
                    {selectedColumns.beforeWeight && <td>{product.before_weight}</td>}
                    {selectedColumns.afterWeight && <td>{product.after_weight}</td>}
                    {selectedColumns.difference && <td>{product.difference}</td>}
                    {selectedColumns.adjustment && <td>{product.adjustment}</td>}
                    {selectedColumns.finalWeight && <td>{product.final_weight}</td>}
                    {bill_number === "bill" && (
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedProducts.some(
                            (item) => item.productId === product.product_number
                          )}
                          onChange={() =>
                            handleCheckboxChange(product.product_number, product.id)
                          }
                        />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No products found.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2"><b>Total Weight </b></td>
                {selectedColumns.beforeWeight && <td><b>{totalBeforeWeight}</b></td>}
                {selectedColumns.afterWeight && <td><b>{totalAfterWeight}</b></td>}
                {selectedColumns.difference && <td><b>{totalDifference}</b></td>}
                {selectedColumns.adjustment && <td><b>{totalAdjustment}</b></td>}
                {selectedColumns.finalWeight && <td><b>{totalFinalWeight}</b></td>}
              </tr>
            </tfoot>
          </Table>
          </div>

          {bill_number === "bill" && (
            <div className="pdf-btn">
              <input
                type="text"
                className="bill-name-input"
                placeholder="Enter bill name"
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
              />
            </div>
          )}
          <div className="button-save">
            <button className="pdf" onClick={() => handleSellApprove("Sell")}> Save </button>
            <button className="pdf" onClick={exportPDF}>
              Export as PDF
            </button>
          </div>
          <br/>

          <div className="column-checklist">
            <label  >
              <Checkbox
                type="checkbox"
                checked={selectedColumns.serialNo}
                onChange={() => handleColumnCheckboxChange("serialNo")}
                style={{ color: "rgb(36, 36, 66)" }}
                
              />
              S.No
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.productNumber}
                onChange={() => handleColumnCheckboxChange("productNumber")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Product.No
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.beforeWeight}
                onChange={() => handleColumnCheckboxChange("beforeWeight")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Before Weight
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.afterWeight}
                onChange={() => handleColumnCheckboxChange("afterWeight")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              After Weight
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.difference}
                onChange={() => handleColumnCheckboxChange("difference")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Difference
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.adjustment}
                onChange={() => handleColumnCheckboxChange("adjustment")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Adjustment
            </label>
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.finalWeight} 
                onChange={() => handleColumnCheckboxChange("finalWeight")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Final Weight
            </label>
          </div>
      </div>
    </>
  );
};

export default AddBilling;









