import React,{ useState } from 'react'
import '../Restore/Restore.css'
import Navbarr from '../Navbarr/Navbarr'
import axios from "axios";
import BarcodeReader from "react-barcode-reader";
import { useParams } from "react-router-dom";
import { REACT_APP_BACKEND_SERVER_URL } from "../../config";


const Restore = () => {


    const [scannedProducts, setScannedProducts] = useState([]);
    const { bill_number, bill_type } = useParams();


    const handleScan = async (product_number) => {
        try {
          const response = await axios.get(
            `${REACT_APP_BACKEND_SERVER_URL}/api/v1/products/getSerial/${bill_number}/${product_number}/${bill_type}`
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
    
  return (
    <> 
    <div className='background'> 
     <Navbarr />
     <BarcodeReader onScan={handleScan} />

     </div>

    </>
  )
}

export default Restore