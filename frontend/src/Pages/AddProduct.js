import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css';
const AddProduct = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost/Elite%20bags/api_categories.php');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', productId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category); // Changed to category_id
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost/Elite%20bags/api.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess(response.data.success);
        setError(null);
        resetForm();
      } else {
        setError(response.data.error);
        setSuccess(null);
      }
    } catch (error) {
      console.error(error);
      setError('Error adding product. Please try again.');
      setSuccess(null);
    }
  };

  const resetForm = () => {
    setProductId('');
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage(null);
    document.getElementById('image').value = null;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input type="text" className="form-control" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" value={category} onChange={handleCategoryChange} required>
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" className="form-control-file" id="image" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default AddProduct;
 