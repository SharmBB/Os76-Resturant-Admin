import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import './Menu.css';
import { useNavigate, useParams  } from 'react-router-dom';

function Menu() {

  const { menuListId } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [menuName, setMenuName] = useState("");
 
  //Fetch menu items from backend
  useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/menuLists/${menuListId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const menuData = json.data;
      setMenuName(menuData.name); // display menu name
      setMenuItems(menuData.menu_items ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchMenuItems();
}, [menuListId]);


  // Toggle visibility
  const handleToggle = async (itemId, currentValue) => {
  const newValue = !currentValue;

    // Update locally for smooth UI
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, is_visible: newValue } : item
      )
    );

    // Optional: Update backend
    try {
      await fetch(`http://127.0.0.1:8000/api/menu-items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_visible: newValue }),
      });
    } catch (err) {
      console.error("Failed to update visibility:", err);
    }
  };

  //search bar
  const [searchTerm, setSearchTerm] = useState("");

  // Filter menu items based on search input
  const filteredItems = menuItems.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const navigate = useNavigate();

  if (loading) return <div>Loading menu items...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <DashboardLayout>
      <div className="menu-container">
        {/* Info bubble */}
        <div className="info-bubble1">
          <span className="bubble-number">i</span>
          <a href="#" className="how-it-works">How it works!</a>
        </div>

        {/* Title and Add Button */}
        <div className="title-section">
          <h1 className="menu-title">{menuName}</h1>
          <button className="add-button" onClick={() => navigate(`/menu/${menuListId}/add-item`)}>+ Add Menu Item</button>
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Menu Item Card */}
        {/* Loading / Error / Items */}
        {loading ? (
          <p>Loading menu items...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div className="menu-item-card" key={item.id} onClick={() => navigate(`/menu/${menuListId}/edit/${item.id}`, { state: { item } })} //Pass data
            style={{ cursor: "pointer" }}>
      <div className="item-content">
        <div className="item-details">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-description">{item.description || "No description"}</p>
          <p className="item-price">Rs {item.price}</p>
        </div>

        {/* Visibility Toggle */}
        <div
          className={`toggle-switch ${item.is_visible ? "on" : "off"}`}
          onClick={(e) => {
            e.stopPropagation(); //Prevent navigation when toggle is clicked
            handleToggle(item.id, item.is_visible);
          }}
        >
          <div className="toggle-knob"></div>
        </div>
      </div>
    </div>
          ))
        )}

      </div>
    </DashboardLayout>
  );
}

export default Menu;