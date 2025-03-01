import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../store/slices/authSlice';
import { LoadingSpinner } from '../common';

/**
 * ProtectedRoute component
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Only check if we have a token
        if (token) {
          await dispatch(getCurrentUser()).unwrap();
        }
      } catch (error) {
        // Error is handled in the auth slice
        console.log('Not authenticated');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [dispatch, token]);

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute; 