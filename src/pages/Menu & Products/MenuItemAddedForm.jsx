// MenuItemAddedForm.js
import React, { useEffect, useState } from 'react';
import './MenuItemAddedForm.css'; 
import DashboardLayout from '../../layouts/DashboardLayout';

function MenuItemAddedForm() {
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

  //loaded categories
  const [categories, setCategories] = useState([]); 
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState(null);

  //loaded subcategiries
  const [subcategories, setSubCategories] = useState([]); 
  const [loadingsubCats, setLoadingsubCats] = useState(false);
  const [subcatsError, setsubCatsError] = useState(null);

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


  //variants part
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
      [name]: 
      type === 'radio' ? value : (type === 'checkbox' ? checked : value)
    }));
    
  };

  //Sumbit Form
  const handleSubmit = async  (e) => {
    e.preventDefault();

    try{
      const res = await fetch("http://127.0.0.1:8000/api/menu-items",{
         method: 'POST',
         headers: {
         'Content-Type': 'application/json'
      },
        body: JSON.stringify(formData)
    });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save menu item');

      alert('Menu item added successfully!');
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
    catch(err){
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
                  <input type="number" name="compare_at_price" value={formData.compare_at_price} onChange={handleChange} placeholder="Enter Price" required/>
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