import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {


  return (

    <div className="dashboard-layout">
      <Header />
      <div className="body">
        <Sidebar />
        <main className="content">{children}</main>
      </div>
    </div>
    
  );
};

export default DashboardLayout;
