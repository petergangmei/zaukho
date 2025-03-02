/**
 * GuestRoute component
 * Handles redirects for routes that should only be accessible to non-authenticated users
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading } from '../redux/slices/authSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/**
 * GuestRoute component that checks if user is NOT authenticated
 * If not authenticated, renders the children components
 * If authenticated, redirects to browse page
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if not authenticated
 * @returns {React.ReactNode} - The rendered component
 */
const GuestRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  // Log authentication state for debugging
  console.log('GuestRoute render:', { 
    path: location.pathname,
    isAuthenticated, 
    loading 
  });

  // Show loading spinner while checking authentication
  if (loading) {
    console.log('Showing loading spinner');
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // If user is authenticated, redirect to browse page
  if (isAuthenticated) {
    console.log('User is authenticated, redirecting to browse');
    
    // Get the intended destination from location state, or default to browse
    const from = location.state?.from?.pathname || '/browse';
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, render children
  console.log('User is not authenticated, rendering guest content');
  return children;
};

export default GuestRoute; 