import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { getCurrentUser, selectAuth } from './store/slices/authSlice';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Media pages
import Movies from './pages/media/Movies';
import MovieDetail from './pages/media/MovieDetail';
import TVSeries from './pages/media/TVSeries';
import TVSeriesDetail from './pages/media/TVSeriesDetail';
import EpisodeDetail from './pages/media/EpisodeDetail';

// Library pages
import MyLibrary from './pages/library/MyLibrary';

// Profile pages
import TransactionHistory from './pages/profile/TransactionHistory';
import ProfileSettings from './pages/profile/ProfileSettings';

// Policy pages
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import Terms from './pages/policies/Terms';
import RefundPolicy from './pages/policies/RefundPolicy';
import CancellationPolicy from './pages/policies/CancellationPolicy';

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
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Policy routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/browse" element={<Browse />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/tv-series" element={<TVSeries />} />
            <Route path="/tv-series/:id" element={<TVSeriesDetail />} />
            <Route path="/tv-series/:seriesId/season/:seasonNumber/episode/:episodeNumber" element={<EpisodeDetail />} />
            <Route path="/my-library" element={<MyLibrary />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default App; 