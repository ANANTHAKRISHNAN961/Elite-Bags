import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Adjust the import based on your App component location

const container = document.getElementById('root'); // Ensure the container matches the id of your root element in HTML
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
