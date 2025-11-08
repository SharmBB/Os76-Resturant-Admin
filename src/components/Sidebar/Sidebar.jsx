import React from "react";
import { useState } from "react";
import {FaTachometerAlt,FaClipboardList,FaUtensils,FaStore,FaCog,FaChartBar,FaTags,FaUsers,FaTruck,FaMoneyBillWave,FaBell,FaChevronDown,FaChevronRight} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    
    const location = useLocation();

    const [openMenu, setOpenMenu] = useState({
    orders: false,
    menuproducts: false,
    reservations: false,
    management: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };


    return (
        <aside className="sidebar">
         <ul className="menu">

            <li>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                    <FaTachometerAlt /> Dashboard
                </Link>
            </li>

            <li><FaUtensils /> Take Order</li>

            <li><FaClipboardList /> Reservations</li>

            <li onClick={() => toggleMenu("orders")} className="submenu-toggle">
                <div className="menu-item-left">
                    <FaMoneyBillWave /> <span>Orders</span>
                </div>
                <div className="menu-item-right">
                    {openMenu.orders ? <FaChevronDown /> : <FaChevronRight />}
                </div>
            </li>

            {openMenu.orders && (
            <ul className="submenu">
                <li>
                <Link
                    to="/ActiveOrders"
                    className={location.pathname === "/ActiveOrders" ? "active" : ""}
                >
                    Active Orders
                </Link>
                </li>
                <li>
                <Link
                    to="/AllOrders"
                    className={location.pathname === "/AllOrders" ? "active" : ""}
                >
                    All Orders
                </Link>
                </li>
            </ul>
            )}

            <li><FaStore /> Website Builder</li>
            <li><FaCog /> Website & Store Management</li>
            
            {/* Menu & Products */}

            <li onClick={() => toggleMenu("menuproducts")} className="submenu-toggle">
                <div className="menu-item-left">
                    <FaTags /> <span>Menu & Products</span>
                </div>
                <div className="menu-item-right">
                    {openMenu.menuproducts ? <FaChevronDown /> : <FaChevronRight />}
                </div>
            </li>
            {openMenu.menuproducts && (
            <ul className="submenu">
                <li>
                <Link
                    to="/menu/1"
                    className={location.pathname.startsWith("/menu") ? "active" : ""}
                >
                    Menu
                </Link>
                </li>
                <li>
                <Link
                    to="/menu-management"
                    className={location.pathname === "/menu-management" ? "active" : ""}
                >
                    Categories
                </Link>
                </li>
                <li>
                <Link
                    to="/pathname"
                    className={location.pathname === "/pathname" ? "active" : ""}
                >
                    Bulk Import
                </Link>
                </li>
                <li>
                <Link
                    to="/MenuOtherManagement"
                    className={location.pathname === "/MenuOtherManagement" ? "active" : ""}
                >
                    Menu Management
                </Link>
                </li>
                <li>
                <Link
                    to="/pathname"
                    className={location.pathname === "/pathname" ? "active" : ""}
                >
                    Inventory Management
                </Link>
                </li>
            </ul>
            )}

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