import React, { useEffect, useState } from 'react';
import './MenuManegement.css';
import DashboardLayout from '../../layouts/DashboardLayout';

function AddSubcategoryModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    img: null,
  });

  //load categories
  const [categories, setCategories] =  useState([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState(null);

  ////load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      setCatsError(null);

      try{
        const res = await fetch ("http://127.0.0.1:8000/api/categories");
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json.data ?? [])
        setCategories(data);
      }
      catch(err){
        setCatsError(err.message || "Failed to load categories");
      }
      finally{
        setLoadingCats(false);
      }
    };
    loadCategories();
  },[]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //create subcategiries
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category_id", formData.category_id);
      if (formData.img) data.append("img", formData.img);

      const res = await fetch("http://127.0.0.1:8000/api/subcategories", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save subcategory");

      alert("Subcategory created successfully!");
      setFormData({
        category_id: "",
        name: "",
        description: "",
        img: null,
      });
      onClose();
    } 
    catch(err)
    {
      alert("Error: " + err.message);
    }
  };


  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Add Subcategory</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Category dropdown */}
              <div className="mb-3">
                <label className="form-label required">Category *</label>
                {loadingCats ? (
                  <div>Loading categories...</div>
                ) : catsError ? (
                  <div style={{ color: "red" }}>Error: {catsError}</div>
                ) : (
                  <select
                    className="form-select"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Subcategory Name */}
              <div className="mb-3">
                <label className="form-label required">Subcategory Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Subcategory Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Subcategory Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Subcategory Description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Upload Subcategory Image</label>
                <input
                  type="file"
                  name="img"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                />
                {formData.img && (
                  <p className="mt-2 text-muted">
                    Selected: {formData.img.name}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}


function AddCategoryModal({ isOpen, onClose, onCategoryAdded  }) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      setFormData((prev) => ({ ...prev, img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handle form submit
  const handleSubmit = async () => {
    if(!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try{
      const fd = new FormData();
      fd.append("name", formData.name);
      if (formData.description) fd.append("description", formData.description);
      if (formData.img) fd.append("img", formData.img);

      const res = await fetch("http://127.0.0.1:8000/api/categories", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create category");

      alert("Category created successfully!");
      setFormData({ name: "", description: "", img: null });
      onClose();

      if (onCategoryAdded) onCategoryAdded(data.data);
    }
    catch(err){
      console.error(err);
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label required">Category Name *</label>
                <input type="text" name='name' className="form-control" placeholder="Category Name" value={formData.name} onChange={handleChange} required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Category Description</label>
                <textarea name='description' className="form-control" rows="3" placeholder="Category Description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Category Image</label>
                <input
                  type="file"
                  name="img"
                  className="form-control"
                  accept="image/*"
                  onChange={handleChange}
                />
                {formData.img && (
                  <p className="mt-2 text-muted">
                    Selected: {formData.img.name}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

function MenuManagement() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);

  const openCategoryModal = () => setShowCategoryModal(true);
  const openSubcategoryModal = () => setShowSubcategoryModal(true);
  const closeCategoryModal = () => setShowCategoryModal(false);
  const closeSubcategoryModal = () => setShowSubcategoryModal(false);

  return (
    <DashboardLayout>
      <div className="menu-management">
        <div className="header">
          <h2 className="title">Categories</h2>
          <div className="header-actions">
            <span className="info-bubble">!</span>
            <span className="how-it-works">How it works!</span>
          </div>
        </div>
        <p className="description">
          Drag &amp; Drop the category to change its order
        </p>
        <div className="buttons-container">
          <button className="btn" onClick={openCategoryModal}>+ Category</button>
          <button className="btn" onClick={openSubcategoryModal}>+ Subcategory</button>
        </div>
        <div className="category-item">
          <span className="category-name">home made</span>
        </div>
        <AddCategoryModal isOpen={showCategoryModal} onClose={closeCategoryModal} />
        <AddSubcategoryModal isOpen={showSubcategoryModal} onClose={closeSubcategoryModal} />
      </div>
    </DashboardLayout>
  );
}

export default MenuManagement;