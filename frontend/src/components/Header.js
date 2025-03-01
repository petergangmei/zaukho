import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Remove SCSS import since we'll use Tailwind CSS
// import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  // State to track if user is logged in (check localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  // State to track if dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State to track if mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State to track scroll position for background change
  const [isScrolled, setIsScrolled] = useState(false);
  // Ref for dropdown menu
  const dropdownRef = useRef(null);
  // Get current location for active link
  const location = useLocation();
  
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

  // Check auth status on mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };
    
    // Check on mount
    checkAuthStatus();
    
    // Listen for storage events (in case another tab logs out)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  // Handle logout function
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setDropdownOpen(false);
    
    // Navigate to home page
    navigate('/');
    
    // Show success message
    toast.success('Logged out successfully');
  };

  // Function to determine active link style
  const getLinkClass = ({ isActive }) => {
    return isActive 
      ? "text-primary font-medium no-underline"
      : "text-gray-300 hover:text-white transition-colors no-underline";
  };
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-accent text-3xl font-bold no-underline">
            ZAUKHO
          </Link>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
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
                  My Library
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/pricing" className={getLinkClass}>
                  Pricing
                </NavLink>
                <NavLink to="/about" className={getLinkClass}>
                  About
                </NavLink>
              </>
            )}
          </nav>
          
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
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-2 text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">JD</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Dropdown Menu - Netflix Style */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded shadow-lg overflow-hidden z-50">
                    <div className="py-1">
                      <div className="border-b border-gray-800 pb-1">
                        <p className="px-4 py-2 text-sm text-gray-400">John Doe</p>
                      </div>
                      <NavLink to="/my-library" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                        My Library
                      </NavLink>
                      <NavLink to="/profile-settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                        Profile Settings
                      </NavLink>
                      <NavLink to="/transaction-history" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 no-underline">
                        Transaction History
                      </NavLink>
                      <div className="border-t border-gray-800 mt-1"></div>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                        onClick={handleLogout}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors no-underline">
                  Sign In
                </Link>
                <Link to="/register" className="bg-accent text-white px-4 py-1 rounded hover:bg-accent-dark transition-colors no-underline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation - Netflix Style Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black z-50 pt-16">
            <div className="p-4">
              <nav className="flex flex-col space-y-4">
                {isLoggedIn ? (
                  <>
                    <NavLink 
                      to="/browse" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/browse' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse
                    </NavLink>
                    <NavLink 
                      to="/movies" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/movies' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Movies
                    </NavLink>
                    <NavLink 
                      to="/tv-series" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/tv-series' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      TV Shows
                    </NavLink>
                    <NavLink 
                      to="/my-library" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/my-library' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Library
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink 
                      to="/" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </NavLink>
                    <NavLink 
                      to="/pricing" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/pricing' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </NavLink>
                    <NavLink 
                      to="/about" 
                      className={`text-lg py-2 no-underline ${location.pathname === '/about' ? 'text-white font-medium' : 'text-gray-300'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </NavLink>
                  </>
                )}
              </nav>
              
              {/* Auth Buttons - Mobile */}
              <div className="mt-8 pt-4 border-t border-gray-800">
                {isLoggedIn ? (
                  <>
                    <div className="py-3 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">JD</span>
                      </div>
                      <span className="text-white font-medium">John Doe</span>
                    </div>
                    <div className="mt-4 flex flex-col space-y-4">
                      <NavLink 
                        to="/profile-settings" 
                        className="py-2 text-gray-300 hover:text-white no-underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile Settings
                      </NavLink>
                      <NavLink 
                        to="/transaction-history" 
                        className="py-2 text-gray-300 hover:text-white no-underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Transaction History
                      </NavLink>
                      <button 
                        className="py-2 text-gray-300 hover:text-white text-left"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 mt-4">
                    <Link 
                      to="/login" 
                      className="py-2 text-gray-300 hover:text-white no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register" 
                      className="py-2 bg-accent text-white rounded text-center hover:bg-accent-dark no-underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 