import React from 'react';
import { Link } from 'react-router-dom';
// Using Tailwind CSS for styling instead of SCSS

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h5 className="text-white text-lg font-medium mb-4">ZAUKHO</h5>
            <p className="text-gray-400 text-sm mb-4">
              Your premier destination for movies and TV shows. 
              Stream, rent, or buy the latest entertainment content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Explore Links */}
          <div>
            <h5 className="text-white text-lg font-medium mb-4">Explore</h5>
            <ul className="space-y-2">
              <li><Link to="/movies" className="text-gray-400 hover:text-white transition-colors text-sm">Movies</Link></li>
              <li><Link to="/tv-series" className="text-gray-400 hover:text-white transition-colors text-sm">TV Shows</Link></li>
              <li><Link to="/new-releases" className="text-gray-400 hover:text-white transition-colors text-sm">New Releases</Link></li>
              <li><Link to="/coming-soon" className="text-gray-400 hover:text-white transition-colors text-sm">Coming Soon</Link></li>
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h5 className="text-white text-lg font-medium mb-4">About</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h5 className="text-white text-lg font-medium mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Refund Policy</Link></li>
              <li><Link to="/cancellation-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Zaukho. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-gray-400">
              <svg className="w-8 h-5" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="24" rx="4" fill="#1A1F71"/>
                <path d="M15.4 15.8H13.4L14.8 8.2H16.8L15.4 15.8Z" fill="white"/>
                <path d="M22.8 8.4C22.4 8.2 21.8 8 21 8C19 8 17.6 9.2 17.6 10.8C17.6 12 18.6 12.6 19.4 13C20.2 13.4 20.4 13.6 20.4 14C20.4 14.6 19.8 14.8 19.2 14.8C18.4 14.8 18 14.6 17.2 14.2L17 14L16.6 15.8C17 16 17.8 16.2 18.6 16.2C20.8 16.2 22 15 22 13.2C22 12.2 21.4 11.4 20.2 10.8C19.4 10.4 19 10.2 19 9.8C19 9.4 19.4 9 20.2 9C20.8 9 21.2 9.2 21.6 9.4L21.8 9.4L22.8 8.4Z" fill="white"/>
                <path d="M25.6 8.2H24C23.6 8.2 23.2 8.4 23 8.8L20.2 15.8H22.4C22.4 15.8 22.8 14.8 22.8 14.6C23 14.6 24.8 14.6 25 14.6C25 14.8 25.2 15.8 25.2 15.8H27.2L25.6 8.2ZM23.4 13C23.6 12.4 24.2 10.8 24.2 10.8C24.2 10.8 24.4 10.2 24.4 10C24.6 10.2 24.8 10.8 24.8 10.8L25.2 13H23.4Z" fill="white"/>
                <path d="M10.8 8.2L8.8 13.2L8.6 12.4C8 10.8 6.6 9.4 5 8.6L6.8 15.8H9L12.8 8.2H10.8Z" fill="white"/>
                <path d="M7.2 9H4.2L4 9.2C6.4 9.8 8 11.2 8.6 13L7.8 9.4C7.8 9.2 7.6 9 7.2 9Z" fill="#F9A51A"/>
              </svg>
            </span>
            <span className="text-gray-400">
              <svg className="w-8 h-5" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="24" rx="4" fill="#252525"/>
                <path d="M22.2 12C22.2 14.8 19.8 17 17 17C14.2 17 11.8 14.8 11.8 12C11.8 9.2 14.2 7 17 7C19.8 7 22.2 9.2 22.2 12Z" fill="#EB001B"/>
                <path d="M24.2 12C24.2 14.8 21.8 17 19 17C17.8 17 16.8 16.6 16 15.8C17 14.8 17.6 13.4 17.6 12C17.6 10.6 17 9.2 16 8.2C16.8 7.4 17.8 7 19 7C21.8 7 24.2 9.2 24.2 12Z" fill="#FF5F00"/>
                <path d="M24.2 12C24.2 14.8 21.8 17 19 17C17.8 17 16.8 16.6 16 15.8C17 14.8 17.6 13.4 17.6 12C17.6 10.6 17 9.2 16 8.2C16.8 7.4 17.8 7 19 7C21.8 7 24.2 9.2 24.2 12Z" fill="#FF5F00"/>
                <path d="M24.2 12C24.2 14.8 21.8 17 19 17C17.8 17 16.8 16.6 16 15.8C17.2 14.6 18 13.4 18 12C18 10.6 17.2 9.4 16 8.2C16.8 7.4 17.8 7 19 7C21.8 7 24.2 9.2 24.2 12Z" fill="#F79E1B"/>
              </svg>
            </span>
            <span className="text-gray-400">
              <svg className="w-8 h-5" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="24" rx="4" fill="#003087"/>
                <path d="M15.2 10.4H13.6C13.4 10.4 13.2 10.6 13.2 10.8L12.4 15.2C12.4 15.4 12.6 15.4 12.6 15.4H13.4C13.6 15.4 13.8 15.2 13.8 15L14 14H15.4C15.6 14 15.8 14.2 15.8 14.4L16 15C16 15.2 16.2 15.4 16.4 15.4H17.2C17.4 15.4 17.4 15.2 17.4 15.2L16.6 10.8C16.4 10.6 16.2 10.4 16 10.4H15.2ZM14.2 13.2L14.4 12C14.4 12 14.6 11.2 14.6 11C14.8 11.2 15.2 11.2 15.2 11.2H15.4L15 13.2H14.2Z" fill="white"/>
                <path d="M22.2 10.4H21.4C21.2 10.4 21 10.6 21 10.8L20.2 15.2C20.2 15.4 20.4 15.4 20.4 15.4H21.2C21.4 15.4 21.6 15.2 21.6 15L22.4 10.8C22.4 10.6 22.4 10.4 22.2 10.4Z" fill="white"/>
                <path d="M19.6 10.4H18.8C18.6 10.4 18.4 10.6 18.4 10.8L17.6 15.2C17.6 15.4 17.8 15.4 17.8 15.4H18.6C18.8 15.4 19 15.2 19 15L19.2 14C19.2 13.8 19.4 13.6 19.6 13.6H20.4C21.2 13.6 21.8 13 21.8 12.2C21.8 11.8 21.6 11.4 21.4 11.2C21 10.6 20.4 10.4 19.6 10.4ZM20.2 12.2C20.2 12.6 19.8 12.8 19.4 12.8H19.2L19.4 11.2C19.4 11 19.6 11 19.6 11C20 11 20.2 11.2 20.2 11.6V12.2Z" fill="white"/>
              </svg>
            </span>
            <span className="text-gray-400">
              <svg className="w-8 h-5" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="24" rx="4" fill="#000000"/>
                <path d="M18 7.6C14.4 7.6 11.6 10.4 11.6 14C11.6 17.6 14.4 20.4 18 20.4C21.6 20.4 24.4 17.6 24.4 14C24.4 10.4 21.6 7.6 18 7.6ZM18 18.8C15.2 18.8 13.2 16.8 13.2 14C13.2 11.2 15.2 9.2 18 9.2C20.8 9.2 22.8 11.2 22.8 14C22.8 16.8 20.8 18.8 18 18.8Z" fill="white"/>
                <path d="M20.4 14C20.4 15.4 19.4 16.4 18 16.4C16.6 16.4 15.6 15.4 15.6 14C15.6 12.6 16.6 11.6 18 11.6C19.4 11.6 20.4 12.6 20.4 14Z" fill="white"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 