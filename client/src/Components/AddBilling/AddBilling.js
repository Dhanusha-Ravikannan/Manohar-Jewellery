
import React, { useState, useEffect } from "react";
import "../AddBilling/AddBilling.css";
import Table from "react-bootstrap/esm/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useNavigate } from "react-router-dom";
import BarcodeReader from "react-barcode-reader";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { transform_text } from "../utils"; 
import Navbarr from "../Navbarr/Navbarr";
import "jspdf-autotable";
 
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
    barcodeWeight: true,
    complete: true, 
  });
  const { bill_number, bill_type } = useParams();
  const [soldProducts, setSoldProducts] = useState(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState(false); 




  const exportPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Bill Details", 14, 22);
  
    const columns = [];
    if (selectedColumns.serialNo) columns.push({ title: "S.No", dataKey: "serialNo" });
    if (selectedColumns.productNumber) columns.push({ title: "Product.No", dataKey: "productNumber" });
    if (selectedColumns.beforeWeight) columns.push({ title: "Before Weight", dataKey: "beforeWeight" });
    if (selectedColumns.afterWeight) columns.push({ title: "After Weight", dataKey: "afterWeight" });
    if (selectedColumns.difference) columns.push({ title: "Difference", dataKey: "difference" });
    if (selectedColumns.adjustment) columns.push({ title: "Adjustment", dataKey: "adjustment" });
    if (selectedColumns.barcodeWeight) columns.push({ title: "Barcode Weight", dataKey: "barcodeWeight" });
    if (selectedColumns.finalWeight) columns.push({ title: "Final Weight", dataKey: "finalWeight" });
   
  
  
    const tableData = scannedProducts.map((product, index) => {
      const row = {};
      if (selectedColumns.serialNo) row.serialNo = index + 1;
      if (selectedColumns.productNumber) row.productNumber = transform_text(product.product_number);
      if (selectedColumns.beforeWeight) row.beforeWeight = product.before_weight;
      if (selectedColumns.afterWeight) row.afterWeight = product.after_weight;
      if (selectedColumns.difference) row.difference = product.difference;
      if (selectedColumns.adjustment) row.adjustment = product.adjustment;
      if (selectedColumns.barcodeWeight) row.barcodeWeight = product.barcode_weight;
      if (selectedColumns.finalWeight) row.finalWeight = product.final_weight;
     
      return row;
    });
  
  
    doc.autoTable({
      head: [columns.map(col => col.title)],
      body: tableData,
      startY: 30,
      margin: { top: 20 },
      styles: {
        fontStyle: "bold",
        fillColor: [36, 36, 66],
        halign: 'center',
      },
      theme: 'grid',  
      tableLineColor: [0, 0, 0],  
      tableLineWidth: 0.1, 
    });
  
   
    const totalData = [];
    if (selectedColumns.beforeWeight) totalData.push(totalBeforeWeight);
    if (selectedColumns.afterWeight) totalData.push(totalAfterWeight);
    if (selectedColumns.difference) totalData.push(totalDifference);
    if (selectedColumns.adjustment) totalData.push(totalAdjustment);
    if (selectedColumns.barcodeWeight) totalData.push(totalBarcodeWeight);
    if (selectedColumns.finalWeight) totalData.push(totalFinalWeight);
    
    const totalRow = ["Total Weight", ...totalData];

    doc.autoTable({
      body: [totalRow],
      startY: doc.lastAutoTable.finalY + 10,
      styles: {
        fontStyle: "bold",
        // halign: 'center',
      },
      theme: 'grid',  
      tableLineColor: [2, 2, 2],  
      tableLineWidth: 0.2,  
    });
  
 
    const pdfName = billName.trim() ? `${billName}.pdf` : "billing_details.pdf";
    doc.save(pdfName);
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
    if (soldProducts.has(product_number)) {
      alert("Product is already sold!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/products/getSerial/${bill_number}/${product_number}/${bill_type}`
      );

      if (response.status === 200) {
        
        setScannedProducts((prevProducts) => [
          ...prevProducts,
          response.data.product,
        ]);
        
       
        setSoldProducts((prevSoldProducts) => new Set(prevSoldProducts.add(product_number)));
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


  const handleSelectAllChange = () => {
    setSelectAllChecked((prev) => !prev);
    if (!selectAllChecked) {
      setCheckedProducts(
        scannedProducts.map((product) => ({
          productId: product.product_number,
          id: product.id,
        }))
      );
    } else {
      setCheckedProducts([]);
    }
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
  const totalBarcodeWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.barcode_weight || 0), 0)
    .toFixed(3);
  const totalFinalWeight = scannedProducts
    .reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0)
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
                {selectedColumns.barcodeWeight&& <th> Final Weight</th>}
                {selectedColumns.finalWeight && <th> Enamel Weight </th>}
                
                {selectedColumns.complete && bill_number === "bill" && (
                  <th>
                    <Checkbox
                      checked={selectAllChecked}
                      onChange={handleSelectAllChange}
                      style={{ color: "white" }}
                    />
                    Select All
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {scannedProducts.length > 0 ? (
                scannedProducts.map((product, index) => (
                  <tr key={index}>
                    {selectedColumns.serialNo && <td>{index + 1}</td>}
                    {selectedColumns.productNumber && <td> {transform_text(product.product_number)}</td>}
                    {selectedColumns.beforeWeight && <td>{product.before_weight}</td>}
                    {selectedColumns.afterWeight && <td>{product.after_weight}</td>}
                    {selectedColumns.difference && <td>{product.difference}</td>}
                    {selectedColumns.adjustment && <td>{product.adjustment}</td>}
                    {selectedColumns.barcodeWeight&& <td>{product.barcode_weight}</td>}
                    {selectedColumns.finalWeight && <td>{product.final_weight}</td>}
                    
                    {selectedColumns.complete && bill_number === "bill" && (
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
                {selectedColumns.barcodeWeight && <td> <b>{totalBarcodeWeight}</b></td>}
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
              checked={selectedColumns.barcodeWeight}
              onChange={() => handleColumnCheckboxChange("barcodeWeight")}
              style={{ color: "rgb(36, 36, 66)" }}
            />
            Final weight
          </label> 
            <label>
              <Checkbox
                type="checkbox"
                checked={selectedColumns.finalWeight} 
                onChange={() => handleColumnCheckboxChange("finalWeight")}
                style={{ color: "rgb(36, 36, 66)" }}
              />
              Enamel Weight
            </label>
            
          
          </div>
      </div>
    </>
  );
};

export default AddBilling;