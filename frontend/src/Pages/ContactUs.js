import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css'; // Import the custom CSS file

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful form submission
    setSuccess('Your message has been sent successfully!');
    setError(null);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-header text-center">
          <h2>Contact Us</h2>
        </div>
        <div className="contact-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                value={message}
                onChange={handleMessageChange}
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
