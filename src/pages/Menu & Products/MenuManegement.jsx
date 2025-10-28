import React, { useState } from 'react';
import './MenuManegement.css';
import DashboardLayout from '../../layouts/DashboardLayout';

function AddSubcategoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Subcategory</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label required">Category *</label>
                <select className="form-select">
                  <option>Select Category</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label required">Subcategory Name *</label>
                <input type="text" className="form-control" placeholder="Subcategory Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Subcategory Description</label>
                <textarea className="form-control" rows="3" placeholder="Subcategory Description"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Subcategory Image</label>
                <div className="upload-area">
                  <div className="upload-icon">📁</div>
                  <span className="upload-text">Upload Subcategory Image</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

function AddCategoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
                <input type="text" className="form-control" placeholder="Category Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Category Description</label>
                <textarea className="form-control" rows="3" placeholder="Category Description"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Category Image</label>
                <div className="upload-area">
                  <div className="upload-icon">📁</div>
                  <span className="upload-text">Upload Category Image</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary">Save</button>
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