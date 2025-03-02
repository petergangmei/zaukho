import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput, Button } from '../../components/common';
import { login, selectAuth, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(selectAuth) || { loading: false };
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/browse';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (dispatch) {
        dispatch(clearError());
      }
    };
  }, [dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Create login data with email only (backend will handle it)
        const loginData = {
          email: formData.email,
          password: formData.password
        };
        
        console.log('Submitting login form with data:', { ...loginData, password: '***' });
        const result = await dispatch(login(loginData)).unwrap();
        console.log('Login dispatch result:', result);
        
        // Check if we have the expected data
        if (!result || !result.token) {
          console.error('Login succeeded but returned invalid data:', result);
          // Handle this edge case
          setValidationErrors({
            ...validationErrors,
            general: 'Login succeeded but returned invalid data. Please try again.'
          });
          return;
        }
        
        // Success toast is handled in the auth slice
        console.log('Login successful, redirecting...');
        
        // Force a navigation to the browse page
        const from = location.state?.from?.pathname || '/browse';
        navigate(from, { replace: true });
      } catch (err) {
        // Error toast is handled in the auth slice
        console.error('Login failed:', err);
        
        // If there's an error that wasn't handled by the slice
        if (!err.message && !err.response) {
          console.error('Unexpected error during login:', err);
          setValidationErrors({
            ...validationErrors,
            general: 'An unexpected error occurred. Please try again.'
          });
        }
      }
    }
  };

  // Handle demo login
  const handleDemoLogin = async () => {
    try {
      console.log('Attempting demo login');
      const result = await dispatch(login({
        email: 'demo@example.com',
        password: 'password123'
      })).unwrap();
      
      console.log('Demo login dispatch result:', result);
      
      // Check if we have the expected data
      if (!result || !result.token) {
        console.error('Demo login succeeded but returned invalid data:', result);
        // Handle this edge case
        setValidationErrors({
          ...validationErrors,
          general: 'Login succeeded but returned invalid data. Please try again.'
        });
        return;
      }
      
      // Success toast is handled in the auth slice
      console.log('Demo login successful, redirecting...');
      
      // Force a navigation to the browse page
      const from = location.state?.from?.pathname || '/browse';
      navigate(from, { replace: true });
    } catch (err) {
      // Error toast is handled in the auth slice
      console.error('Demo login failed:', err);
      
      // If there's an error that wasn't handled by the slice
      if (!err.message && !err.response) {
        console.error('Unexpected error during demo login:', err);
        setValidationErrors({
          ...validationErrors,
          general: 'An unexpected error occurred. Please try again.'
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{
          backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/a1dc92ca-091d-4ca9-a05b-8cd44bbfce6a/f9368347-e982-4856-a5a4-396796381f28/RS-en-20191230-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Content */}
      <div className="w-full max-w-md z-10 relative">
        <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-xl border border-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="mt-2 text-gray-400">Welcome back to ZAUKHO</p>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-800 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* General validation error */}
          {validationErrors.general && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-800 rounded text-red-200 text-sm">
              {validationErrors.general}
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
              required
            />
            
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="text-gray-400 hover:text-red-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Sign In
              </Button>
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">Or</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Try Demo Account
            </Button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              New to ZAUKHO?{' '}
              <Link to="/register" className="text-red-600 hover:text-red-500 font-medium">
                Sign up now
              </Link>
            </p>
            
            <p className="mt-4 text-xs text-gray-500">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 