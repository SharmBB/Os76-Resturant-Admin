import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./ActiveOrders.css";
import { FaClock } from "react-icons/fa";


function ActiveOrders(){

    const [orderType, setOrderType] = useState("Takeaway");
    const [activeTab, setActiveTab] = useState("New Order");

    return(
        <DashboardLayout>
            <div className="active-orders-page">
                {/* Order Type Tabs */}
                <div className="order-type-tabs">
                {["Takeaway", "Delivery", "Table/Room", "Dine In"].map((type) => (
                    <button
                    key={type}
                    className={`order-type-btn ${orderType === type ? "active" : ""}`}
                    onClick={() => setOrderType(type)}
                    >
                    {type}
                    </button>
                ))}
                </div>

                {/* Status Tabs */}
                <div className="order-status-tabs">
                {[
                    "New Order",
                    "Confirmed",
                    "Preparing",
                    "Ready for pickup",
                    "Order Completed",
                    "Cancelled",
                ].map((tab) => (
                    <button
                    key={tab}
                    className={`status-tab ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    >
                    {tab}
                    </button>
                ))}
                </div>

                <div className="view-preorders">
                    <a href="#">View Pre-Orders</a>
                    <span className="filter-icon">⚙️</span>
                </div>

                {/* Orders List */}
                <div className="orders-container">
                    <div className="order-card">
                        <div className="order-header1">
                        <span className="order-id">Order Id: 00000003</span>
                        <div className="badges">
                            <span className="badge unpaid">Unpaid</span>
                            <span className="badge takeaway">Takeaway</span>
                        </div>
                        </div>

                        <div className="order-body">
                        <h4 className="customer-name">Amina</h4>
                        <p className="order-time">
                            <FaClock /> 15 October 2025, 09:24 PM
                        </p>
                        <div className="order-items">
                            <p>
                            <span>1×</span> Pizza
                            </p>
                        </div>
                        <div className="order-total">Rs 200.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );

}

export default ActiveOrders;