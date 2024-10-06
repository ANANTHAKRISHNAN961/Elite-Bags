import React, { useState,useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import { CartContext } from '../components/CartContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Checkout = () => {
  const { state } = useLocation();
  const { items } = state || { items: [] };
  const { user } = useUser();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const [receiverNameError, setReceiverNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleOrderConfirmation = () => {
    
    setReceiverNameError('');
    setAddressError('');
    setPhoneError('');

    if (!receiverName.trim()) {
      setReceiverNameError('Receiver\'s Name is required');
      return;
    }
    if (!address.trim()) {
      setAddressError('Address is required');
      return;
    }
    if (!phone.trim()) {
      setPhoneError('Phone Number is required');
      return;
    }

    const orderDetails = {
      userId: user.id,
      items,
      receiverName,
      address,
      phone,
      paymentMethod,
      cardNumber: paymentMethod === 'debitCard' ? cardNumber : '',
      cardExpiry: paymentMethod === 'debitCard' ? cardExpiry : '',
      cardCVV: paymentMethod === 'debitCard' ? cardCVV : '',
      saveAddress,
      saveCard
    };
  
    axios.post('http://localhost/Elite%20bags/checkout.php', orderDetails)
      .then(response => {
        console.log('Server response:', response.data); // Log the entire response data for debugging
        if (response.data.status === 'success') {
          generateInvoice(orderDetails); // Generate invoice upon successful order
          navigate('/order-confirmation'); // Navigate to order confirmation page
        } else {
          console.error('Error confirming order:', response.data.message || 'Unknown error');
          // Handle error scenario, if needed
        }
      })
      .catch(error => {
        console.error('Error confirming order:', error); // Log any network or JavaScript errors
        // Handle network or other errors
      });
  };  

  useEffect(() => {
    if (user && user.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost/Elite%20bags/checkExistingDetails.php?userId=${user.id}`);
          setUserData(response.data); // Set address if available
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error as needed
        }
      };

      fetchUserData();
    }
  }, [user]);

  const generateInvoice = (orderDetails) => {
    const doc = new jsPDF();
    doc.text('Invoice', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Product', 'Quantity', 'Price']],
      body: items.map(item => [item.name, item.quantity, item.price]),
    });
    doc.text(`Name: ${user.username}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Receiver: ${receiverName}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Email: ${user.email}`, 14, doc.autoTable.previous.finalY + 30);
    doc.text(`Address: ${address}`, 14, doc.autoTable.previous.finalY + 40);
    doc.text(`Phone: ${phone}`, 14, doc.autoTable.previous.finalY + 50);
    doc.save('invoice.pdf');
  };

  const handleAddressClick = () => {
    if (!address && userData.address && window.confirm(`Do you want to use your existing address (${userData.address})?`)) {
      setAddress(userData.address);
    }
  };
  
  const handleCardDetailsClick = () => {
    if (!cardNumber && !cardExpiry && !cardCVV &&userData.card_number) {
      if (window.confirm(`Do you want to use your existing card details (Number: ${userData.card_number}, Expiry: ${userData.card_expiry}, CVV: ${userData.card_cvv})?`)) {
        setCardNumber(userData.card_number);
        setCardExpiry(userData.card_expiry);
        setCardCVV(userData.card_cvv);
      }
    }
  };
  
  return (
    <div className="container">
      <h2 className="my-4">Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="cart-items mb-4">
            {items.map(item => (
              <div key={item.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Quantity: {item.quantity}</p>
                  <p className="card-text">Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-details mb-4">
            <h3 className="mb-3">Delivery Details</h3>
            <div className="form-group mb-3">
              <label htmlFor="receiverName">Receiver's Name</label>
              <input
                type="text"
                id="receiverName"
                className="form-control"
                placeholder="Receiver's Name"
                value={receiverName}
                onChange={(e) => {
                  setReceiverName(e.target.value);
                  setReceiverNameError('');  // Reset error message on input change
                }}
                required
              />
              {receiverNameError && <div className="text-danger">{receiverNameError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Address"
                value={address}
                onClick={handleAddressClick}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddressError('');  // Reset error message on input change
                }}
                required
              />
              {addressError && <div className="text-danger">{addressError}</div>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError('');  // Reset error message on input change
                }}
                required
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="saveAddress"
                className="form-check-input"
                checked={saveAddress}
                onChange={(e) => setSaveAddress(e.target.checked)}
              />
              <label htmlFor="saveAddress" className="form-check-label">Save this address</label>
            </div>
            <div className="payment-method mb-4">
              <h3 className="mb-3">Payment Method</h3>
              <div className="form-check">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  className="form-check-input"
                  checked={paymentMethod === 'cashOnDelivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cashOnDelivery" className="form-check-label">Cash on Delivery</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="debitCard"
                  name="paymentMethod"
                  value="debitCard"
                  className="form-check-input"
                  checked={paymentMethod === 'debitCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="debitCard" className="form-check-label">Debit Card</label>
              </div>
            </div>
            {paymentMethod === 'debitCard' && (
              <div>
                <div className="form-group mb-3">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="form-control"
                    placeholder="Card Number"
                    value={cardNumber}
                    onClick={handleCardDetailsClick}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="cardExpiry">Expiry Date (MM/YY)</label>
                  <input
                    type="text"
                    id="cardExpiry"
                    className="form-control"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onClick={handleCardDetailsClick}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="cardCVV">CVV</label>
                  <input
                    type="text"
                    id="cardCVV"
                    className="form-control"
                    placeholder="CVV"
                    value={cardCVV}
                    onClick={handleCardDetailsClick}
                    onChange={(e) => setCardCVV(e.target.value)}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="saveCard"
                    className="form-check-input"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                  />
                  <label htmlFor="saveCard" className="form-check-label">Save this card</label>
                </div>
              </div>
            )}
            <button className="btn btn-primary" onClick={handleOrderConfirmation}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
