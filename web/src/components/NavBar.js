import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCartState } from './ContextReducer';
import './NavBar.css';

export default function NavBar() {
  let data = useCartState();
  let [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <Link className="navbar-brand fs-1 fst-italic ms-3" to="/">AKP Foods</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myorders">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <div className='d-flex'>
              <Link className="btn btn-outline-light mx-1" to="/login">Login</Link>
              <Link className="btn btn-outline-light mx-1" to="/createuser">SignUp</Link>
            </div>
          ) : (
            <div>
              <div className="btn btn-outline-light mx-2" onClick={() => setCartView(true)}>
                My Cart{' '}
                {data.length ? <Badge pill bg="danger">{data.length}</Badge> : null}
              </div>
              {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
              <div className="btn btn-outline-light mx-2" onClick={handleLogout}>Sign Out</div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
