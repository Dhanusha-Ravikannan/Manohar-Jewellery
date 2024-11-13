
import React from 'react'
import '../Billing/Billing.css';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';

const Billing = () => {
  return (
    <> 
    <div className='nav-color'>
    <div className="position">
        <Link to='/navbar'> 
          <b style={{ cursor: 'pointer', color:'white' }}> Products </b> </Link>
          <Link to="/billing">
            <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
          </Link>
        </div>
    <Link to={'/add'}>
        <button className='bill-position'> Add Bill</button> 
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

  
    
  )
}

export default Billing