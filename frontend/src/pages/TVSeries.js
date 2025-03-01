import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TVSeries = () => {
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // all, ended, ongoing
  const [showFilters, setShowFilters] = useState(false);
  
  // All available genres from the series (will be calculated from data)
  const [availableGenres, setAvailableGenres] = useState([]);

  // Fetch TV series data
  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    const mockSeries = [
      { 
        id: 1, 
        title: 'Breaking Bad', 
        years: '2008-2013', 
        poster: 'https://dummyimage.com/300x450',
        rating: 9.5,
        genre: 'Crime, Drama, Thriller',
        status: 'ended'
      },
      { 
        id: 2, 
        title: 'Game of Thrones', 
        years: '2011-2019', 
        poster: 'https://dummyimage.com/300x450',
        rating: 9.2,
        genre: 'Action, Adventure, Drama',
        status: 'ended'
      },
      { 
        id: 3, 
        title: 'The Wire', 
        years: '2002-2008', 
        poster: 'https://dummyimage.com/300x450',
        rating: 9.3,
        genre: 'Crime, Drama, Thriller',
        status: 'ended'
      },
      { 
        id: 4, 
        title: 'Stranger Things', 
        years: '2016-Present', 
        poster: 'https://dummyimage.com/300x450',
        rating: 8.7,
        genre: 'Drama, Fantasy, Horror',
        status: 'ongoing'
      },
      { 
        id: 5, 
        title: 'The Sopranos', 
        years: '1999-2007', 
        poster: 'https://dummyimage.com/300x450',
        rating: 9.2,
        genre: 'Crime, Drama',
        status: 'ended'
      },
      { 
        id: 6, 
        title: 'Chernobyl', 
        years: '2019', 
        poster: 'https://dummyimage.com/300x450',
        rating: 9.4,
        genre: 'Drama, History, Thriller',
        status: 'ended'
      },
      { 
        id: 7, 
        title: 'The Mandalorian', 
        years: '2019-Present', 
        poster: 'https://dummyimage.com/300x450',
        rating: 8.8,
        genre: 'Action, Adventure, Fantasy',
        status: 'ongoing'
      },
      { 
        id: 8, 
        title: 'The Boys', 
        years: '2019-Present', 
        poster: 'https://dummyimage.com/300x450',
        rating: 8.7,
        genre: 'Action, Comedy, Crime',
        status: 'ongoing'
      },
      { 
        id: 9, 
        title: 'Dark', 
        years: '2017-2020', 
        poster: 'https://dummyimage.com/300x450',
        rating: 8.7,
        genre: 'Drama, Mystery, Sci-Fi',
        status: 'ended'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setSeries(mockSeries);
      setFilteredSeries(mockSeries);
      
      // Extract all unique genres from the series
      const allGenres = new Set();
      mockSeries.forEach(show => {
        show.genre.split(', ').forEach(genre => {
          allGenres.add(genre);
        });
      });
      setAvailableGenres(Array.from(allGenres).sort());
      
      setLoading(false);
    }, 800);
  }, []);

  // Filter series when search term or filters change
  useEffect(() => {
    if (!series.length) return;
    
    let result = [...series];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(show => 
        show.title.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected genres
    if (selectedGenres.length > 0) {
      result = result.filter(show => {
        const showGenres = show.genre.split(', ');
        return selectedGenres.some(genre => showGenres.includes(genre));
      });
    }
    
    // Filter by status (ongoing/ended)
    if (statusFilter !== 'all') {
      result = result.filter(show => show.status === statusFilter);
    }
    
    setFilteredSeries(result);
  }, [searchTerm, selectedGenres, statusFilter, series]);

  // Handle genre selection/deselection
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setStatusFilter('all');
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">TV Series</h1>
          
          {/* Search bar */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search TV series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            <button 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters section */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Genre filter */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableGenres.map(genre => (
                      <button
                        key={genre}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedGenres.includes(genre)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        } hover:opacity-90 transition-colors`}
                        onClick={() => handleGenreToggle(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Status filter */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">Status</h3>
                  <div className="flex space-x-3">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        statusFilter === 'all'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      } hover:opacity-90 transition-colors`}
                      onClick={() => setStatusFilter('all')}
                    >
                      All
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        statusFilter === 'ongoing'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      } hover:opacity-90 transition-colors`}
                      onClick={() => setStatusFilter('ongoing')}
                    >
                      Ongoing
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        statusFilter === 'ended'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      } hover:opacity-90 transition-colors`}
                      onClick={() => setStatusFilter('ended')}
                    >
                      Ended
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Results summary */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {filteredSeries.length} of {series.length} TV series
            {(searchTerm || selectedGenres.length > 0 || statusFilter !== 'all') && ' with applied filters'}
          </div>
        </div>
        
        {/* TV Series grid */}
        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredSeries.map(show => (
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
                    {show.status === 'ongoing' && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Ongoing
                      </div>
                    )}
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
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">No TV series found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search term</p>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVSeries; 