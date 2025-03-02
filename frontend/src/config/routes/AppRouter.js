/**
 * AppRouter component
 * Main router component that renders all application routes
 */

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import routes from './index';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

/**
 * AppRouter component that renders all application routes
 * 
 * @returns {React.ReactNode} - The rendered router
 */
const AppRouter = () => {
  const location = useLocation();
  
  // Log current route for debugging
  console.log('Rendering AppRouter at path:', location.pathname);
  
  return (
    <Routes>
      {routes.map((route, index) => {
        // If route requires authentication
        if (route.requiresAuth) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              }
            />
          );
        }
        
        // If route is for guests only
        if (route.guestOnly) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <GuestRoute>
                  {route.element}
                </GuestRoute>
              }
            />
          );
        }
        
        // Regular route with no protection
        return (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
