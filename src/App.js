import React from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<SignUp />} />
            
            <Route exact path='/myorders' element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
