import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import AddProduct from './Pages/AddProduct.js';
import Navigation from './components/Navigation';
import Footer from './components/Footer.js';
import ContactUs from './Pages/ContactUs.js';
import AboutUs from './Pages/AboutUs.js';
import Products from './Pages/Products.js';
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/UserContext';
import Cart from './components/Cart.js';
import Register from './Pages/Register.js';
import Login from './Pages/Login.js';
import Profile from './Pages/Profile.js';
import Checkout from './Pages/Checkout';
import OrderConfirmation from './Pages/OrderConfirmation.js';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <UserProvider>
      <CartProvider>
        <div style={{ backgroundColor: '#c4df9b' }}>
          <Navigation onSearch={handleSearch} />
          <Routes>
          <Route index path="/" element={<Home searchQuery={searchQuery} />} />
            <Route index path="/home" element={<Home searchQuery={searchQuery} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/register" element={<Register />} /> {/* Ensure this is corrected */}
            <Route path="/login" element={<Login />} /> {/* Ensure this is corrected */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
