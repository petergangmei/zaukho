import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  // State to track if user is logged in (for demo purposes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to track if dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Ref for dropdown menu
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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
                <div className="user-dropdown" ref={dropdownRef}>
                  <button 
                    className="dropdown-toggle d-flex align-items-center"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="avatar-circle me-2">
                      <span className="initials">JD</span>
                    </div>
                    <span className="d-none d-md-inline">John Doe</span>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <NavLink className="dropdown-item" to="/my-library">
                        <i className="fas fa-film me-2"></i> My Library
                      </NavLink>
                      <NavLink className="dropdown-item" to="/profile-settings">
                        <i className="fas fa-user-cog me-2"></i> Profile Settings
                      </NavLink>
                      <NavLink className="dropdown-item" to="/transaction-history">
                        <i className="fas fa-history me-2"></i> Transaction History
                      </NavLink>
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={() => setIsLoggedIn(false)}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
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