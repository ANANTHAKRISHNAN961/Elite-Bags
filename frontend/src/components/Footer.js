import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Elite Bags is a leading e-commerce company providing a wide range of high-quality bags at affordable prices.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: contact@elitebags.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 1234 Market Street, Suite 100, San Francisco, CA 94103</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex">
              <li><a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#" className="text-white me-3"><i className="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">&copy; 2024 Elite Bags. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
