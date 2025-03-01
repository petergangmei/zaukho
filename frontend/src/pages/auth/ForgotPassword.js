import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      // Reset form
      setEmail('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400 mb-6">
            Enter your email address and we'll send you instructions to reset your password
          </p>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-8"></div>
        </div>

        {success ? (
          <div className="bg-green-900/50 border border-green-500 text-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Password reset instructions have been sent to your email. Please check your inbox.</span>
            </div>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="your@email.com"
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white font-medium focus:outline-none ${
                  isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mt-6 text-sm">
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
                Back to Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-white">
                Need an account? Register
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-400 text-sm">
                If you continue to have issues, please{' '}
                <Link to="/contact" className="text-red-500 hover:text-red-400">
                  contact support
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 