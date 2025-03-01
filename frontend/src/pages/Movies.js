import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setMovies(mockMovies);
      setLoading(false);
    }, 800);
  }, []);

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
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Movies</h1>
        
        {/* Movies grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map(movie => (
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
      </div>
    </div>
  );
};

export default Movies; 