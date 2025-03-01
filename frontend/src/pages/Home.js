import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Placeholder data (would normally come from API)
const featuredMovie = {
  id: 1,
  title: "The Matrix Resurrections",
  description: "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a physical or mental construct, Mr. Anderson will have to choose to follow the white rabbit once more.",
  poster: "https://dummyimage.com/1920x1080",
  releaseDate: "2021-12-22",
  categories: ["Action", "Sci-Fi"]
};

const featuredMovies = [
  {
    id: 1,
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family trying to avenge his father's death while saving a spice planet that he is entrusted to protect.",
    poster: "https://dummyimage.com/300x450",
    price_rent: 4.99,
    price_buy: 14.99
  },
  {
    id: 2,
    title: "No Time to Die",
    description: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help.",
    poster: "https://dummyimage.com/300x450",
    price_rent: 5.99,
    price_buy: 19.99
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    poster: "https://dummyimage.com/300x450",
    price_rent: 5.99,
    price_buy: 19.99
  },
  {
    id: 4,
    title: "The Batman",
    description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    poster: "https://dummyimage.com/300x450",
    price_rent: 6.99,
    price_buy: 24.99
  }
];

const featuredTVShows = [
  {
    id: 1,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    poster: "https://dummyimage.com/300x450",
    seasons: 4
  },
  {
    id: 2,
    title: "The Witcher",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    poster: "https://dummyimage.com/300x450",
    seasons: 2
  },
  {
    id: 3,
    title: "Squid Game",
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    poster: "https://dummyimage.com/300x450",
    seasons: 1
  },
  {
    id: 4,
    title: "Money Heist",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    poster: "https://dummyimage.com/300x450",
    seasons: 5
  }
];

const Home = () => {
  // In a real app, we would fetch data from the API
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${featuredMovie.poster})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div>
        
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            <span className="text-red-600 font-semibold mb-2">FEATURED PRESENTATION</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {featuredMovie.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-3">
              {featuredMovie.categories.map(category => (
                <span key={category} className="px-2.5 py-1 bg-gray-800/60 text-white text-sm rounded-full">
                  {category}
                </span>
              ))}
            </div>
            <p className="text-white/90 text-lg mb-6 drop-shadow-md">
              {featuredMovie.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to={`/movies/${featuredMovie.id}`} 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Now
              </Link>
              <button className="px-6 py-3 bg-gray-700/50 hover:bg-gray-700/80 text-white font-semibold rounded-md transition border border-gray-600 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Movies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              <span className="inline-block border-b-4 border-red-600 pb-1">Featured Movies</span>
            </h2>
            <Link to="/movies" className="text-gray-300 hover:text-white transition flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredMovies.map(movie => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden group transform hover:scale-105 transition duration-300">
                  <Link to={`/movies/${movie.id}`} className="block relative aspect-w-2 aspect-h-3">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded flex items-center justify-center gap-2 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1 mb-3">{movie.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-300">
                        <span className="text-green-500 font-semibold">${movie.price_rent}</span> or buy ${movie.price_buy}
                      </div>
                      <Link to={`/movies/${movie.id}`} className="text-red-500 hover:text-red-400 transition">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured TV Shows Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              <span className="inline-block border-b-4 border-red-600 pb-1">Featured TV Shows</span>
            </h2>
            <Link to="/tv-series" className="text-gray-300 hover:text-white transition flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredTVShows.map(show => (
                <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden group transform hover:scale-105 transition duration-300">
                  <Link to={`/tv-series/${show.id}`} className="block relative aspect-w-2 aspect-h-3">
                    <img 
                      src={show.poster} 
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded flex items-center justify-center gap-2 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-white text-lg font-semibold">{show.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1 mb-3">{show.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="px-2.5 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                        {show.seasons} {show.seasons === 1 ? 'Season' : 'Seasons'}
                      </div>
                      <Link to={`/tv-series/${show.id}`} className="text-red-500 hover:text-red-400 transition">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="inline-block border-b-4 border-red-600 pb-1">Browse by Category</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary'].map(category => (
              <div key={category} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 text-center hover:from-red-900 hover:to-red-800 transition cursor-pointer">
                <h3 className="text-white text-lg font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subscription Banner */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:w-7/12 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Premium Content Awaits</h2>
              <p className="text-white/90 text-lg max-w-2xl">
                Get unlimited access to all movies and TV shows with our premium subscription. 
                No ads, no interruptions, just pure entertainment. Start your journey today!
              </p>
            </div>
            <div className="md:w-5/12 flex justify-center md:justify-end">
              <Link 
                to="/pricing" 
                className="px-8 py-4 bg-white text-red-900 text-lg font-bold rounded-md hover:bg-gray-100 transition transform hover:scale-105 inline-flex items-center gap-2"
              >
                View Plans
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Additions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">
            <span className="inline-block border-b-4 border-red-600 pb-1">Recently Added</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...featuredMovies, ...featuredTVShows].slice(0, 6).map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden group transform hover:scale-105 transition duration-300">
                <Link to={item.seasons ? `/tv-series/${item.id}` : `/movies/${item.id}`} className="block relative aspect-w-2 aspect-h-3">
                  <img 
                    src={item.poster} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">NEW</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 