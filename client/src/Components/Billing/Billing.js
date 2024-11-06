
import React from 'react'
import '../Billing/Billing.css';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';

const Billing = () => {
  return (
    <> 
    <div className='nav-color'>
    <Link to={'/add'}>
        <button className='bill-position'> Add New Bill</button> 
    </Link>

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
                <td><input placeholder='M10213' /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input /></td>   
              </tr>
              <tr>
                <td><input placeholder='R10157' /></td>
                <td><input /></td>
                <td><input /></td>
                <td><input  /></td>   
              </tr>  
            </tbody>
          </Table>
          </div>
    </div>
    </>

  
    
  )
}

export default Billing