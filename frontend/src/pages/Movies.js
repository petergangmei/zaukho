import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState({ min: 1970, max: 2023 });
  const [showFilters, setShowFilters] = useState(false);
  
  // All available genres from the movies (will be calculated from data)
  const [availableGenres, setAvailableGenres] = useState([]);

  // Fetch movies data
  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    const mockMovies = [
      { 
        id: 1, 
        title: 'The Shawshank Redemption', 
        year: 1994, 
        poster: 'https://via.placeholder.com/300x450?text=Shawshank',
        rating: 9.3,
        genre: 'Drama'
      },
      { 
        id: 2, 
        title: 'The Godfather', 
        year: 1972, 
        poster: 'https://via.placeholder.com/300x450?text=Godfather',
        rating: 9.2,
        genre: 'Crime, Drama'
      },
      { 
        id: 3, 
        title: 'The Dark Knight', 
        year: 2008, 
        poster: 'https://via.placeholder.com/300x450?text=Dark+Knight',
        rating: 9.0,
        genre: 'Action, Crime, Drama'
      },
      { 
        id: 4, 
        title: 'Pulp Fiction', 
        year: 1994, 
        poster: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
        rating: 8.9,
        genre: 'Crime, Drama'
      },
      { 
        id: 5, 
        title: 'The Lord of the Rings', 
        year: 2003, 
        poster: 'https://via.placeholder.com/300x450?text=LOTR',
        rating: 8.9,
        genre: 'Adventure, Fantasy'
      },
      { 
        id: 6, 
        title: 'Inception', 
        year: 2010, 
        poster: 'https://via.placeholder.com/300x450?text=Inception',
        rating: 8.8,
        genre: 'Action, Adventure, Sci-Fi'
      },
      { 
        id: 7, 
        title: 'The Matrix', 
        year: 1999, 
        poster: 'https://via.placeholder.com/300x450?text=Matrix',
        rating: 8.7,
        genre: 'Action, Sci-Fi'
      },
      { 
        id: 8, 
        title: 'Parasite', 
        year: 2019, 
        poster: 'https://via.placeholder.com/300x450?text=Parasite',
        rating: 8.6,
        genre: 'Drama, Thriller'
      },
      { 
        id: 9, 
        title: 'Interstellar', 
        year: 2014, 
        poster: 'https://via.placeholder.com/300x450?text=Interstellar',
        rating: 8.6,
        genre: 'Adventure, Drama, Sci-Fi'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setMovies(mockMovies);
      setFilteredMovies(mockMovies);
      
      // Extract all unique genres from the movies
      const allGenres = new Set();
      mockMovies.forEach(movie => {
        movie.genre.split(', ').forEach(genre => {
          allGenres.add(genre);
        });
      });
      setAvailableGenres(Array.from(allGenres).sort());
      
      // Find min and max years
      const years = mockMovies.map(movie => movie.year);
      setYearRange({
        min: Math.min(...years),
        max: Math.max(...years)
      });
      
      setLoading(false);
    }, 800);
  }, []);

  // Filter movies when search term or filters change
  useEffect(() => {
    if (!movies.length) return;
    
    let result = [...movies];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected genres
    if (selectedGenres.length > 0) {
      result = result.filter(movie => {
        const movieGenres = movie.genre.split(', ');
        return selectedGenres.some(genre => movieGenres.includes(genre));
      });
    }
    
    // Filter by year range
    result = result.filter(movie => 
      movie.year >= yearRange.min && movie.year <= yearRange.max
    );
    
    setFilteredMovies(result);
  }, [searchTerm, selectedGenres, yearRange, movies]);

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
    setYearRange({
      min: Math.min(...movies.map(movie => movie.year)),
      max: Math.max(...movies.map(movie => movie.year))
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading movies...</div>
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Movies</h1>
          
          {/* Search bar */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search movies..."
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
                
                {/* Year range filter */}
                <div>
                  <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-300">Year Range</h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">From</label>
                      <select 
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                        value={yearRange.min}
                        onChange={(e) => setYearRange({...yearRange, min: parseInt(e.target.value)})}
                      >
                        {Array.from({length: yearRange.max - 1969}, (_, i) => 1970 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">To</label>
                      <select 
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                        value={yearRange.max}
                        onChange={(e) => setYearRange({...yearRange, max: parseInt(e.target.value)})}
                      >
                        {Array.from({length: 2023 - yearRange.min + 1}, (_, i) => yearRange.min + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Results summary */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing {filteredMovies.length} of {movies.length} movies
            {(searchTerm || selectedGenres.length > 0) && ' with applied filters'}
          </div>
        </div>
        
        {/* Movies grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map(movie => (
              <div 
                key={movie.id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                <Link to={`/movies/${movie.id}`} className="block">
                  <div className="relative">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {movie.rating}/10
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1 truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{movie.year}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{movie.genre}</span>
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
            <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">No movies found</h3>
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

export default Movies; 