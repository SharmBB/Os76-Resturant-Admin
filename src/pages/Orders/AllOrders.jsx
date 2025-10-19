import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./AllOrders.css";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdTime } from "react-icons/io";


function AllOrders(){

    const [order, setOrder] = useState({
    id: "00000003",
    status: "New Order",
    type: "Takeaway",
    paymentMode: "COD",
    paymentStatus: "Unpaid",
    customer: {
      name: "Amina",
      phone: "+94 774230786",
      email: "aminahajameyan123@gmail.com",
      date: "15 October 2025, 09:24 PM",
    },
    location: "Sweet drops, Maharagama - 00600, Colombo District.",
    items: [
      {
        name: "Pizza",
        qty: 1,
        price: 200.0,
      },
    ],
  });

    return(
        <DashboardLayout>
            <div className="order-details-container">
                {/* Header Section */}
             <div className="order-header">
                <h3>
                    Order Id: <span>{order.id}</span>
                </h3>

                <div className="order-actions">
                    <button className="accept-btn">
                    <FaCheckCircle /> Accept
                    </button>
                    <button className="reject-btn">
                    <MdCancel /> Reject
                    </button>
                    <button className="icon-btn">
                    <FaEdit />
                    </button>
                    <button className="icon-btn delete">
                    <FaTrash />
                    </button>
                </div>
             </div>

                {/* Order Info */}
             <div className="order-info">
                <p>
                    <strong>Order Status:</strong>{" "}
                    <span className="status-badge new">{order.status}</span>
                </p>
                <p>
                    <strong>Type:</strong>{" "}
                    <span className="type-badge takeaway">{order.type}</span>
                </p>
                <p>
                    <strong>Payment Mode:</strong>{" "}
                    <span className="payment-badge cod">{order.paymentMode}</span>
                </p>
                <p>
                    <strong>Payment Status:</strong>{" "}
                    <span className="payment-badge unpaid">{order.paymentStatus}</span>
                </p>
             </div>

                {/* Main Grid */}
             <div className="order-main">
                {/* Left side - Items & Status */}
                <div className="left-section">
                    <div className="order-card">
                    <table>
                        <thead>
                        <tr>
                            <th>Items</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.qty}x</td>
                            <td>Rs {item.price.toFixed(2)}</td>
                            <td>Rs {(item.qty * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

                    <div className="order-card">
                    <h4>Order Status</h4>
                    <div className="status-line">
                        <span className="dot green"></span>
                        <div>
                        <strong>{order.status}</strong>
                        <p>{order.customer.date}</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Right side - Customer, Location, Summary */}
                <div className="right-section">
                    <div className="order-card">
                    <div className="order-card-header">
                        <h4>{order.customer.name}</h4>
                        <FaEdit className="edit-icon" />
                    </div>
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.email}</p>
                    <p className="order-date">
                        <IoMdTime /> {order.customer.date}
                    </p>
                    </div>

                    <div className="order-card">
                    <h4>Order Location</h4>
                    <p>{order.location}</p>
                    </div>

                    <div className="order-card">
                    <h4>Order Summary</h4>
                    <div className="summary-row">
                        <span>Sub Total</span>
                        <span>Rs 200.00</span>
                    </div>
                    <div className="summary-row total">
                        <strong>Total Amount</strong>
                        <strong>Rs 200.00</strong>
                    </div>
                    </div>
                </div>
             </div>
            </div>
        </DashboardLayout>
    );
}

export default AllOrders;