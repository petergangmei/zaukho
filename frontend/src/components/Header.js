import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, selectAuth, selectUser } from '../config/redux/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth) || { isAuthenticated: false };
  const user = useSelector(selectUser);
  
  // State to track if dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State to track if mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State to track scroll position for background change
  const [isScrolled, setIsScrolled] = useState(false);
  // Ref for dropdown menu
  const dropdownRef = useRef(null);
  
  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout function
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      // Navigate to home page
      navigate('/');
      setDropdownOpen(false);
      // Toast is handled in the logout action
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  // Function to determine active link style - Netflix style
  const getLinkClass = ({ isActive }) => {
    return isActive 
      ? "text-white font-medium no-underline"
      : "text-gray-300 hover:text-white transition-colors duration-300 no-underline";
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName) {
      return firstName[0].toUpperCase();
    } else if (user.username) {
      return user.username[0].toUpperCase();
    } else {
      return 'U';
    }
  };
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black via-black/80 to-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-red-600 text-3xl font-bold no-underline">
            ZAUKHO
          </Link>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/browse" className={getLinkClass}>
                  Browse
                </NavLink>
                <NavLink to="/movies" className={getLinkClass}>
                  Movies
                </NavLink>
                <NavLink to="/tv-series" className={getLinkClass}>
                  TV Shows
                </NavLink>
                <NavLink to="/my-library" className={getLinkClass}>
                  My List
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/pricing" className={getLinkClass}>
                  Plans
                </NavLink>
                <NavLink to="/about" className={getLinkClass}>
                  About
                </NavLink>
              </>
            )}
          </nav>
          
          {/* Right side items - Search, Notifications, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            {isAuthenticated && (
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          
            {/* User Profile - Desktop */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    className="flex items-center space-x-2 text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{getUserInitials()}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu - Netflix Style */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-black/90 border border-gray-800 rounded shadow-lg overflow-hidden z-50">
                      <div className="py-1">
                        <div className="border-b border-gray-800 pb-1">
                          <p className="px-4 py-2 text-sm text-gray-400">{user?.username || 'User'}</p>
                        </div>
                        <NavLink to="/my-library" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                          My List
                        </NavLink>
                        <NavLink to="/profile-settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                          Account
                        </NavLink>
                        <NavLink to="/transaction-history" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                          Billing
                        </NavLink>
                        <div className="border-t border-gray-800 mt-1"></div>
                        <button 
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                          onClick={handleLogout}
                        >
                          Sign Out of ZAUKHO
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink to="/login" className="text-white hover:text-gray-300 transition-colors no-underline">
                    Sign In
                  </NavLink>
                  <NavLink to="/register" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors no-underline">
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation - Netflix Style Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black z-50 overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <Link to="/" className="text-red-600 text-3xl font-bold no-underline">
                ZAUKHO
              </Link>
              <button 
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-900 rounded-lg">
                    <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{getUserInitials()}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.username || 'User'}</p>
                      <button 
                        className="text-sm text-gray-400 hover:text-white"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                  
                  <NavLink 
                    to="/browse" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse
                  </NavLink>
                  <NavLink 
                    to="/movies" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Movies
                  </NavLink>
                  <NavLink 
                    to="/tv-series" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    TV Shows
                  </NavLink>
                  <NavLink 
                    to="/my-library" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My List
                  </NavLink>
                  <NavLink 
                    to="/profile-settings" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink 
                    to="/pricing" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Plans
                  </NavLink>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => `block py-3 px-4 text-lg ${isActive ? 'text-white bg-gray-900 rounded' : 'text-gray-300'} no-underline`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                  <div className="mt-6 flex flex-col space-y-3">
                    <NavLink 
                      to="/login" 
                      className="bg-transparent border border-gray-700 text-white py-3 px-4 rounded-md text-center no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink 
                      to="/register" 
                      className="bg-red-600 text-white py-3 px-4 rounded-md text-center no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 