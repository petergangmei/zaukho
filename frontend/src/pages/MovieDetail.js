import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    const mockMovie = {
      id: parseInt(id),
      title: 'The Shawshank Redemption',
      year: 1994,
      poster: 'https://via.placeholder.com/600x900?text=Movie+Poster',
      backdrop: 'https://via.placeholder.com/1200x600?text=Movie+Backdrop',
      rating: 9.3,
      runtime: '142 min',
      genre: 'Drama',
      director: 'Frank Darabont',
      plot: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
      trailer: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
      price: {
        rent: 3.99,
        buy: 14.99
      }
    };

    // Simulate API request delay
    setTimeout(() => {
      setMovie(mockMovie);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading movie details...</div>
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

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-4">Movie not found</div>
        <Link to="/movies" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Movie Backdrop */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src={movie.backdrop}
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-10 md:pb-16">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="hidden md:block w-[200px] h-[300px] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.runtime}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                  <div className="flex items-center bg-yellow-500 text-white px-2 py-1 rounded">
                    <span className="font-bold">{movie.rating}</span>
                    <span className="text-xs ml-1">/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="md:hidden flex justify-center mb-8">
          <div className="w-[180px] h-[270px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Synopsis</h2>
              <p className="text-gray-700 dark:text-gray-300">{movie.plot}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="flex items-center justify-center h-full">
                  <a 
                    href={movie.trailer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 11.5V4.5L12 8l-7.5 3.5z"/>
                    </svg>
                    Watch Trailer
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Details</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Director:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{movie.director}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Release Year:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{movie.year}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Runtime:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{movie.runtime}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Genre:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{movie.genre}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Watch Now</h2>
              <div className="space-y-4">
                <button 
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
                >
                  <span className="mr-2">Rent for ${movie.price.rent}</span>
                  <span className="text-xs text-blue-200">48hr access</span>
                </button>
                <button 
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-300"
                >
                  Buy for ${movie.price.buy}
                </button>
                <button 
                  className="w-full py-3 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 