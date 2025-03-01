import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container text-center">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary btn-lg mt-4">
          <i className="fas fa-home me-2"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 