import React, {useEffect, useState} from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import './MenuOtherManagement.css';
import AddMenuModal from "./AddMenuModal";
import { useNavigate } from "react-router-dom";

function MenuOtherManagement(){

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);//modal
    const handleOpenModal = () => setShowModal(true);//modal
    const handleCloseModal = () => setShowModal(false);//modal

    //Fetach menu management list form backend
    const [menuManagementItems, setMenuManagementItems] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuManagementItems = async () => {
            try{
                const res = await fetch("http://127.0.0.1:8000/api/menuLists");
                if(!res.ok) throw new Error (`HTTP ${res.status}`);
                const json = await res.json();
                const data = Array.isArray(json) ? json : (json.data ?? []);
                setMenuManagementItems(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchMenuManagementItems();
    }, []);

    return(
        <DashboardLayout>
            <div className="menu-management-container">
              <div className="menu-management-header">
                <h2>Menu Management</h2>
                <button
                  className="add-menu-link"
                  id="new_menu_modal_btn"
                  onClick={handleOpenModal}
                >
                  Add New Menu
                </button>
              </div>

        {/* Loading / Error / Empty States */}
        {loading ? (
          <p>Loading Menu Management Items...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : menuManagementItems.length === 0 ? (
          <p>No Items Found.</p>
        ) : (
          <div className="menu-card-wrapper">
            {menuManagementItems.map((item) => (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-header">
                  <div>
                    <h3>{item.name}</h3>

                    <button
                      className="edit_btn"
                      onClick={() => navigate(`/menu/${item.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#68CF29"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
                      </svg>
                    </button>

                    <p className="item-count">
                      {item.menu_items?.length || 0} Item
                      {item.menu_items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {item.menu_items && item.menu_items.length > 0 && (
                  <div className="menu-item">
                    <p>{item.menu_items[0]?.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal for adding a new menu */}
        {showModal && <AddMenuModal onClose={handleCloseModal} />}
      </div>
        </DashboardLayout>
    );
}

export default MenuOtherManagement