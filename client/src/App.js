
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Billing from "./Components/Billing/Billing";
import AddBilling from "./Components/AddBilling/AddBilling";
import BarcodePage from "./Components/BarcodePage/BarcodePage";
import Home from "./Components/Home/Home";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="navbar"
          element={<Navbar setSelectedProduct={setSelectedProduct} />}
        />
        <Route path="/billing" element={<Billing />} />
        <Route path="/billing/:bill_number/add" element={<AddBilling />} />

        <Route path="/" element={<Home />} />
        <Route path="/Navbar/:lot_id" element={<Navbar />} />
        <Route path="/barcode/:sNo" element={<BarcodePage />} />
        <Route
          path="add"
          element={<AddBilling selectedProduct={selectedProduct} />}
        />
      </Routes>
    </BrowserRouter>

     
    </>
  );
}

export default App;
