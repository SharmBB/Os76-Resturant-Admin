import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import ActiveOrders from "./pages/Orders/ActiveOrders";
import AllOrders from "./pages/Orders/AllOrders";
import MenuItemAddedForm from "./pages/Menu & Products/MenuItemAddedForm";
import MenuManagement from "./pages/Menu & Products/MenuManegement"
import Menu from "./pages/Menu & Products/Menu";


function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ActiveOrders" element={<ActiveOrders />} />
        <Route path="/AllOrders" element={<AllOrders />} />
        <Route path="/menu-item-added" element={<MenuItemAddedForm />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/menu" element={<Menu />} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
