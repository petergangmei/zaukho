import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentById } from '../config/redux/slices/contentSlice';
import { createPurchase, createRental } from '../config/redux/slices/librarySlice';
import { addToWatchlist, removeFromWatchlist } from '../config/redux/slices/watchlistSlice';
import { selectContentDetails, selectContentLoading, selectContentError } from '../config/redux/slices/contentSlice';
import { selectWatchlist } from '../config/redux/slices/watchlistSlice';
import { selectIsAuthenticated } from '../config/redux/slices/authSlice';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content = useSelector(selectContentDetails);
  const isLoading = useSelector(selectContentLoading);
  const error = useSelector(selectContentError);
  const watchlist = useSelector(selectWatchlist);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showPurchaseOptions, setShowPurchaseOptions] = useState(false);

  // Check if content is in watchlist
  const isInWatchlist = watchlist.some(item => item.id === parseInt(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchContentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to add content to your watchlist');
      navigate('/login');
      return;
    }

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(id));
      toast.success('Removed from your watchlist');
    } else {
      dispatch(addToWatchlist(id));
      toast.success('Added to your watchlist');
    }
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to purchase content');
      navigate('/login');
      return;
    }

    dispatch(createPurchase({ content_id: id }))
      .unwrap()
      .then(() => {
        toast.success('Purchase successful!');
        setShowPurchaseOptions(false);
      })
      .catch((err) => {
        toast.error(err || 'Purchase failed. Please try again.');
      });
  };

  const handleRent = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to rent content');
      navigate('/login');
      return;
    }

    dispatch(createRental({ content_id: id }))
      .unwrap()
      .then(() => {
        toast.success('Rental successful!');
        setShowPurchaseOptions(false);
      })
      .catch((err) => {
        toast.error(err || 'Rental failed. Please try again.');
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Content not found</h1>
        <p className="text-gray-400 mb-8">The content you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')} variant="primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner */}
      <div 
        className="relative w-full h-[70vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${content.backdrop_url || content.poster_url})` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative h-full flex items-end pb-16">
          <div className="flex flex-col md:flex-row items-start gap-8 w-full">
            {/* Poster */}
            <div className="w-48 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={content.poster_url} 
                alt={content.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Content Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                  {content.type === 'movie' ? 'MOVIE' : 'TV SERIES'}
                </span>
                <span className="text-yellow-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  {content.rating}/10
                </span>
                <span className="text-gray-400">{content.release_year}</span>
                {content.duration && (
                  <span className="text-gray-400">{content.duration} min</span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
              
              {content.tagline && (
                <p className="text-xl text-gray-300 italic mb-4">{content.tagline}</p>
              )}
              
              <p className="text-gray-300 mb-6 max-w-3xl">{content.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {content.genres?.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setShowPurchaseOptions(true)} 
                  variant="primary"
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Watch Now
                </Button>
                
                <Button 
                  onClick={handleWatchlistToggle} 
                  variant="secondary"
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill={isInWatchlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                  {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Additional Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">About {content.title}</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Synopsis</h3>
              <p className="text-gray-300">{content.description}</p>
            </div>
            
            {content.cast && content.cast.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {content.cast.map(person => (
                    <div key={person.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        {person.profile_url ? (
                          <img src={person.profile_url} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-gray-400">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {content.crew && content.crew.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Crew</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.crew.map(person => (
                    <div key={person.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        {person.profile_url ? (
                          <img src={person.profile_url} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-sm text-gray-400">{person.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Details */}
          <div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Release Date</p>
                  <p>{content.release_date}</p>
                </div>
                
                {content.type === 'movie' && content.duration && (
                  <div>
                    <p className="text-gray-400 text-sm">Runtime</p>
                    <p>{content.duration} minutes</p>
                  </div>
                )}
                
                {content.type === 'tv' && content.seasons_count && (
                  <div>
                    <p className="text-gray-400 text-sm">Seasons</p>
                    <p>{content.seasons_count}</p>
                  </div>
                )}
                
                {content.type === 'tv' && content.episodes_count && (
                  <div>
                    <p className="text-gray-400 text-sm">Episodes</p>
                    <p>{content.episodes_count}</p>
                  </div>
                )}
                
                {content.director && (
                  <div>
                    <p className="text-gray-400 text-sm">Director</p>
                    <p>{content.director}</p>
                  </div>
                )}
                
                {content.production_company && (
                  <div>
                    <p className="text-gray-400 text-sm">Production</p>
                    <p>{content.production_company}</p>
                  </div>
                )}
                
                {content.country && (
                  <div>
                    <p className="text-gray-400 text-sm">Country</p>
                    <p>{content.country}</p>
                  </div>
                )}
                
                {content.language && (
                  <div>
                    <p className="text-gray-400 text-sm">Language</p>
                    <p>{content.language}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      {showPurchaseOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Watch {content.title}</h3>
              <button 
                onClick={() => setShowPurchaseOptions(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 border border-gray-700 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Purchase</h4>
                  <p className="text-gray-400 text-sm">Own forever</p>
                </div>
                <div className="text-xl font-bold">${content.purchase_price || '9.99'}</div>
              </div>
              
              <div className="p-4 border border-gray-700 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Rent</h4>
                  <p className="text-gray-400 text-sm">Watch within 48 hours</p>
                </div>
                <div className="text-xl font-bold">${content.rental_price || '3.99'}</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={handlePurchase} 
                variant="primary"
                className="flex-1"
              >
                Purchase
              </Button>
              <Button 
                onClick={handleRent} 
                variant="secondary"
                className="flex-1"
              >
                Rent
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails; 