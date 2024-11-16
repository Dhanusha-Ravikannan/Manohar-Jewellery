import React from 'react';
import '../Billing/Billing.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Billing = () => {
  const navigate = useNavigate();
 
  const handleAddBill = async () => {
    try {
      const response = await axios.post('http://localhost:5000/bills/create', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newBill = response.data;
      const { bill_number } = newBill;

      navigate(`/billing/${bill_number}/add`);

    } catch (error) {
      console.error('Error creating a new bill:', error);
    }
  };

  return (
    <> 
      <div className='nav-color'>
        <div className="position">
          <Link to='/navbar'> 
            <b style={{ cursor: 'pointer', color:'white' }}> Products </b> 
          </Link>
          <Link to="/billing">
            <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
          </Link>
        </div>
        <div className='bill'> 
        <button  onClick={handleAddBill}>Add New Bill Customer</button> 
        <button  onClick={handleAddBill}>Add New Bill Party</button> 
        <button  onClick={handleAddBill}>Restore</button> 

        </div>
        {/* <button className='bill-position' onClick={handleAddBill}>Add New Bill Customer</button> 
        <button className='bill-position' onClick={handleAddBill}>Add New Bill Party</button> 
        <button className='bill-position' onClick={handleAddBill}>Restore</button>  */}

        <div className='tab-container'> 
        
          <Table striped bordered hover className='tabb'>
          
            <thead>
              <tr>
                <th>S.No</th>
                <th>Created at</th>
                <th>Bill Number</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input placeholder='View' /></td>   
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
      
    </>
  );
};

export default Billing;


