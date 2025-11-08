import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ActiveOrders from "./pages/Orders/ActiveOrders";
import AllOrders from "./pages/Orders/AllOrders";
import MenuItemAddedForm from "./pages/Menu & Products/MenuItemAddedForm";
import MenuManagement from "./pages/Menu & Products/MenuManegement"
import Menu from "./pages/Menu & Products/Menu";
import MenuOtherManagement from "./pages/Menu & Products/MenuOtherManagement";


function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ActiveOrders" element={<ActiveOrders />} />
        <Route path="/AllOrders" element={<AllOrders />} />
        <Route path="/menu/:menuListId/edit/:itemId" element={<MenuItemAddedForm />} />
        <Route path="/menu/:menuListId/add-item" element={<MenuItemAddedForm />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/menu/:menuListId" element={<Menu />} />
        <Route path="/MenuOtherManagement" element={<MenuOtherManagement/>} />
        

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
