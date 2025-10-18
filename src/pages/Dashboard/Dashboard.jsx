import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FaLink, FaStar, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        {/* === TOP SECTION === */}
        <div className="dashboard-top">
          {/* Store Link Card */}
          <div className="card store-link-card">
            <h3>Store Link</h3>
            <p>Share your web store’s link on social media to attract more customers.</p>
            <div className="store-link">
              <a
                href="https://sweetdrops.myfoodiv.com"
                target="_blank"
                rel="noreferrer"
              >
                https://sweetdrops.myfoodiv.com
              </a>
              <button className="copy-btn">
                <FaLink />
              </button>
            </div>
          </div>

          {/* Store Info Card */}
          <div className="card store-info-card">
            <h3>
              Sweet drops <span>(Maharagama)</span>
            </h3>
            <div className="rating">
              <span className="rating-score">5.0</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
            </div>
            <a href="#" className="ratings-link">
              See All Ratings & Reviews
            </a>
          </div>
        </div>

        {/* === STATS GRID === */}
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="icon green"><FaShoppingCart /></div>
            <p>New Orders</p>
            <h3>1</h3>
          </div>

          <div className="card stat-card">
            <div className="icon blue"><FaShoppingCart /></div>
            <p>Active Orders</p>
            <h3>1</h3>
          </div>

          <div className="card stat-card">
            <div className="icon red"><FaUsers /></div>
            <p>New Customers (Today)</p>
            <h3>0</h3>
          </div>

          <div className="card stat-card">
            <div className="icon dark"><FaShoppingCart /></div>
            <p>Total Orders</p>
            <h3>1</h3>
          </div>

          <div className="card stat-card">
            <div className="icon yellow"><FaShoppingCart /></div>
            <p>Orders (Current Month)</p>
            <h3>3</h3>
          </div>

          <div className="card stat-card">
            <div className="icon dark"><FaShoppingCart /></div>
            <p>Today’s Orders</p>
            <h3>1</h3>
          </div>

          <div className="card stat-card">
            <div className="icon purple"><FaChartLine /></div>
            <p>Total Revenue</p>
            <h3>Rs 400.00</h3>
          </div>

          <div className="card stat-card">
            <div className="icon red"><FaChartLine /></div>
            <p> Revenue (Current Month)</p>
            <h3>Rs 400.00</h3>
          </div>

          <div className="card stat-card">
            <div className="icon green"><FaChartLine /></div>
            <p> Today's Revenue (Current Month)</p>
            <h3>Rs 400.00</h3>
          </div>

          <div className="card plan-card">
            <div className="plan-status">ACTIVE PLAN</div>
            <h3>PLUS PLAN</h3>
            <p className="plan-expiry">Expires on 19 Oct 2025</p>
          </div>

          <div className="card stat-card">
            <div className="icon blue"><FaUsers /></div>
            <p>My Customers</p>
            <h3>1</h3>
          </div>
          
          <div className="card stat-card">
            <div className="icon purple"><FaUsers /></div>
            <p>Table Reservations (Today)</p>
            <h3>0</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
