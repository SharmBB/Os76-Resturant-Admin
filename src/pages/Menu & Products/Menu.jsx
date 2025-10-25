import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import './Menu.css';

function Menu() {
  return (
    <DashboardLayout>
      <div className="menu-container">
        {/* Info bubble */}
        <div className="info-bubble">
          <span className="bubble-number">1</span>
          <a href="#" className="how-it-works">How it works!</a>
        </div>

        {/* Title and Add Button */}
        <div className="title-section">
          <h1 className="menu-title">Standard Menu</h1>
          <button className="add-button">+ Add Menu Item</button>
        </div>

        {/* Home Made Toggle */}
        <div className="toggle-section">
          <label className="toggle-label">home made</label>
          <div className="toggle-switch on">
            <div className="toggle-knob"></div>
          </div>
        </div>

        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search Product Name, Description or Price" 
          className="search-input" 
        />

        {/* Menu Item Card */}
        <div className="menu-item-card">
          <div className="item-content">
            <div className="item-details">
              <h3 className="item-name">Pizza ★ 1</h3>
              <p className="item-price">Rs 200.00</p>
            </div>
            <div className="toggle-switch off">
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Menu;