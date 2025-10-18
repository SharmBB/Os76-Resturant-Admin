import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import MenuItemAddedForm from "./pages/Menu & Products/MenuItemAddedForm";

function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-menu-item" element={<MenuItemAddedForm />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
