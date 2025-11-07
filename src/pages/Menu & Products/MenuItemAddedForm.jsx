import React, { useEffect, useState } from 'react';
import './MenuItemAddedForm.css'; 
import DashboardLayout from '../../layouts/DashboardLayout';
import { useLocation, useNavigate } from "react-router-dom";

function MenuItemAddedForm() {

  const navigate = useNavigate();
  const location = useLocation(); 
  const itemData = location.state?.item; 

  const [formData, setFormData] = useState({
    name: '',
    is_visible: 1,
    menuItem_img: '',
    category_id: '',
    subcategory_id: '',
    price: '',
    compare_at_price: '',
    type: '', 
    product_code: '',
    description: '',
    track_inventory_enabled: false,
    menu_list_id: '',
  });

  // Load editing data
  useEffect(() => {
    if (itemData) {
      setFormData({
        name: itemData.name || '',
        is_visible: itemData.is_visible || 1,
        menuItem_img: itemData.menuItem_img || '',
        category_id: itemData.category_id || '',
        subcategory_id: itemData.subcategory_id || '',
        price: itemData.price || '',
        compare_at_price: itemData.compare_at_price || '',
        type: itemData.type || '',
        product_code: itemData.product_code || '',
        description: itemData.description || '',
        track_inventory_enabled: itemData.track_inventory_enabled || false,
        menu_list_id: itemData.menu_list_id || '',
      });
      setCreatedMenuItemId(itemData.id);
    }
  }, [itemData]);

  // Categories
  const [categories, setCategories] = useState([]); 
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState(null);

  // Subcategories
  const [subcategories, setSubCategories] = useState([]); 
  const [loadingsubCats, setLoadingsubCats] = useState(false);
  const [subcatsError, setsubCatsError] = useState(null);

  // Variants data
  const [variants, setVariants] = useState([]);

  const [preview, setPreview] = useState(null);
  const [trackVariant, setTrackVariant] = useState(false);
  const [createdMenuItemId, setCreatedMenuItemId] = useState(null);

  // Modal states
  const [currentVariantId, setCurrentVariantId] = useState(null);
  const [currentModalStep, setCurrentModalStep] = useState(0); // 0: Track Inventory, 1: Continue Selling, 2: SKU
  const [showModal, setShowModal] = useState(false);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      setCatsError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json.data ?? []);
        setCategories(data);
      } catch (err) {
        setCatsError(err.message || "Failed to load categories");
      } finally {
        setLoadingCats(false);
      }
    };
    loadCategories();
  }, []);

  // Load subcategories
  useEffect(() => {
    const loadsubCategories = async () => {
      setLoadingsubCats(true);
      setsubCatsError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/subcategories");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json.data ?? []);
        setSubCategories(data);
      } catch (err) {
        setsubCatsError(err.message || "Failed to load subCategories");
      } finally {
        setLoadingsubCats(false);
      }
    };
    loadsubCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value)
    }));
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, menuItem_img: file }));
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  // Update a specific variant field
  const updateVariant = (variantId, field, value) => {
    setVariants(prev => prev.map(v => 
      v.id === variantId ? { ...v, [field]: value } : v
    ));
  };

  // Handle image change per variant
  const handleImageChange = (variantId, e) => { 
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      updateVariant(variantId, 'image', file);
      updateVariant(variantId, 'previewUrl', previewURL);
    }
  };

  // Remove a variant
  const removeVariant = (variantId) => {
    setVariants(prev => prev.filter(v => v.id !== variantId));
  };

  // Add another empty variant
  const addVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        id: Date.now(),
        variantName: '',
        price: '',
        comparePrice: '',
        track: false,
        image: null,
        previewUrl: null,
        continueSellingWhenOutOfStock: false,
        outOfStockQty: 0,
        hasSKU: false,
        sku: ''
      }
    ]);

    if (!trackVariant) {
      setTrackVariant(true);
    }
  };

  // Open modal for inventory setup
  const openInventoryModal = (variantId) => {
    setCurrentVariantId(variantId);
    setCurrentModalStep(0);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentVariantId(null);
    setCurrentModalStep(0);
  };

  // Next step in modal
  const nextModalStep = () => {
    if (currentModalStep < 2) {
      setCurrentModalStep(currentModalStep + 1);
    } else {
      closeModal();
    }
  };

  // Previous step
  const prevModalStep = () => {
    if (currentModalStep > 0) {
      setCurrentModalStep(currentModalStep - 1);
    }
  };

  // Handle track inventory change
  const handleTrackInventoryChange = (variantId, checked) => {
    updateVariant(variantId, 'track', checked);
    if (checked) {
      openInventoryModal(variantId);
    }
  };

  // Submit variants
  const submitVariant = async () => {
    if (!createdMenuItemId) {
      alert("Please save the main menu item first.");
      return;
    }

    try {
      for (const variant of variants) {
        if (!variant.variantName.trim()) {
          alert("Please fill variant name for all variants");
          return;
        }
        const url = `http://127.0.0.1:8000/api/menu-items/${createdMenuItemId}/variants`;
        const body = new FormData();
        body.append("name", variant.variantName);
        body.append("price", variant.price || "");
        body.append("compare_at_price", variant.comparePrice || "");
        body.append("track_inventory_enabled", variant.track ? 1 : 0);
        body.append("continue_selling_when_out_of_stock", variant.continueSellingWhenOutOfStock ? 1 : 0);
        body.append("out_of_stock_quantity", variant.outOfStockQty || 0);
        body.append("has_sku", variant.hasSKU ? 1 : 0);
        body.append("sku", variant.sku || "");
        if (variant.image instanceof File) {
          body.append("image", variant.image);
        }

        const res = await fetch(url, { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to save variant");
      }

      alert("Variants submitted successfully");
      setVariants([]);
    } catch (err) {
      console.error("Variant submit error:", err);
      alert(err.message || "Failed to submit variants");
    }
  };

  // Submit main menu item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!itemData;
    const url = isEdit
      ? `http://127.0.0.1:8000/api/menu-items/${itemData.id}`
      : "http://127.0.0.1:8000/api/menu-items";

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("is_visible", formData.is_visible ? 1 : 0);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("subcategory_id", formData.subcategory_id || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("compare_at_price", formData.compare_at_price || "");
      formDataToSend.append("type", formData.type);
      formDataToSend.append("product_code", formData.product_code || "");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("track_inventory_enabled", formData.track_inventory_enabled ? 1 : 0);
      formDataToSend.append("outlet_id", 1);

      if (formData.menuItem_img instanceof File) {
        formDataToSend.append("menuItem_img", formData.menuItem_img);
      }
      if (isEdit) {
        formDataToSend.append("_method", "PUT");
      }

      const res = await fetch(url, { method: "POST", body: formDataToSend });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save menu item");

      setCreatedMenuItemId(data.data?.id || data.id || itemData?.id);

      alert(isEdit
        ? "Menu item updated successfully!"
        : "Menu item added successfully! Now add variants."
      );

      if (!isEdit) {
        setFormData({
          name: "", is_visible: 1, menuItem_img: "", category_id: "",
          subcategory_id: "", price: "", compare_at_price: "",
          type: "", product_code: "", description: "",
          track_inventory_enabled: false, menu_list_id: "",
        });
        setPreview(null);
      }

      // Comment out navigate to stay for variants
      // navigate("/menu", { state: { refresh: true } });
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.message);
    }
  };

  // Modal content based on step
  const renderModalContent = () => {
    const variant = variants.find(v => v.id === currentVariantId);
    if (!variant) return null;

    switch (currentModalStep) {
      case 0: // Track Inventory
        return (
          <div>
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox"
                  checked={variant.track}
                  onChange={(e) => {
                    updateVariant(currentVariantId, 'track', e.target.checked);
                    if (!e.target.checked) closeModal();
                  }} 
                />
                Track Inventory
              </label>
            </div>
          </div>
        );
      case 1: // Continue Selling
        return (
          <div>
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox"
                  checked={variant.continueSellingWhenOutOfStock}
                  onChange={(e) => updateVariant(currentVariantId, 'continueSellingWhenOutOfStock', e.target.checked)}
                />
                Continue selling when out of stock
              </label>
            </div>
            {variant.continueSellingWhenOutOfStock && (
              <div className="form-group">
                <label>Quantity</label>
                <input 
                  type="number" 
                  value={variant.outOfStockQty} 
                  onChange={(e) => updateVariant(currentVariantId, 'outOfStockQty', parseInt(e.target.value) || 0)} 
                  min="0" 
                  step="1"
                />
              </div>
            )}
          </div>
        );
      case 2: // SKU
        return (
          <div>
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox"
                  checked={variant.hasSKU}
                  onChange={(e) => updateVariant(currentVariantId, 'hasSKU', e.target.checked)}
                />
                This product has SKU
              </label>
            </div>
            {variant.hasSKU && (
              <div className="form-group">
                <label>SKU ID</label>
                <input 
                  type="text" 
                  value={variant.sku} 
                  onChange={(e) => updateVariant(currentVariantId, 'sku', e.target.value)} 
                  placeholder="Enter SKU ID"
                />
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Modal title based on step
  const getModalTitle = () => {
    switch (currentModalStep) {
      case 0: return 'Track Inventory';
      case 1: return 'Continue selling when out of stock';
      case 2: return 'This product has SKU';
      default: return '';
    }
  };

  return (
    <DashboardLayout>
      <div className="app">
        <div className="shared-header">
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
          >
          <h2>  &lt;  Add Menu Item</h2>
          </button>
          <h2>{trackVariant ? ' Add Variant ' : 'Add Menu Item'}</h2>
        </div>

        <div className="main-container">
          <div className="left-panel">
            <form onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  {loadingCats ? (
                    <div>Loading categories</div>
                  ) : catsError ? (
                    <div style={{ color: "red" }}>Error: {catsError}</div>
                  ) : (
                    <select name='category_id' value={formData.category_id} onChange={handleChange} required>
                      <option value="">Select item Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="form-group">
                  <label>Sub Category *</label>
                  {loadingsubCats ? (
                    <div>Loading subcategories</div>
                  ) : subcatsError ? (
                    <div style={{ color: "red" }}>Error: {subcatsError}</div>
                  ) : (
                    <select name='subcategory_id' value={formData.subcategory_id} onChange={handleChange} required>
                      <option value="">Select SubCategory</option>
                      {subcategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                {!trackVariant && (
                  <>
                    <div className="form-group">
                      <label>Price *</label>
                      <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" min="0"/>
                    </div>

                    <div className="form-group">
                      <label>Compare-At Price (optional)</label>
                      <input type="number" name="compare_at_price" value={formData.compare_at_price} onChange={handleChange} placeholder="Enter Price" step="0.01" min="0"/>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Type</label>
                  <label><input type="radio" name="type" value="Veg" checked={formData.type === 'Veg'} onChange={handleChange}/> Veg</label>
                  <label><input type="radio" name="type" value="Non_veg" checked={formData.type === 'Non_veg'} onChange={handleChange}/> Non-veg</label>
                </div>

                <div className="form-group">
                  <label>Product Code</label>
                  <input type="text" name="product_code" value={formData.product_code} onChange={handleChange}/>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" checked={trackVariant} onChange={(e) => setTrackVariant(e.target.checked)} />
                    Track Variant
                  </label>
                </div>

                <button type="submit" className="save-btn">Save Menu Item</button>
              </div>
            </form>
          </div>

          <div className="right-panel">
            {!trackVariant ? (
              <div>
                <div className='my-button'>
                  <button type="button" className="add-more-btn" onClick={addVariant}>
                    + Add More
                  </button>
                </div>

                <div className="upload-image">
                  <label htmlFor="image-upload-main">📎</label>
                  <input
                    type="file"
                    id="image-upload-main"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleMainImageChange}
                  />
                  <span>Upload item image</span>
                </div>

                {preview && (
                  <div className="image-preview">
                    <img
                      src={preview}
                      alt="Item Preview"
                      style={{ width: '120px', height: '120px', objectFit: 'cover', marginTop: '10px', borderRadius: '10px' }}
                    />
                  </div>
                )}
              </div>
            ) : (
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
                        placeholder="Enter compare price"
                      />
                    </div>
                </div>

                    <div className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={variant.track}
                          onChange={(e) => handleTrackInventoryChange(variant.id, e.target.checked)}
                        />
                        Track Inventory
                      </label>
                    </div>

                    <div className="upload-image">
                      <label htmlFor={`image-upload-${variant.id}`}>📎</label>
                      <input
                        type="file"
                        id={`image-upload-${variant.id}`}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(variant.id, e)}
                      />
                      <span>Upload variant image</span>
                    </div>

                    {variant.previewUrl && (
                      <div className="image-preview">
                        <img
                          src={variant.previewUrl}
                          alt="Variant Preview"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', marginTop: '10px', borderRadius: '10px' }}
                        />
                      </div>
                    )}

                    {variants.length > 1 && (
                      <button
                        type="button"
                        className="remove-variant-btn"
                        onClick={() => removeVariant(variant.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button type="button" className="add-more-btn" onClick={addVariant}>
                  + Add more
                </button>

              </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
              <div className="modal-overlay">
                <div className="inventory-modal">
                  <div className="modal-header">
                    <h3>{getModalTitle()}</h3>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                  </div>
                  <div className="modal-body">
                    {renderModalContent()}
                  </div>
                  <div className="modal-footer">
                    {currentModalStep > 0 && (
                      <button className="btn-cancel" onClick={prevModalStep}>Previous</button>
                    )}
                    <div style={{ marginLeft: 'auto' }}>
                      <button className="btn-cancel" onClick={closeModal} style={{ marginRight: '10px' }}>Cancel</button>
                      <button className="btn-save" onClick={nextModalStep}>
                        {currentModalStep < 2 ? 'Next' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MenuItemAddedForm;