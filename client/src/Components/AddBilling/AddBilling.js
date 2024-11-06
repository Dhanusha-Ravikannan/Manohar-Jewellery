
import React from 'react';
import '../AddBilling/AddBilling.css';
import Table from 'react-bootstrap/esm/Table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AddBilling = () => {
  const exportPDF = async () => {
    const input = document.getElementById('page-to-pdf');

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 190; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;
    
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank'); 
  };

  return (
    <>
      <div className='nav-color'>
        <div className='back-tab'>
          <div id='page-to-pdf'>
            <h2 className='bills'> Bill Details </h2>
            <Table striped bordered hover className='add-tab'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Attribute 1</th>
                  <th>Attribute 2</th>
                  <th>Attribute 3</th>
                  <th>Attribute 4</th>
                  <th>Attribute 5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input placeholder='M10213' /></td>
                  <td><input /></td>
                  <td><input /></td>
                  <td><input /></td>
                  <td><input /></td>
                  <td><input /></td>
                </tr>
              </tbody>
            </Table>
          </div>
          <br />
          <button className='pdf' onClick={exportPDF}> Export as PDF</button>
        </div>
      </div>
    </>
  );
}

export default AddBilling;
