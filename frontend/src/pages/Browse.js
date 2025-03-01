import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Content</h1>
        
        {/* Featured Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Item 1 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://dummyimage.com/600x400/333/fff" 
                alt="Featured Movie" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">The Dark Knight</h3>
                <p className="text-gray-300 text-sm mb-3">Action, Crime, Drama • 2008</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-700 text-xs px-2 py-1 rounded">HD</span>
                  <button className="text-accent hover:text-accent-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Featured Item 2 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://dummyimage.com/600x400/333/fff" 
                alt="Featured Movie" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Inception</h3>
                <p className="text-gray-300 text-sm mb-3">Action, Adventure, Sci-Fi • 2010</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-700 text-xs px-2 py-1 rounded">4K</span>
                  <button className="text-accent hover:text-accent-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Featured Item 3 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://dummyimage.com/600x400/333/fff" 
                alt="Featured Movie" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Interstellar</h3>
                <p className="text-gray-300 text-sm mb-3">Adventure, Drama, Sci-Fi • 2014</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-700 text-xs px-2 py-1 rounded">HD</span>
                  <button className="text-accent hover:text-accent-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Movies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`https://dummyimage.com/300x450/333/fff`}
                  alt={`Movie ${item}`}
                  className="w-full h-auto object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm font-medium truncate">Movie Title {item}</h3>
                  <p className="text-xs text-gray-400">2023</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Popular TV Shows */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Popular TV Shows</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`https://dummyimage.com/300x450/333/fff`}
                  alt={`TV Show ${item}`}
                  className="w-full h-auto object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm font-medium truncate">TV Show Title {item}</h3>
                  <p className="text-xs text-gray-400">2023</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Browse; 