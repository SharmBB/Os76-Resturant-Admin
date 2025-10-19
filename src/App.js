import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import ActiveOrders from "./pages/Orders/ActiveOrders";
import AllOrders from "./pages/Orders/AllOrders";
import MenuItemAddedForm from "./pages/Menu & Products/MenuItemAddedForm";


function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ActiveOrders" element={<ActiveOrders />} />
        <Route path="/AllOrders" element={<AllOrders />} />
        <Route path="/menu-item-added" element={<MenuItemAddedForm />} />
    
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
