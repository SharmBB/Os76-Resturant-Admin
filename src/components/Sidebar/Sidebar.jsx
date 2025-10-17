import React from "react";
import {FaTachometerAlt,FaClipboardList,FaUtensils,FaStore,FaCog,FaChartBar,FaTags,FaUsers,FaTruck,FaMoneyBillWave,FaBell,} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
         <ul className="menu">
            <li><FaTachometerAlt /> Dashboard</li>
            <li><FaUtensils /> Take Order</li>
            <li><FaClipboardList /> Reservations</li>
            <li><FaMoneyBillWave /> Orders</li>
            <li><FaStore /> Website Builder</li>
            <li><FaCog /> Website & Store Management</li>
            <li><FaTags /> Menu & Products</li>
            <li><FaClipboardList /> Order & Checkout Settings</li>
            <li><FaUsers /> Table & Dine-in</li>
            <li><FaUsers /> Customer Management (CRM)</li>
            <li><FaMoneyBillWave /> Payment & Billing</li>
            <li><FaTags /> Promotions & Marketing</li>
            <li><FaChartBar /> Reports & Analytics</li>
            <li><FaTruck /> Delivery & Logistics</li>
            <li><FaUsers /> Staff Management</li>
            <li><FaBell /> Support & Notifications</li>
            <li><FaCog /> System Settings</li>
         </ul>
    </aside>
    );
};

export default Sidebar;