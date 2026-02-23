import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://cloudbook-1b70.onrender.com/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log("Login response:", json);

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-4">Login to iNotebook</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              value={credentials.email}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              id="password"
              name="password"
              value={credentials.password}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary fw-semibold">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
