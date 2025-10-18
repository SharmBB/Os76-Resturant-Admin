// MenuItemAddedForm.js
import React, { useState } from 'react';
import './MenuItemAddedForm.css'; 

function MenuItemAddedForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    comparePrice: '',
    type: 'Veg', 
    productCode: '',
    description: '',
    trackInventory: false
  });

  const [variants, setVariants] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, variants });
    // Handle form submission here
  };

  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      variantName: '',
      variantPrice: '',
      variantOptions: ''
    };
    setVariants(prev => [...prev, newVariant]);
    setIsExpanded(true); // Expand on adding variant
  };

  const updateVariant = (id, field, value) => {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVariant = (id) => {
    setVariants(prev => prev.filter(v => v.id !== id));
    if (variants.length === 1) {
      setIsExpanded(false); // Collapse if no variants left
    }
  };

  return (
    <div className="app">
      <div className="main-container">

        <form onSubmit={handleSubmit} className="add-menu-form">
                   <div className="form-header">
            <h2>&lt; Add Menu Item</h2>
          </div>
        
          <div className="form-body">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select item Category</option>
                <option value="appetizers">Appetizers</option>
                <option value="mains">Mains</option>
                <option value="desserts">Desserts</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">Select item Subcategory</option>
                  <option value="sub1">Subcategory 1</option>
                  <option value="sub2">Subcategory 2</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            
            </div>

            <div className="form-group">
              <label>Enter Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Compare-At Price (optional)</label>
              <input
                type="number"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="Enter Price"
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Veg"
                    checked={formData.type === 'Veg'}
                    onChange={handleChange}
                  />
                  Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="Non-veg"
                    checked={formData.type === 'Non-veg'}
                    onChange={handleChange}
                  />
                  Non-veg
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Product Code (optional)</label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                placeholder="Enter product code"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe Product Details"
                rows="4"
              />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="trackInventory"
                  checked={formData.trackInventory}
                  onChange={handleChange}
                />
                Track Inventory
              </label>
            </div>

            <button type="submit" className="submit-btn">Add Item</button>
          </div>
        </form>

        <div className={`add-variant-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="variant-header">
            <h3>Add Variant</h3>
            {!isExpanded && (
              <button type="button" className="add-more-btn collapsed-btn" onClick={addVariant}>
                Add more
              </button>
            )}
          </div>

            <div className="upload-image">
                <label htmlFor="image-upload">📎</label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => console.log('Image uploaded:', e.target.files[0])}
                />
                <span>Upload item image</span>
              </div>

          {isExpanded && (
            <>
              <div className="variants-list">
                {variants.map((variant) => (
                  <div key={variant.id} className="variant-item">
                    <div className="form-group">
                      <label>Variant Name</label>
                      <input
                        type="text"
                        value={variant.variantName}
                        onChange={(e) => updateVariant(variant.id, 'variantName', e.target.value)}
                        placeholder="Enter variant name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Variant Price</label>
                      <input
                        type="number"
                        value={variant.variantPrice}
                        onChange={(e) => updateVariant(variant.id, 'variantPrice', e.target.value)}
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="form-group">
                      <label>Variant Options</label>
                      <input
                        type="text"
                        value={variant.variantOptions}
                        onChange={(e) => updateVariant(variant.id, 'variantOptions', e.target.value)}
                        placeholder="e.g., Size: Small, Medium, Large"
                      />
                    </div>
                    <button type="button" className="remove-variant-btn" onClick={() => removeVariant(variant.id)}>Remove</button>
                  </div>
                ))}
              </div>
              <button type="button" className="add-more-btn" onClick={addVariant}>Add more</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItemAddedForm;