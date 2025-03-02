import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser, selectAuth, resetLoading } from '../../config/redux/slices/authSlice';
import { LoadingSpinner } from '../common';

/**
 * ProtectedRoute component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // Use the selector function to safely access the auth state
  const auth = useSelector(selectAuth) || { isAuthenticated: false, token: null };
  const { isAuthenticated, token, loading, user } = auth;
  const dispatch = useDispatch();
  const location = useLocation();

  // Debug log to see what's happening
  console.log('ProtectedRoute render:', { 
    isAuthenticated, 
    hasToken: !!token, 
    hasUser: !!user, 
    isCheckingAuth 
  });

  useEffect(() => {
    // Reset loading state if it's stuck
    if (loading) {
      console.log('Resetting stuck loading state in ProtectedRoute');
      dispatch(resetLoading());
    }

    // If we already have a token and user, we can skip the auth check
    if (token && user && isAuthenticated) {
      console.log('Already authenticated with user data, skipping auth check');
      setIsCheckingAuth(false);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        // Only check if we have a token but no user data
        if (token && !user) {
          console.log('Have token but no user, fetching user data');
          await dispatch(getCurrentUser()).unwrap();
        } else if (token && user) {
          // We already have user data, no need to fetch again
          console.log('Already have user data, skipping fetch');
        } else {
          console.log('No token or user data, not authenticated');
        }
      } catch (error) {
        // Handle throttling errors gracefully
        if (error === 'Request throttled') {
          console.log('Request throttled, using existing auth state');
        } else {
          console.log('Not authenticated:', error);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
    
    // Set a timeout to ensure we don't get stuck in loading state
    const timeout = setTimeout(() => {
      if (isCheckingAuth) {
        console.log('Auth check timed out, proceeding with current state');
        setIsCheckingAuth(false);
      }
    }, 2000); // 2 second timeout
    
    return () => clearTimeout(timeout);
  }, [dispatch, token, user, loading, isAuthenticated, isCheckingAuth]);

  // Show loading spinner while checking authentication, but only briefly
  if (isCheckingAuth) {
    console.log('Showing loading spinner while checking auth');
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected route
  console.log('User is authenticated, rendering protected route');
  return <Outlet />;
};

export default ProtectedRoute; 