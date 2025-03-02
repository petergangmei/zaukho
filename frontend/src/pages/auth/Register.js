import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput, Button } from '../../components/common';
import { register, selectAuth, clearError } from '../../config/redux/slices/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(selectAuth) || { loading: false };
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: ''
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
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
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
    
    // Confirm password validation
    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Please confirm your password';
    } else if (formData.password_confirm !== formData.password) {
      newErrors.password_confirm = 'Passwords do not match';
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Split name into first_name and last_name if they're not provided
        if (!formData.first_name && !formData.last_name && formData.username) {
          const nameParts = formData.username.split(' ');
          if (nameParts.length > 1) {
            formData.first_name = nameParts[0];
            formData.last_name = nameParts.slice(1).join(' ');
          } else {
            formData.first_name = formData.username;
          }
        }
        
        const result = await dispatch(register(formData)).unwrap();
        // Success toast is handled in the auth slice
        console.log('Registration successful:', result);
      } catch (err) {
        // Error toast is handled in the auth slice
        console.error('Registration failed:', err);
        // If there's an error that wasn't handled by the slice
        if (!err.message && !err.response) {
          console.error('Unexpected error during registration');
        }
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
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-gray-400">Join ZAUKHO for unlimited entertainment</p>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-800 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="username"
              name="username"
              type="text"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              error={validationErrors.username}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id="first_name"
                name="first_name"
                type="text"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                error={validationErrors.first_name}
              />
              
              <FormInput
                id="last_name"
                name="last_name"
                type="text"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                error={validationErrors.last_name}
              />
            </div>
            
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
            
            <FormInput
              id="password_confirm"
              name="password_confirm"
              type="password"
              label="Confirm Password"
              value={formData.password_confirm}
              onChange={handleChange}
              error={validationErrors.password_confirm}
              required
            />
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Sign Up
              </Button>
            </div>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 hover:text-red-500 font-medium">
                Sign In
              </Link>
            </p>
            
            <p className="mt-4 text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-gray-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-gray-400 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 