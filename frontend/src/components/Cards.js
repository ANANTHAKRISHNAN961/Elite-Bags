import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost/Elite%20bags/api.php')
      .then(response => {
        // Adjust image paths received from the API
        const adjustedProducts = response.data.map(product => ({
          ...product,
          image: `http://localhost/Elite%20bags/${product.image}` // Assuming image path in database includes 'Images/'
        }));
        setProducts(adjustedProducts);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again later.');
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container text-center">
      <div className="row mb-4">
        {filteredProducts.map(product => (
          <div className="col-md-4 d-flex" key={product.id}>
            <Link to={`/products/${product.id}`} className="card flex-fill mb-4 product-link">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;