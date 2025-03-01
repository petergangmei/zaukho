import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TVSeriesDetail = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for now - will be replaced with API call later
    const mockSeries = {
      id: parseInt(id),
      title: 'Breaking Bad',
      years: '2008-2013',
      poster: 'https://via.placeholder.com/600x900?text=Series+Poster',
      backdrop: 'https://via.placeholder.com/1200x600?text=Series+Backdrop',
      rating: 9.5,
      runtime: '49 min per episode',
      genre: 'Crime, Drama, Thriller',
      creator: 'Vince Gilligan',
      plot: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
      cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Dean Norris'],
      trailer: 'https://www.youtube.com/watch?v=HhesaQXLuRY',
      seasons: [
        {
          number: 1,
          year: 2008,
          episodes: [
            { number: 1, title: 'Pilot', duration: '58 min' },
            { number: 2, title: 'Cat\'s in the Bag...', duration: '48 min' },
            { number: 3, title: 'And the Bag\'s in the River', duration: '48 min' },
            { number: 4, title: 'Cancer Man', duration: '48 min' },
            { number: 5, title: 'Gray Matter', duration: '48 min' },
            { number: 6, title: 'Crazy Handful of Nothin\'', duration: '47 min' },
            { number: 7, title: 'A No-Rough-Stuff-Type Deal', duration: '47 min' }
          ]
        },
        {
          number: 2,
          year: 2009,
          episodes: [
            { number: 1, title: 'Seven Thirty-Seven', duration: '47 min' },
            { number: 2, title: 'Grilled', duration: '48 min' },
            { number: 3, title: 'Bit by a Dead Bee', duration: '47 min' },
            { number: 4, title: 'Down', duration: '47 min' },
            { number: 5, title: 'Breakage', duration: '47 min' },
            { number: 6, title: 'Peekaboo', duration: '47 min' },
            { number: 7, title: 'Negro Y Azul', duration: '47 min' },
            { number: 8, title: 'Better Call Saul', duration: '47 min' },
            { number: 9, title: '4 Days Out', duration: '47 min' },
            { number: 10, title: 'Over', duration: '47 min' },
            { number: 11, title: 'Mandala', duration: '47 min' },
            { number: 12, title: 'Phoenix', duration: '47 min' },
            { number: 13, title: 'ABQ', duration: '47 min' }
          ]
        }
      ],
      price: {
        rentSeason: 14.99,
        buySeason: 24.99,
        buyComplete: 79.99
      }
    };

    // Simulate API request delay
    setTimeout(() => {
      setSeries(mockSeries);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading series details...</div>
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

  if (!series) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-xl text-gray-700 dark:text-gray-300 mb-4">TV series not found</div>
        <Link to="/tv-series" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Back to TV Series
        </Link>
      </div>
    );
  }

  const currentSeason = series.seasons.find(season => season.number === selectedSeason) || series.seasons[0];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Series Backdrop */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src={series.backdrop}
          alt={`${series.title} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-10 md:pb-16">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="hidden md:block w-[200px] h-[300px] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={series.poster}
                  alt={`${series.title} poster`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{series.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                  <span>{series.years}</span>
                  <span>•</span>
                  <span>{series.runtime}</span>
                  <span>•</span>
                  <span>{series.genre}</span>
                  <div className="flex items-center bg-yellow-500 text-white px-2 py-1 rounded">
                    <span className="font-bold">{series.rating}</span>
                    <span className="text-xs ml-1">/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Series Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="md:hidden flex justify-center mb-8">
          <div className="w-[180px] h-[270px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={series.poster}
              alt={`${series.title} poster`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Synopsis</h2>
              <p className="text-gray-700 dark:text-gray-300">{series.plot}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {series.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Episodes</h2>
              
              {/* Season selector */}
              <div className="mb-6">
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {series.seasons.map(season => (
                    <button
                      key={season.number}
                      onClick={() => setSelectedSeason(season.number)}
                      className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                        selectedSeason === season.number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      Season {season.number}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Episode list */}
              <div className="space-y-2">
                {currentSeason.episodes.map(episode => (
                  <div 
                    key={episode.number}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-sm font-medium text-gray-800 dark:text-gray-300 mr-3">
                      {episode.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800 dark:text-white">{episode.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{episode.duration}</p>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="flex items-center justify-center h-full">
                  <a 
                    href={series.trailer} 
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
                  <span className="text-gray-500 dark:text-gray-400">Creator:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{series.creator}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Years:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{series.years}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Runtime:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{series.runtime}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Genre:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{series.genre}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Seasons:</span>
                  <span className="text-gray-800 dark:text-white ml-2">{series.seasons.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Watch Now</h2>
              <div className="space-y-4">
                <button 
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
                >
                  <span className="mr-2">Rent Season {selectedSeason}</span>
                  <span className="text-xs text-blue-200">${series.price.rentSeason}</span>
                </button>
                <button 
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
                >
                  <span className="mr-2">Buy Season {selectedSeason}</span>
                  <span className="text-xs text-green-200">${series.price.buySeason}</span>
                </button>
                <button 
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition duration-300 flex justify-center items-center"
                >
                  <span className="mr-2">Buy Complete Series</span>
                  <span className="text-xs text-purple-200">${series.price.buyComplete}</span>
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

export default TVSeriesDetail; 