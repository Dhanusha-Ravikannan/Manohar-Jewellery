
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";




function App() {
  return (
    <> 
    <BrowserRouter> 
    <Routes> 
     <Route path="navbar" element={<Navbar/> }/>
      

      

    </Routes>
    </BrowserRouter>
    

    </>
  );
}

export default App;
