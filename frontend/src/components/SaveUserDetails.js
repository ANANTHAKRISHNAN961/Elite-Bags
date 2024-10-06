import React, { useState } from 'react';
import axios from 'axios';

const SaveUserDetails = () => {
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleSave = () => {
    const userId = 1; // Replace with actual userId

    axios.post(process.env.REACT_APP_API_URL +'/saveUserDetails.php', { 
      userId, 
      address, 
      cardNumber, 
      cardExpiry, 
      cardCvv 
    })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error('Error saving user details:', error);
    });
  };

  return (
    <div className="container mt-5">
      <h2>Save User Details</h2>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input 
          type="text" 
          className="form-control" 
          id="address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number:</label>
        <input 
          type="text" 
          className="form-control" 
          id="cardNumber" 
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardExpiry">Card Expiry:</label>
        <input 
          type="date" 
          className="form-control" 
          id="cardExpiry" 
          value={cardExpiry} 
          onChange={(e) => setCardExpiry(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardCvv">Card CVV:</label>
        <input 
          type="text" 
          className="form-control" 
          id="cardCvv" 
          value={cardCvv} 
          onChange={(e) => setCardCvv(e.target.value)} 
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
    </div>
  );
};

export default SaveUserDetails;
