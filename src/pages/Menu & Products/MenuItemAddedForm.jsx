import React, { useEffect, useState } from 'react';
import './MenuItemAddedForm.css'; 
import DashboardLayout from '../../layouts/DashboardLayout';
import { useLocation, useNavigate  } from "react-router-dom";

function MenuItemAddedForm() {


  const navigate = useNavigate();

  const location = useLocation(); //get data from same page
  const itemData = location.state?.item; // get item data from state

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    subcategory_id: '',
    price:'',
    compare_at_price: '',
    type: '', 
    product_code: '',
    description: '',
    track_inventory_enabled: false,
  });

  //load edditing data
  useEffect(() => {
    if (itemData) {
      setFormData({
        name: itemData.name || '',
        category_id: itemData.category_id || '',
        subcategory_id: itemData.subcategory_id || '',
        price: itemData.price || '',
        compare_at_price: itemData.compare_at_price || '',
        type: itemData.type || '',
        product_code: itemData.product_code || '',
        description: itemData.description || '',
        track_inventory_enabled: itemData.track_inventory_enabled || false,
      });
    }
  }, [itemData]);

  //loaded categories
  const [categories, setCategories] = useState([]); 
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState(null);

  //loaded subcategiries
  const [subcategories, setSubCategories] = useState([]); 
  const [loadingsubCats, setLoadingsubCats] = useState(false);
  const [subcatsError, setsubCatsError] = useState(null);

  // variants data - now properly managed per variant in the array
  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      variantName: '',
      price: '',
      comparePrice: '',
      track: false,
      image: null
    }
  ]);

  const [preview, setPreview] = useState(null);

  // Track the created menu item ID for variants
  const [createdMenuItemId, setCreatedMenuItemId] = useState(null);

  //load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      setCatsError(null);

      try{
        const res = await fetch("http://127.0.0.1:8000/api/categories");
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // your controller returns { status:200, data: [...] }
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

  //load subcategories on mount
  useEffect(() => {
    const loadsubCategories = async () => {
      setLoadingsubCats(true);
      setsubCatsError(null);

      try{
        const res = await fetch("http://127.0.0.1:8000/api/subcategories");
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // your controller returns { status:200, data: [...] }
        const data = Array.isArray(json) ? json : (json.data ?? [])
        setSubCategories(data);
      }
      catch(err){
        setsubCatsError(err.message || "Failed to load subCategories");
      }
      finally{
        setLoadingsubCats(false);
      }
    };
    loadsubCategories();
  },[]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: 
      type === 'radio' ? value : (type === 'checkbox' ? checked : value)
    }));
    
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
      updateVariant(variantId, 'image', file);
    }

    // Create a temporary URL for preview
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

  };

  //Sumbit Form for main menu item
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const isEdit = !!itemData; // true if editing
  const url = isEdit
    ? `http://127.0.0.1:8000/api/menu-items/${itemData.id}`
    : "http://127.0.0.1:8000/api/menu-items";
  const method = isEdit ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save menu item');

    setCreatedMenuItemId(data.data?.id || data.id || itemData?.id);

    alert(isEdit ? 'Menu item updated successfully!' : 'Menu item added successfully! Now add variants.');

    // Reset form only if creating new item
    if (!isEdit) {
      setFormData({
        name: '',
        category_id: '',
        subcategory_id: '',
        price: '',
        compare_at_price: '',
        type: '',
        product_code: '',
        description: '',
        track_inventory_enabled: false,
      });
    }

    // Redirect to menu dashboard with refresh
    navigate("/menu", { state: { refresh: true } });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



  const addVariant = () => {
    const newVariant = {
      id: Date.now(),
      variantName: '',
      price: '',
      comparePrice: '',
      track: false,
      image: null
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const removeVariant = (id) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  // Submit a single variant
  const submitVariant = async (variant) => {
    if (!createdMenuItemId) {
      alert('Please create the main menu item first.');
      return;
    }

    const formDataVariant = new FormData();
    formDataVariant.append('menu_item_id', createdMenuItemId);
    formDataVariant.append('variant_name', variant.variantName);
    formDataVariant.append('price', Number(variant.price));
    formDataVariant.append('compare_at_price', variant.comparePrice ? Number(variant.comparePrice) : null);
    formDataVariant.append('track_inventory_enabled', variant.track ? 1 : 0);
    if (variant.image) {
      formDataVariant.append('variant_img', variant.image);
    }

    try {
      const variantRes = await fetch("http://127.0.0.1:8000/api/variants", {
        method: 'POST',
        body: formDataVariant 
      });

      const data = await variantRes.json(); 
      console.log(data);

      if (!variantRes.ok) throw new Error(data.message || 'Failed to save variant');

      alert('Variant added successfully!');
      
      // Reset this variant
      updateVariant(variant.id, 'variantName', '');
      updateVariant(variant.id, 'price', '');
      updateVariant(variant.id, 'comparePrice', '');
      updateVariant(variant.id, 'track', false);
      updateVariant(variant.id, 'image', null);
    } catch (error) {
      console.error("Error is - ", error);
      alert(error.message);
    }
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
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                    {loadingCats ? (<div>Loading categories</div>) : catsError ? (
                      <div style={{color:"red"}} >Error: {catsError}</div>
                    ) : (
                      <select name='category_id' value={formData.category_id} onChange={handleChange} required>
                        <option value="">Select item Category</option>
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                    ))}
                  </select>
                    )}
                </div>

                <div className="form-group">
                  <label>Sub Category *</label>
                    {loadingsubCats ? (<div>Loading subcategories</div>) : subcatsError ? (
                      <div style={{color:"red"}} >Error: {subcatsError}</div>
                    ) : (
                      <select name='subcategory_id' value={formData.subcategory_id} onChange={handleChange} required>
                        <option value="">Select SubCategory</option>
                        {subcategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                    ))}
                  </select>
                    )}
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required/>
                </div>

                <div className='form-group'>
                  <lable>Compare-At Price (optional)</lable>
                  <input type="number" name="compare_at_price" value={formData.compare_at_price} onChange={handleChange} placeholder="Enter Price" />
                </div>

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

                <button type="submit" className="save-btn">Save Menu Item</button>
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

                  <div className="upload-image">
                    <label htmlFor={`image-upload-${variant.id}`}>📎</label>
                    <input
                      type="file"
                      id={`image-upload-${variant.id}`}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageChange(variant.id, e)}
                    />
                    <span>Upload item image</span>
                  </div>

                  {preview && (
                      <div className="image-preview">
                                <img
                                   src={preview}
                                    alt="Variant Preview"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover', marginTop: '10px', borderRadius: '10px' }}
                                />
                     </div>
                  )}


                  <div className='my-button'>
                   <button type='button' className='submit-button' onClick={() => submitVariant(variant)}>
                     Submit Variant
                   </button>
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

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MenuItemAddedForm;