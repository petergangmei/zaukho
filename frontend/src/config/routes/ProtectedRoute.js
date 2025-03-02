/**
 * ProtectedRoute component
 * Handles authentication checks and redirects for protected routes
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading, getCurrentUser } from '../redux/slices/authSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/**
 * ProtectedRoute component that checks if user is authenticated
 * If authenticated, renders the children components
 * If not authenticated, redirects to login page
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {React.ReactNode} - The rendered component
 */
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const [authChecked, setAuthChecked] = useState(false);
  const [authCheckTimeout, setAuthCheckTimeout] = useState(false);

  // Log authentication state for debugging
  console.log('ProtectedRoute render:', { 
    path: location.pathname,
    isAuthenticated, 
    loading, 
    authChecked 
  });

  useEffect(() => {
    // Set a timeout to prevent infinite loading state
    const timeoutId = setTimeout(() => {
      console.log('Auth check timeout reached');
      setAuthCheckTimeout(true);
    }, 5000); // 5 seconds timeout

    // If already authenticated with a token, mark as checked
    if (isAuthenticated && localStorage.getItem('token')) {
      console.log('User is already authenticated with token');
      setAuthChecked(true);
      clearTimeout(timeoutId);
      return;
    }

    // If not authenticated or no token, check current user
    console.log('Checking current user authentication');
    dispatch(getCurrentUser())
      .unwrap()
      .then((userData) => {
        console.log('Current user check successful:', userData);
        setAuthChecked(true);
      })
      .catch((error) => {
        console.log('Current user check failed:', error);
        setAuthChecked(true);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => clearTimeout(timeoutId);
  }, [dispatch, isAuthenticated]);

  // Show loading spinner while checking authentication
  if (loading && !authCheckTimeout) {
    console.log('Showing loading spinner');
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // If authentication check is complete and user is not authenticated, redirect to login
  if (authChecked || authCheckTimeout) {
    if (!isAuthenticated) {
      console.log('User is not authenticated, redirecting to login');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is authenticated, render children
    console.log('User is authenticated, rendering protected content');
    return children;
  }

  // Default loading state while waiting for auth check
  return <LoadingSpinner message="Initializing..." />;
};

export default ProtectedRoute; 