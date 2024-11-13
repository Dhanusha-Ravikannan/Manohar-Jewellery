
// import React from "react";
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import Billing from "./Components/Billing/Billing";
// import AddBilling from "./Components/AddBilling/AddBilling";
// import BarcodePage from "./Components/BarcodePage/BarcodePage";


// function App() {
//   return (
//     <> 
    
//     <BrowserRouter> 
//     <Routes> 
//      <Route path="navbar" element={<Navbar/> }/>
//      <Route path="billing" element={<Billing/>}/>
//      <Route path="add" element={<AddBilling/>}/>
//      <Route path="/barcode/:sNo" element={<BarcodePage/>} />

//     </Routes>
//     </BrowserRouter>
   
//     </>
//   );
// }

// export default App;



import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Billing from "./Components/Billing/Billing";
import AddBilling from "./Components/AddBilling/AddBilling";
import BarcodePage from "./Components/BarcodePage/BarcodePage";

function App() {
  // State to store the selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="navbar"
            element={<Navbar selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />}
          />
          <Route
            path="billing"
            element={<Billing selectedProduct={selectedProduct} />}
          />
          <Route
            path="add"
            element={<AddBilling selectedProduct={selectedProduct} />}
          />
          <Route
            path="/barcode/:sNo"
            element={<BarcodePage setSelectedProduct={setSelectedProduct} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

