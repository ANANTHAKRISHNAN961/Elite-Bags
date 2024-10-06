// OrderConfirmation.js

import React from 'react';

const OrderConfirmation = () => {
  return (
    <div className="container">
      <h2 className="my-4">Order Confirmation</h2>
      <div className="alert alert-success" role="alert">
        Your order has been confirmed successfully!
      </div>
      {/* Optionally, display order details or a link to track orders */}
    </div>
  );
};

export default OrderConfirmation;
