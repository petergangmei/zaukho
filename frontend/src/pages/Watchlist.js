import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWatchlist, removeFromWatchlist } from '../config/redux/slices/watchlistSlice';
import { selectWatchlist, selectWatchlistLoading, selectWatchlistError } from '../config/redux/slices/watchlistSlice';
import { selectIsAuthenticated } from '../config/redux/slices/authSlice';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector(selectWatchlist);
  const isLoading = useSelector(selectWatchlistLoading);
  const error = useSelector(selectWatchlistError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWatchlist());
    } else {
      navigate('/login', { state: { from: '/watchlist' } });
    }
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemove = (id) => {
    dispatch(removeFromWatchlist(id))
      .unwrap()
      .then(() => {
        toast.success('Removed from watchlist');
      })
      .catch((err) => {
        toast.error(err || 'Failed to remove from watchlist');
      });
  };

  const handleViewDetails = (id) => {
    navigate(`/content/${id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Watchlist</h1>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Add movies and TV shows to your watchlist to keep track of what you want to watch.
            </p>
            <Button 
              onClick={() => navigate('/browse')} 
              variant="primary"
            >
              Browse Content
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {watchlist.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-900 rounded-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* Poster */}
                <div className="w-full md:w-48 h-64 md:h-auto flex-shrink-0">
                  <img 
                    src={item.poster_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        {item.type === 'movie' ? 'MOVIE' : 'TV SERIES'}
                      </span>
                      {item.rating && (
                        <span className="text-yellow-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          {item.rating}/10
                        </span>
                      )}
                      {item.release_year && (
                        <span className="text-gray-400">{item.release_year}</span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    {item.genres && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.genres.map(genre => (
                          <span key={genre} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button 
                      onClick={() => handleViewDetails(item.id)} 
                      variant="primary"
                      className="flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      View Details
                    </Button>
                    
                    <Button 
                      onClick={() => handleRemove(item.id)} 
                      variant="secondary"
                      className="flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist; 