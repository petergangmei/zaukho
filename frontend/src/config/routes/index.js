/**
 * Application routes configuration
 * This file defines all routes used in the application
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

// Import page components
// Using correct paths for the page components
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import Browse from '../../pages/Browse';
import Home from '../../pages/Home';
import ContentDetails from '../../pages/ContentDetails';
import Watchlist from '../../pages/Watchlist';
import Library from '../../pages/Library';
import NotFound from '../../pages/NotFound';

/**
 * Route configuration object
 * Each route has a path, element, and optional properties like requiresAuth
 */
const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/login',
    element: <Login />,
    exact: true,
    guestOnly: true, // Only accessible if not authenticated
  },
  {
    path: '/register',
    element: <Register />,
    exact: true,
    guestOnly: true, // Only accessible if not authenticated
  },
  {
    path: '/browse',
    element: <Browse />,
    exact: true,
    requiresAuth: true, // Requires authentication
  },
  {
    path: '/content/:id',
    element: <ContentDetails />,
    requiresAuth: false, // Allow both authenticated and non-authenticated users
  },
  {
    path: '/my-library',
    element: <Library />,
    requiresAuth: true,
  },
  {
    path: '/watchlist',
    element: <Watchlist />,
    requiresAuth: true,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];

export default routes; 