import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';  // Custom CSS file for additional styles

export default function SignUp() {
  const [data, setData] = useState({ name: "", password: "", location: "", email: "" });
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:4000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();

      
        if (!json.success) {
          setError('Invalid data. Please check your inputs.');
        } else {
          localStorage.setItem('authToken',json.authToken);
          localStorage.setItem('userEmail',data.email);
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
              <h3 className="card-title text-center mb-4">Sign Up for AKP Foods</h3>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control"  
                    placeholder="Enter your name" 
                    name='name' 
                    value={data.name} 
                    onChange={onChange} 
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control"  
                    placeholder="Enter your email" 
                    name='email' 
                    value={data.email} 
                    onChange={onChange} 
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
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input 
                    type="text" 
                    className="form-control"  
                    placeholder="Enter your location" 
                    name='location' 
                    value={data.location} 
                    onChange={onChange} 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                <div className="text-center mt-3">
                  <Link to='/login' className='btn btn-link'>Already a user? Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
