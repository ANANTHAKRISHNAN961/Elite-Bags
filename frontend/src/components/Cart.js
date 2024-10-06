import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handlePlaceOrder = () => {
    navigate('/checkout', { state: { items: cartItems } });
  };

  const handlePlaceOrderItem = (item) => {
    navigate('/checkout', { state: { items: [item] } });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map(item => (
              <Col md={4} className="mb-4" key={item.id}>
                <div className="cart-item d-flex flex-column h-100 justify-content-between">
                  <img src={`${item.image}`} alt={item.name} className="img-fluid" style={{ mixBlendMode: 'multiply' }} />
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="mt-auto">
                    <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                    <Button variant="primary" className="ms-2" onClick={() => handlePlaceOrderItem(item)}>Place Order</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="mt-4">
            <Button variant="primary" onClick={handlePlaceOrder}>Place Order for All Items</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
