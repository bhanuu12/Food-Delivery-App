import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';  // Custom CSS file for additional styles

export default function Login() {
  const [data, setData] = useState({ password: "", email: "" });
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setError('Invalid email or password. Please try again.');
      } else {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.authToken);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Welcome Back To AKP Foods</h3>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control"  
                    placeholder="Enter your email" 
                    name='email' 
                    value={data.email} 
                    onChange={onChange} 
                    aria-label="Email" 
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control"  
                    placeholder="Enter your password" 
                    name='password' 
                    value={data.password} 
                    onChange={onChange} 
                    aria-label="Password" 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <div className="text-center mt-3">
                  <Link to='/createuser' className='btn btn-link'>New user? Register here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
