// MenuItemAddedForm.js
import React, { useState } from 'react';
import './MenuItemAddedForm.css'; 
import DashboardLayout from '../../layouts/DashboardLayout';

function MenuItemAddedForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    type: 'Veg', 
    productCode: '',
    description: '',
  });

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      variantName: '',
      price: '',
      comparePrice: '',
      track: false
    }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value)
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
      price: '',
      comparePrice: '',
      track: false
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (id, field, value) => {
    setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: typeof value === 'boolean' ? value : value } : v));
  };

  const removeVariant = (id) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  const handleHowItWorks = () => {
    // Handle "How it works" modal or info
    console.log('How it works clicked');
  };

  return (
    <DashboardLayout>

     
      <div className="app">

        <div className="shared-header">
          <h2>&lt; Add Menu Item</h2>
          <h3>Add Variant</h3>
        </div>

       
        <div className="main-container">
          <div className="left-panel">
            <form onSubmit={handleSubmit}>
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

                <button type="submit" className="save-btn">Save</button>
              </div>
            </form>
          </div>

          <div className="right-panel">
            <div className="variants-container">
              {variants.map((variant) => (
                <div key={variant.id} className="variant-item">
                  <div className="form-group">
                    <label>Variant Name *</label>
                    <input
                      type="text"
                      value={variant.variantName}
                      onChange={(e) => updateVariant(variant.id, 'variantName', e.target.value)}
                      placeholder="Enter variant name"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price *</label>
                      <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => updateVariant(variant.id, 'price', e.target.value)}
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Compare At Price</label>
                      <input
                        type="number"
                        value={variant.comparePrice}
                        onChange={(e) => updateVariant(variant.id, 'comparePrice', e.target.value)}
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={variant.track}
                        onChange={(e) => updateVariant(variant.id, 'track', e.target.checked)}
                      />
                      Track Variant
                    </label>
                  </div>

                  {variants.length > 1 && (
                    <button type="button" className="remove-variant-btn" onClick={() => removeVariant(variant.id)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button type="button" className="add-more-btn" onClick={addVariant}>
                + Add more
              </button>

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
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MenuItemAddedForm;