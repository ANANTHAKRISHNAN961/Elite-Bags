import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optionally, you can fetch user details from local storage or an API
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from local storage
  };

  const saveAddress = (address) => {
    if (user) {
      setUser({ ...user, address });
      axios.post(process.env.REACT_APP_API_URL +'/saveAddress.php', { userId: user.id, address })
        .then(response => {
          console.log('Address saved successfully');
        })
        .catch(error => {
          console.error('Error saving address:', error);
        });
    }
  };

  const saveCardDetails = (cardDetails) => {
    if (user) {
      axios.post(process.env.REACT_APP_API_URL +'/saveCard.php', { userId: user.id, cardDetails })
        .then(response => {
          console.log('Card details saved successfully');
        })
        .catch(error => {
          console.error('Error saving card details:', error);
        });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, saveAddress, saveCardDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
