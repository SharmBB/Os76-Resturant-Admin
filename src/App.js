import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
