import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

// Import from new config structure
import { getCurrentUser, selectAuth } from './config/redux/slices/authSlice';
import AppRouter from './config/routes/AppRouter';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Main App component
 * Handles initial authentication check and renders the application layout
 */
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  // Check authentication status when app loads
  useEffect(() => {
    console.log('App mounted, auth state:', auth);
    
    // Reset loading state if it's stuck
    if (auth && auth.loading) {
      console.log('Resetting stuck loading state');
      // Dispatch an action to reset loading state
      dispatch({ type: 'auth/resetLoading' });
    }
    
    // Check if user is authenticated
    if (auth && auth.token && !auth.user) {
      console.log('Token found but no user data, fetching user data...');
      // Only fetch user data if we have a token but no user data
      dispatch(getCurrentUser())
        .unwrap()
        .then(userData => {
          console.log('User data fetched successfully:', userData);
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
        });
    } else if (auth && auth.token && auth.user) {
      console.log('User already authenticated:', auth.user);
    } else if (auth && !auth.token) {
      console.log('No token found, user is not authenticated');
    }
  }, [dispatch, auth]);

  // Add a separate effect to log auth state changes
  useEffect(() => {
    console.log('Auth state changed:', {
      isAuthenticated: auth?.isAuthenticated,
      hasToken: !!auth?.token,
      hasUser: !!auth?.user,
      localStorage: {
        token: !!localStorage.getItem('token'),
        refresh_token: !!localStorage.getItem('refresh_token')
      }
    });
  }, [auth?.isAuthenticated, auth?.token, auth?.user]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-5">
          <AppRouter />
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </BrowserRouter>
  );
}

export default App; 