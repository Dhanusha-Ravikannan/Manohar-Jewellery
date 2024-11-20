// import React, { useState } from "react";
// import "../AddBilling/AddBilling.css";
// import Table from "react-bootstrap/esm/Table";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import Checkbox from "@mui/material/Checkbox";
// import { useParams } from "react-router-dom";
// import BarcodeReader from "react-barcode-reader";
// import axios from "axios";
// import Navbarr from "../Navbarr/Navbarr";

// const AddBilling = () => {

//   const [scannedProducts, setScannedProducts] = useState([]);
//   const { bill_number, bill_type } = useParams();



//   const exportPDF = async () => {
//     const input = document.getElementById("page-to-pdf");
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF();
//     const imgWidth = 190;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//     pdf.save("billing_details.pdf");
//   };

//   const label = { inputProps: { "aria-label": "Checkbox demo" } };

//   const handleScan = async (product_number) => {
//     try {

    

//       const response = await axios.get(`http://localhost:5000/api/v1/products/getSerial/${bill_number}/${product_number}/${bill_type}`);

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

//   return (
//     <>
//       <Navbarr />
//       <div className="back-tab">
//         <div id="page-to-pdf">
//           <h2> Bill Details</h2>
//           <BarcodeReader onScan={handleScan} />

//           <Table striped bordered hover className="add-tab">
//             <thead>
//               <tr>
//                 <th> S.No </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} checked />{" "}
//                   Product.No{" "}
//                 </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} />
//                   Before weight
//                 </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} />
//                   After weight
//                 </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} />
//                   Difference
//                 </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} />
//                   Adjustment
//                 </th>
//                 <th>
//                   <Checkbox {...label} style={{ color: "white" }} />
//                   Final weight
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {scannedProducts.length > 0 ? (
//                 scannedProducts.map((product, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{product.product_number}</td>
//                     <td>{product.before_weight}</td>
//                     <td>{product.after_weight}</td>
//                     <td>{product.difference}</td>
//                     <td>{product.adjustment}</td>
//                     <td>{product.final_weight}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No product scanned</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//         <div className="button-save">
//           <button className="savee">Save</button>
//           <button className="pdf" onClick={exportPDF}>
//             Export as PDF
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBilling;




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

const AddBilling = () => {
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
            <h2>Bill Details</h2>
            <BarcodeReader onScan={handleScan} />

            <Table striped bordered hover className="tab">
              <thead>
                <tr>
                  <th>S.No</th>
                  {checkboxes.productNo && <th>Product.No</th>}
                  {checkboxes.beforeWeight && <th>Before weight</th>}
                  {checkboxes.afterWeight && <th>After weight</th>}
                  {checkboxes.difference && <th>Difference</th>}
                  {checkboxes.adjustment && <th>Adjustment</th>}
                  {checkboxes.finalWeight && <th>Final weight</th>}
                </tr>
              </thead>
              <tbody>
                {scannedProducts.length > 0 ? (
                  scannedProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {checkboxes.productNo && <td>{product.product_number}</td>}
                      {checkboxes.beforeWeight && <td>{product.before_weight}</td>}
                      {checkboxes.afterWeight && <td>{product.after_weight}</td>}
                      {checkboxes.difference && <td>{product.difference}</td>}
                      {checkboxes.adjustment && <td>{product.adjustment}</td>}
                      {checkboxes.finalWeight && <td>{product.final_weight}</td>}
                    
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No product scanned</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <b>Total Weight =  </b>
                  </td>
                  {checkboxes.afterWeight && <td>
                    <b>{totalBeforeWeight}</b>
                  </td>}
                  {checkboxes.beforeWeight && <td>
                    <b>{totalAfterWeight}</b>
                  </td>}
                  {checkboxes.difference && <td>
                    <b>{totalDifference}</b>
                  </td>}
                  {checkboxes.adjustment && <td>
                    <b>{totalAdjustment}</b>
                  </td>}
                  {checkboxes.finalWeight && <td>
                    <b>{totalFinalWeight}</b>
                  </td>}
                </tr>
              </tfoot>
            </Table>
          </div>

          <div className="button-save">
            <button className="pdf" onClick={exportPDF}>
              Export as PDF
            </button>
          </div>

          <div className="checkboxes">
            <label>
              <Checkbox
                checked={checkboxes.productNo}
                onChange={handleCheckboxChange}
                name="productNo"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Product Number
            </label>
            <label>
              <Checkbox
                checked={checkboxes.beforeWeight}
                onChange={handleCheckboxChange}
                name="beforeWeight"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Before weight
            </label>
            <label>
              <Checkbox
                checked={checkboxes.afterWeight}
                onChange={handleCheckboxChange}
                name="afterWeight"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              After weight
            </label>
            <label>
              <Checkbox
                checked={checkboxes.difference}
                onChange={handleCheckboxChange}
                name="difference"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Difference
            </label>
            <label>
              <Checkbox
                checked={checkboxes.adjustment}
                onChange={handleCheckboxChange}
                name="adjustment"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Adjustment
            </label>
            <label>
              <Checkbox
                checked={checkboxes.finalWeight}
                onChange={handleCheckboxChange}
                name="finalWeight"
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Final weight
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBilling;
