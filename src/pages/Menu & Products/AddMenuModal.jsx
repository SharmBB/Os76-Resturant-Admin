import React,{useState} from "react";
import "./MenuOtherManagement.css";

function AddMenuModal({onClose}){

    const[menuName, setMenuName] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menuName.trim()) {
      alert("Please enter a menu name");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/menuLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: menuName}),
      });

      if (!response.ok) {
        throw new Error("Failed to add menu");
      }

      const data = await response.json();
      console.log("Menu added successfully:", data);

      alert("Menu added successfully!");
      setMenuName("");
      onClose(); // close modal
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Something went wrong while adding the menu.");
    } finally {
      setLoading(false);
    }
  };


    return(
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Menu</h5>
                    <button type="button" className="close-btn" onClick={onClose}>
                    ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-body">
                    <div className="form-group">
                        <label>
                        Menu Name <small className="text-danger">*</small>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        />
                    </div>
                    </div>

                    <div className="modal-footer">
                    <button
                        type="button"
                        className="btn cancel-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn add-btn" disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default AddMenuModal;