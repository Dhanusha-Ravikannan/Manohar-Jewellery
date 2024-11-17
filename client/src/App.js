
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Billing from './Components/Billing/Billing'
import AddBilling from "./Components/AddBilling/AddBilling";
import BarcodePage from "./Components/BarcodePage/BarcodePage";
import Home from "./Components/Home/Home";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [lotNumber, setLotNumber] = useState(""); 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/navbar/:lot_id"
          element={ <Navbar setSelectedProduct={setSelectedProduct} setLotNumber={setLotNumber} />}/>
        <Route path="/billing" element={<Billing />} />
        <Route path="/billing/:bill_number/add"  
        element={<AddBilling selectedProduct={selectedProduct} lotNumber={lotNumber} /> } />
        <Route path="/" element={<Home />} />
        <Route path="/barcode/:sNo" element={<BarcodePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
