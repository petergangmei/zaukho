import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-heading">ZAUKHO</h5>
            <p className="footer-text">
              Your premier destination for movies and TV shows. 
              Stream, rent, or buy the latest entertainment content.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-2 col-6 mb-4 mb-md-0">
            <h5 className="footer-heading">Explore</h5>
            <ul className="footer-links">
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/tv-series">TV Shows</Link></li>
              <li><Link to="/new-releases">New Releases</Link></li>
              <li><Link to="/coming-soon">Coming Soon</Link></li>
            </ul>
          </div>
          
          <div className="col-md-2 col-6 mb-4 mb-md-0">
            <h5 className="footer-heading">About</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4">
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="footer-divider" />
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Zaukho. All Rights Reserved.
          </p>
          <div className="payment-methods">
            <span className="payment-icon">
              <i className="fab fa-cc-visa"></i>
            </span>
            <span className="payment-icon">
              <i className="fab fa-cc-mastercard"></i>
            </span>
            <span className="payment-icon">
              <i className="fab fa-cc-paypal"></i>
            </span>
            <span className="payment-icon">
              <i className="fab fa-cc-apple-pay"></i>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 