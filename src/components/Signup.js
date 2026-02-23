import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://cloudbook-1b70.onrender.com/api/auth/createuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        alert('Signup successful!');
        navigate('/');
      } else {
        alert('Signup failed: ' + (json.error || 'Invalid input or user already exists'));
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center text-primary mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              placeholder="At least 5 characters"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cpassword" className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              minLength={5}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
