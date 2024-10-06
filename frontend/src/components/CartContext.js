import React, { useState, createContext, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useUser } from '../components/UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
    setCartCount(savedCartItems.reduce((count, item) => count + item.quantity, 0));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setCartCount(0);
    }
  }, [user]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      setToastMessage('Item quantity increased');
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setToastMessage('Item added to cart');
    }
    setCartCount(cartCount + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeFromCart = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
      setCartCount(cartCount - item.quantity);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity > 0) {
      const item = cartItems.find(item => item.id === itemId);
      const difference = quantity - item.quantity;
      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity } : item));
      setCartCount(cartCount + difference);
    }
  };
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, clearCart }}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <strong className="me-auto">Cart Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CartContext.Provider>
  );
};
