import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { useUser } from '../components/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(process.env.REACT_APP_API_URL + `/api.php?id=${id}`);
        const fetchedProduct = productResponse.data[0];
        fetchedProduct.image = process.env.REACT_APP_API_URL + `/${fetchedProduct.image}`;
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again later.');
      }
    };

    const fetchProductDetails = async () => {
      try {
        const detailsResponse = await axios.get(process.env.REACT_APP_API_URL + `/api_details.php?id=${id}`);
        setDetails(detailsResponse.data.details);
      } catch (error) {
        console.error('Error fetching additional product details:', error);
        setError('Error fetching additional product details. Please try again later.');
      }
    };

    fetchProduct();
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product);
      displayToastMessage('Item added to cart');
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product);
      navigate('/cart'); // Navigate to the Cart page instead of '/checkout'
      displayToastMessage('Item added to cart'); // Optionally show a toast message
    }
  };

  const displayToastMessage = (message) => {
    toast.success(message);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product || !details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="product-image" alt={product.name} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <h3 className="product-price">${product.price}</h3>
            <div className="product-additional-details">
              <p><strong>Stock:</strong> {details.stock}</p>
              <p><strong>Material:</strong> {details.material}</p>
              <p><strong>Manufactured By:</strong> {details.manufactured_by}</p>
              <p><strong>Weight:</strong> {details.weight} grams</p>
            </div>
            <div className="product-actions">
              <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
              <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
