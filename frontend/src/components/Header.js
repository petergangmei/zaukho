import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  // State to track if user is logged in (for demo purposes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">ZAUKHO</span>
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies">Movies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/tv-series">TV Shows</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
            </ul>
            
            <div className="d-flex">
              {isLoggedIn ? (
                <>
                  <NavLink className="nav-link me-3" to="/my-library">
                    <i className="fas fa-film me-1"></i> My Library
                  </NavLink>
                  <button 
                    className="btn btn-outline-light" 
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink className="btn btn-outline-light me-2" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="btn btn-primary" to="/register">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 