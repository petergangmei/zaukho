import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormInput, Button } from '../../components/common';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Store user data in localStorage (in a real app, this would be handled by a backend)
        localStorage.setItem('user', JSON.stringify({
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          isAuthenticated: true
        }));
        
        toast.success('Registration successful! Welcome to ZAUKHO.');
        navigate('/browse');
      }, 1500);
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
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
            
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
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