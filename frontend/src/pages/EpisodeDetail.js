import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EpisodeDetail = () => {
  const { seriesId, seasonNumber, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch episode data
  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    // This simulates fetching both the series and specific episode data
    const mockSeries = {
      id: parseInt(seriesId),
      title: 'Breaking Bad',
      years: '2008-2013',
      poster: 'https://via.placeholder.com/600x900?text=Series+Poster',
      backdrop: 'https://via.placeholder.com/1200x600?text=Episode+Backdrop',
      genre: 'Crime, Drama, Thriller',
      creator: 'Vince Gilligan',
      seasons: [
        {
          number: 1,
          year: 2008,
          episodes: [
            { 
              number: 1, 
              title: 'Pilot', 
              duration: '58 min',
              airDate: 'Jan 20, 2008',
              director: 'Vince Gilligan',
              synopsis: 'After receiving a terminal cancer diagnosis, a high school chemistry teacher turns to a life of crime.',
              thumbnail: 'https://via.placeholder.com/400x225?text=Episode+Thumbnail',
              stillImage: 'https://via.placeholder.com/1200x675?text=Episode+Still',
              price: {
                rent: 1.99,
                buy: 2.99
              }
            },
            { 
              number: 2, 
              title: 'Cat\'s in the Bag...', 
              duration: '48 min',
              airDate: 'Jan 27, 2008',
              director: 'Adam Bernstein',
              synopsis: 'Walt and Jesse attempt to dispose of the bodies of two rivals but face complications.',
              thumbnail: 'https://via.placeholder.com/400x225?text=Episode+Thumbnail',
              stillImage: 'https://via.placeholder.com/1200x675?text=Episode+Still',
              price: {
                rent: 1.99,
                buy: 2.99
              }
            }
            // More episodes would be here
          ]
        },
        {
          number: 2,
          year: 2009,
          episodes: [
            { 
              number: 1, 
              title: 'Seven Thirty-Seven', 
              duration: '47 min',
              airDate: 'Mar 8, 2009',
              director: 'Bryan Cranston',
              synopsis: 'Walt and Jesse face the deadly consequences of their actions.',
              thumbnail: 'https://via.placeholder.com/400x225?text=Episode+Thumbnail',
              stillImage: 'https://via.placeholder.com/1200x675?text=Episode+Still',
              price: {
                rent: 1.99,
                buy: 2.99
              }
            }
            // More episodes would be here
          ]
        }
      ]
    };

    // Simulate API request delay
    setTimeout(() => {
      setSeries(mockSeries);
      
      // Find the specific season and episode
      const season = mockSeries.seasons.find(s => s.number === parseInt(seasonNumber));
      
      if (season) {
        const ep = season.episodes.find(e => e.number === parseInt(episodeNumber));
        
        if (ep) {
          setEpisode(ep);
          setLoading(false);
        } else {
          setError('Episode not found');
          setLoading(false);
        }
      } else {
        setError('Season not found');
        setLoading(false);
      }
    }, 800);
  }, [seriesId, seasonNumber, episodeNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading episode details...</div>
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

  if (!episode || !series) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-4">Episode not found</div>
        <Link to={`/tv-series/${seriesId}`} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Back to Series
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header with breadcrumb navigation */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link to="/tv-series" className="hover:text-white">TV Series</Link>
            <span className="mx-2">›</span>
            <Link to={`/tv-series/${seriesId}`} className="hover:text-white">{series.title}</Link>
            <span className="mx-2">›</span>
            <span>Season {seasonNumber}</span>
            <span className="mx-2">›</span>
            <span className="text-white">Episode {episodeNumber}</span>
          </div>
        </div>
      </div>

      {/* Video player section */}
      <div className="bg-black">
        <div className="container mx-auto">
          <div className="aspect-w-16 aspect-h-9 max-h-[70vh]">
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <img 
                src={episode.stillImage} 
                alt={episode.title}
                className="max-w-full max-h-full object-contain"
              />
              {/* Video player would be here in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-red-600/80 hover:bg-red-700 text-white rounded-full p-4 transform transition-transform hover:scale-110">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Episode title and basic info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">
                {episode.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                <span>Season {seasonNumber}, Episode {episodeNumber}</span>
                <span>•</span>
                <span>{episode.duration}</span>
                <span>•</span>
                <span>Aired: {episode.airDate}</span>
              </div>
            </div>

            {/* Episode synopsis */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
              <p className="text-gray-300">{episode.synopsis}</p>
            </div>

            {/* Episode details */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Director:</span>
                  <span className="text-white ml-2">{episode.director}</span>
                </div>
                <div>
                  <span className="text-gray-400">Air Date:</span>
                  <span className="text-white ml-2">{episode.airDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">Series:</span>
                  <span className="text-white ml-2">{series.title}</span>
                </div>
                <div>
                  <span className="text-gray-400">Genre:</span>
                  <span className="text-white ml-2">{series.genre}</span>
                </div>
              </div>
            </div>

            {/* Episode navigation */}
            <div className="flex justify-between mt-8">
              <button 
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition flex items-center"
                onClick={() => {
                  const prevEpNum = parseInt(episodeNumber) - 1;
                  if (prevEpNum >= 1) {
                    navigate(`/tv-series/${seriesId}/season/${seasonNumber}/episode/${prevEpNum}`);
                  }
                }}
                disabled={parseInt(episodeNumber) <= 1}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous Episode
              </button>
              <Link 
                to={`/tv-series/${seriesId}`} 
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition"
              >
                All Episodes
              </Link>
              <button 
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition flex items-center"
                onClick={() => {
                  const currentSeason = series.seasons.find(s => s.number === parseInt(seasonNumber));
                  const nextEpNum = parseInt(episodeNumber) + 1;
                  if (currentSeason && nextEpNum <= currentSeason.episodes.length) {
                    navigate(`/tv-series/${seriesId}/season/${seasonNumber}/episode/${nextEpNum}`);
                  }
                }}
              >
                Next Episode
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Watch options */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Watch Now</h2>
              <div className="space-y-4">
                <button 
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
                >
                  <span className="mr-2">Rent for ${episode.price.rent}</span>
                  <span className="text-xs text-red-200">48hr access</span>
                </button>
                <button 
                  className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300"
                >
                  Buy for ${episode.price.buy}
                </button>
                <div className="py-2 text-center text-sm text-gray-400 border-t border-gray-700 mt-2">
                  <Link to={`/tv-series/${seriesId}`} className="text-red-400 hover:text-red-300">
                    Buy complete season
                  </Link>
                </div>
              </div>
            </div>

            {/* More from this series */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">More From This Season</h2>
              <div className="space-y-3">
                {series.seasons
                  .find(s => s.number === parseInt(seasonNumber))
                  ?.episodes.slice(0, 5)
                  .map(ep => (
                    <Link 
                      key={ep.number}
                      to={`/tv-series/${seriesId}/season/${seasonNumber}/episode/${ep.number}`}
                      className={`flex items-center p-2 rounded-md ${
                        ep.number === parseInt(episodeNumber) 
                          ? 'bg-gray-700 border-l-4 border-red-500'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-900 rounded-full text-sm font-medium text-gray-300 mr-3">
                        {ep.number}
                      </div>
                      <div className="flex-1 truncate">
                        <h3 className="text-sm font-medium text-white">{ep.title}</h3>
                        <p className="text-xs text-gray-400">{ep.duration}</p>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail; 