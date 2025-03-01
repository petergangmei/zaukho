import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TVSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch TV series data
  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    const mockSeries = [
      { 
        id: 1, 
        title: 'Breaking Bad', 
        years: '2008-2013', 
        poster: 'https://via.placeholder.com/300x450?text=Breaking+Bad',
        rating: 9.5,
        genre: 'Crime, Drama, Thriller'
      },
      { 
        id: 2, 
        title: 'Game of Thrones', 
        years: '2011-2019', 
        poster: 'https://via.placeholder.com/300x450?text=Game+of+Thrones',
        rating: 9.2,
        genre: 'Action, Adventure, Drama'
      },
      { 
        id: 3, 
        title: 'The Wire', 
        years: '2002-2008', 
        poster: 'https://via.placeholder.com/300x450?text=The+Wire',
        rating: 9.3,
        genre: 'Crime, Drama, Thriller'
      },
      { 
        id: 4, 
        title: 'Stranger Things', 
        years: '2016-Present', 
        poster: 'https://via.placeholder.com/300x450?text=Stranger+Things',
        rating: 8.7,
        genre: 'Drama, Fantasy, Horror'
      },
      { 
        id: 5, 
        title: 'The Sopranos', 
        years: '1999-2007', 
        poster: 'https://via.placeholder.com/300x450?text=The+Sopranos',
        rating: 9.2,
        genre: 'Crime, Drama'
      },
      { 
        id: 6, 
        title: 'Chernobyl', 
        years: '2019', 
        poster: 'https://via.placeholder.com/300x450?text=Chernobyl',
        rating: 9.4,
        genre: 'Drama, History, Thriller'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setSeries(mockSeries);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading TV series...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">TV Series</h1>
        
        {/* TV Series grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map(show => (
            <div 
              key={show.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <Link to={`/tv-series/${show.id}`} className="block">
                <div className="relative">
                  <img 
                    src={show.poster} 
                    alt={show.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {show.rating}/10
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">{show.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{show.years}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{show.genre.split(',')[0]}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVSeries; 