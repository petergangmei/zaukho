import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for purchased and rented content
const libraryContent = [
  {
    id: 1,
    title: "Dune",
    type: "movie",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-12-15",
    expiryDate: null, // null means purchased, not rented
    price: 14.99
  },
  {
    id: 2,
    title: "No Time to Die",
    type: "movie",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-11-20",
    expiryDate: "2024-03-20", // expiry date for rentals
    price: 5.99
  },
  {
    id: 3,
    title: "Stranger Things",
    type: "series",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-10-05",
    expiryDate: null,
    price: 29.99,
    seasons: 4
  },
  {
    id: 4,
    title: "The Witcher",
    type: "series",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-09-18",
    expiryDate: "2024-03-18",
    price: 9.99,
    seasons: 2
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    type: "movie",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-08-30",
    expiryDate: null,
    price: 12.99
  },
  {
    id: 6,
    title: "Breaking Bad",
    type: "series",
    poster: "https://dummyimage.com/300x450",
    purchaseDate: "2023-07-12",
    expiryDate: null,
    price: 39.99,
    seasons: 5
  }
];

const MyLibrary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'purchased', 'rented', 'movies', 'series'
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setContent(libraryContent);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter content based on selected filter
  const filteredContent = content.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'purchased') return item.expiryDate === null;
    if (filter === 'rented') return item.expiryDate !== null;
    if (filter === 'movies') return item.type === 'movie';
    if (filter === 'series') return item.type === 'series';
    return true;
  });
  
  // Check if content is expiring soon (within 3 days)
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };
  
  // Check if content has expired
  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">My Library</h1>
          <p className="text-gray-300">Access your purchased and rented content</p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('purchased')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'purchased' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Purchased
            </button>
            <button 
              onClick={() => setFilter('rented')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'rented' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Rented
            </button>
            <button 
              onClick={() => setFilter('movies')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'movies' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Movies
            </button>
            <button 
              onClick={() => setFilter('series')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'series' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              TV Series
            </button>
          </div>
        </div>
      </section>
      
      {/* Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <p className="text-xl text-gray-400 mb-4">No items found in your library</p>
              <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition">
                Browse Content
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredContent.map(item => (
                <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden group relative transform hover:scale-105 transition duration-300">
                  {/* Status badges */}
                  {item.expiryDate === null && (
                    <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      Owned
                    </div>
                  )}
                  {isExpiringSoon(item.expiryDate) && (
                    <div className="absolute top-2 left-2 z-10 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                      Expires Soon
                    </div>
                  )}
                  {isExpired(item.expiryDate) && (
                    <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Expired
                    </div>
                  )}
                  {!isExpired(item.expiryDate) && item.expiryDate && (
                    <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      Rented
                    </div>
                  )}
                  
                  <Link 
                    to={item.type === 'movie' ? `/movies/${item.id}` : `/tv-series/${item.id}`} 
                    className="block relative aspect-w-2 aspect-h-3"
                  >
                    <img 
                      src={item.poster} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded flex items-center justify-center gap-2 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-gray-400 text-sm">
                        {item.type === 'movie' ? 'Movie' : `${item.seasons} Seasons`}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                    {item.expiryDate && !isExpired(item.expiryDate) && (
                      <div className="mt-2 text-sm text-gray-400">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyLibrary; 