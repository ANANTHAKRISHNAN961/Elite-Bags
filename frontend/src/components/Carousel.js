import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Carousel.css';

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/api.php') // Adjusted endpoint URL
      .then(response => {
        // Adjust image paths received from the API
        const adjustedProducts = response.data.map(product => ({
          ...product,
          image: process.env.REACT_APP_API_URL + `/Images/${product.image}` // Assuming image path in database includes 'Images/'
        }));
        setProducts(adjustedProducts);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="bag-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {products.map((product, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} c-item`}>
            <img src={product.image} className="d-block w-100 c-image" alt={product.name} />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#bag-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bag-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
