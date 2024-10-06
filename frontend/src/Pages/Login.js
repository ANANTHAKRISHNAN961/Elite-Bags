import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';
import { useUser } from '../components/UserContext'; // Import useUser hook

const Login = () => {
  const { login } = useUser(); // Destructure login function from UserContext
  const navigate = useNavigate(); // Initialize navigate function from React Router
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL + '/login.php', formData)
      .then(response => {
        if (response.data.message === 'Login successful') {
          // Update the user state using the login function from UserContext
          login(response.data.user);
          setMessage(response.data.message);
          // Redirect to home page
          navigate('/home');
        } else {
          setMessage(response.data.error || 'An error occurred');
        }
      })
      .catch(error => setMessage('An error occurred'));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter email" 
                    required 
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter password" 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
