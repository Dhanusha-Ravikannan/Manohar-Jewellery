// import React from 'react';
// import '../Billing/Billing.css';
// import { useNavigate } from 'react-router-dom';
// import Table from 'react-bootstrap/esm/Table';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Billing = () => {
//   const navigate = useNavigate();
 
//   const handleAddBill = async () => {
//     try {
//       const response = await axios.post('http://localhost:5002/bills/create', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const newBill = response.data;
//       const { bill_number } = newBill;

//       navigate(`/billing/${bill_number}/add`);

//     } catch (error) {
//       console.error('Error creating a new bill:', error);
//     }
//   };

 

//   return (
//     <> 
//       <div className='nav-color'>
//         <div className="position">
//           <Link to='/navbar'> 
//             <b style={{ cursor: 'pointer', color:'white' }}> Products </b> 
//           </Link>
//           <Link to="/billing">
//             <b style={{ cursor: 'pointer', color: 'white' }}> Billing </b>
//           </Link>
//         </div>
//         <div className='bill'> 
//         <button  onClick={handleAddBill}> Add New Bill Customer</button> 
//         <button onClick={handleAddBill}  >Add New Bill Party</button> 
//         <button> Restore</button> 

//         </div>
        

//         <div className='tab-container'> 
        
//           <Table striped bordered hover className='tabb'>
          
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Created at</th>
//                 <th>Bill Number</th>
//                 <th>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td><input /></td>
//                 <td><input /></td>
//                 <td><input /></td>
//                 <td><input placeholder='View' /></td>   
//               </tr>
//             </tbody>
//           </Table>
//           </div>
//         </div>
      
//     </>
//   );
// };

// export default Billing;






import React, { useState, useEffect } from 'react';
import '../Billing/Billing.css';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('http://localhost:5002/bills/getAll'); 
        setBills(response.data); 
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };
    fetchBills();
  }, []);



  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5002/bills/delete/${id}`);
      if (response.status === 200) {
        alert('Bill deleted successfully');
        // Update the state to remove the deleted bill
        setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  

  const handleAddBill = async () => {
    try {
      const response = await axios.post('http://localhost:5002/bills/create', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const newBill = response.data;
      const { bill_number, created_at } = newBill; 
      navigate(`/billing/${bill_number}/add`);
      setBills((prevBills) => [
        ...prevBills,
        { bill_number, created_at: new Date(created_at).toLocaleString() },
      ]);

    } catch (error) {
      console.error('Error creating a new bill:', error);
    }
  };

  return (
    <>
      <div className="nav-color">
        <div className="position">
          <Link to='/navbar'>
            <b style={{ cursor: 'pointer', color: 'white' }}>Products</b>
          </Link>
          <Link to="/billing">
            <b style={{ cursor: 'pointer', color: 'white' }}>Billing</b>
          </Link>
        </div>
        <div className="bill">
          <button onClick={handleAddBill}>Add New Bill Customer</button>
          <button onClick={handleAddBill}>Add New Bill Party</button>
          <button>Restore</button>
        </div>

        <div className="tab-container">
          <Table striped bordered hover className="tabb">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Created at</th>
                <th>Bill Number</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={bill.bill_number}>
                  <td>{index + 1}</td>
                  <td>{bill.created_at}</td>
                  <td>{bill.bill_number}</td>
                  <td>
                    <Link to={`/billing/${bill.bill_number}/add`}>
                      <button>View</button> 
                    </Link>
                    <button onClick={() => deleteProduct(bill.id)}> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Billing;
