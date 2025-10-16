import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSearch  } from "react-icons/fa";
import "./Header.css";

const Header = ({ toggleSidebar }) => {

  const [isOnline, setIsOnline] = useState(true);

  const toggleStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <header className="header">
      <div className="header-left">
        
        <div className="logo">foodiv</div>
        
        <div className="trial-banner">
            Trial Period of the <strong>PLUS PLAN</strong> will expire in <strong>4 day(s)</strong>
          <button className="choose-btn">Choose Plan</button>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>


        <div className="online-toggle" onClick={toggleStatus}>
            <span className="status-text">
            {isOnline ? "Online" : "Offline"}
            </span>
            <div className={`toggle-switch ${isOnline ? "active" : ""}`}>
            <div className="toggle-circle"></div>
          </div>
        </div>

        <FaBell className="icon" />

        <select className="language-select">
            <option>English</option>
            <option>Sinhala</option>
            <option>Tamil</option>
        </select>

        <div className="user-profile">
          <FaUserCircle className="user-icon" />
          <span>Sweet drops</span>
        </div>
      </div>
    </header>
  );
};

export default Header;