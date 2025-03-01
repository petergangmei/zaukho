import React from 'react';
import { Link } from 'react-router-dom';
// Using Tailwind CSS for styling instead of SCSS

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors duration-300">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 