import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('purchased');
  const [purchasedContent, setPurchasedContent] = useState([]);
  const [rentedContent, setRentedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's library from API (will implement actual API call later)
  useEffect(() => {
    // Check if user is logged in 
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      setError('You need to be logged in to view your library');
      setLoading(false);
      return;
    }
    
    // Mock data for now
    const mockPurchased = [
      { id: 1, title: 'The Shawshank Redemption', type: 'movie', year: 1994, poster: 'https://via.placeholder.com/300x450?text=Movie+1', purchaseDate: '2023-05-15' },
      { id: 3, title: 'Breaking Bad', type: 'series', year: '2008-2013', poster: 'https://via.placeholder.com/300x450?text=TV+Series+1', purchaseDate: '2023-06-10' },
      { id: 5, title: 'Pulp Fiction', type: 'movie', year: 1994, poster: 'https://via.placeholder.com/300x450?text=Movie+5', purchaseDate: '2023-07-05' }
    ];
    
    const mockRented = [
      { id: 2, title: 'The Godfather', type: 'movie', year: 1972, poster: 'https://via.placeholder.com/300x450?text=Movie+2', rentalExpiry: '2023-08-15' },
      { id: 4, title: 'Game of Thrones', type: 'series', year: '2011-2019', poster: 'https://via.placeholder.com/300x450?text=TV+Series+2', rentalExpiry: '2023-08-20' }
    ];

    // Simulate API fetch delay
    setTimeout(() => {
      setPurchasedContent(mockPurchased);
      setRentedContent(mockRented);
      setLoading(false);
    }, 800);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20 text-lg">Loading your library...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Login</Link>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Library</h1>
        
        <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`py-3 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'purchased' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('purchased')}
          >
            Purchased
          </button>
          <button 
            className={`py-3 px-6 font-medium text-sm focus:outline-none ${
              activeTab === 'rented' 
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('rented')}
          >
            Rented
          </button>
        </div>
        
        {activeTab === 'purchased' && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">My Purchases</h2>
            {purchasedContent.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">You haven't purchased any content yet.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/movies" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Browse Movies</Link>
                  <Link to="/tv-series" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Browse TV Series</Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {purchasedContent.map(item => (
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300" key={`${item.type}-${item.id}`}>
                    <Link to={item.type === 'movie' ? `/movies/${item.id}` : `/tv-series/${item.id}`}>
                      <div className="relative">
                        <img src={item.poster} alt={item.title} className="w-full h-auto object-cover" />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {item.type === 'movie' ? 'Movie' : 'TV Series'}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.year}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Purchased on {formatDate(item.purchaseDate)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rented' && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">My Rentals</h2>
            {rentedContent.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">You haven't rented any content yet.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/movies" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Browse Movies</Link>
                  <Link to="/tv-series" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300">Browse TV Series</Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {rentedContent.map(item => (
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300" key={`${item.type}-${item.id}`}>
                    <Link to={item.type === 'movie' ? `/movies/${item.id}` : `/tv-series/${item.id}`}>
                      <div className="relative">
                        <img src={item.poster} alt={item.title} className="w-full h-auto object-cover" />
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {item.type === 'movie' ? 'Movie' : 'TV Series'}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.year}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Available until {formatDate(item.rentalExpiry)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary; 