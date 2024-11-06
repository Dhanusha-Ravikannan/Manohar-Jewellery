
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Billing from "./Components/Billing/Billing";
import AddBilling from "./Components/AddBilling/AddBilling";
import BarcodePage from "./Components/BarcodePage/BarcodePage";

function App() {
  return (
    <> 
    <BrowserRouter> 
    <Routes> 
     <Route path="navbar" element={<Navbar/> }/>
     <Route path="billing" element={<Billing/>}/>
     <Route path="add" element={<AddBilling/>}/>
     <Route path="/barcode/:sNo" element={<BarcodePage/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
