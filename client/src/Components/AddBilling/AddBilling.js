
// import React from 'react';
// import '../AddBilling/AddBilling.css';
// import Table from 'react-bootstrap/esm/Table';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Checkbox from '@mui/material/Checkbox';
// import { Link } from 'react-router-dom';

// const AddBilling = ({ selectedProduct }) => {
//   const exportPDF = async () => {
//     const input = document.getElementById('page-to-pdf');

//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL('image/png');
    
//     const pdf = new jsPDF();
//     const imgWidth = 190; 
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     let position = 10;
    
//     pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    
//     const pdfBlob = pdf.output('blob');
//     const blobUrl = URL.createObjectURL(pdfBlob);
//     window.open(blobUrl, '_blank'); 
//   };
//   const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//   return (
//     <>
//       <div className='nav-color'>
//       <div className="position">
//         <Link to='/navbar'> 
//           <b style={{ cursor: 'pointer', color:'white' }}> Products </b> </Link>
//           <Link to="/billing">
//             <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
//           </Link>
//         </div>
//         <div className='back-tab'>
//           <div id='page-to-pdf'>
//             <h2 className='bills'> Bill Details </h2>
//             <Table striped bordered hover className='add-tab'>
//               <thead>
//                 <tr>
//                   <th> S.No  </th>
//                   <th><Checkbox {...label} style={{color:'white'}} /> Product.No  </th>
//                   <th><Checkbox {...label} style={{color:'white'}} />Before weight</th>
//                   <th><Checkbox {...label} style={{color:'white'}} />After weight</th>
//                   <th><Checkbox {...label} style={{color:'white'}} />Difference</th>
//                   <th><Checkbox {...label} style={{color:'white'}} />Adjustment</th>
//                   <th><Checkbox {...label} style={{color:'white'}} />Final weight</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {selectedProduct ? (
//             <tr>
//               <td>{selectedProduct.serial}</td>
//               <td>{selectedProduct.product_number}</td>
//               <td>{selectedProduct.before_weight}</td>
//               <td>{selectedProduct.after_weight}</td>
//               <td>{selectedProduct.difference}</td>
//               <td>{selectedProduct.adjustment}</td>
//               <td>{selectedProduct.final_weight}</td>
//             </tr>
//           ) : (
//             <tr>
//               <td colSpan="7">No product scanned</td>
//             </tr>
//           )}
//               </tbody>
//             </Table>
//           </div>
//           <br />
//           <button className='pdf' onClick={exportPDF}> Export as PDF</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddBilling;



import React from "react";
import "../AddBilling/AddBilling.css";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

const AddBilling = ({ selectedProduct }) => {
  const exportPDF = async () => {
    const input = document.getElementById("page-to-pdf");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div className="nav-color">
        <div className="position">
          <Link to="/navbar">
            <b style={{ cursor: "pointer", color: "white" }}> Products </b>
          </Link>
          <Link to="/billing">
            <b style={{ cursor: "pointer", color: "white" }}> Billing </b>
          </Link>
        </div>
        <div className="back-tab">
          <div id="page-to-pdf">
            <h2 className="bills"> Bill Details </h2>
            <Table striped bordered hover className="add-tab">
              <thead>
                <tr>
                  <th> S.No </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} /> Product.No{" "}
                  </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} />Before weight
                  </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} />After weight
                  </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} />Difference
                  </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} />Adjustment
                  </th>
                  <th>
                    <Checkbox {...label} style={{ color: "white" }} />Final weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedProduct ? (
                  <tr>
                    <td>{selectedProduct.serial}</td>
                    <td>{selectedProduct.product_number}</td>
                    <td>{selectedProduct.before_weight}</td>
                    <td>{selectedProduct.after_weight}</td>
                    <td>{selectedProduct.difference}</td>
                    <td>{selectedProduct.adjustment}</td>
                    <td>{selectedProduct.final_weight}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="7">No product scanned</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <br />
          <button className="pdf" onClick={exportPDF}>
            Export as PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBilling;
