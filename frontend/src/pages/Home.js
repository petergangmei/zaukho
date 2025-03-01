import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

// Placeholder data (would normally come from API)
const featuredMovie = {
  id: 1,
  title: "The Matrix Resurrections",
  description: "Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a physical or mental construct, Mr. Anderson will have to choose to follow the white rabbit once more.",
  poster: "https://via.placeholder.com/1920x1080?text=The+Matrix+Resurrections",
  releaseDate: "2021-12-22",
  categories: ["Action", "Sci-Fi"]
};

const featuredMovies = [
  {
    id: 1,
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family trying to avenge his father's death while saving a spice planet that he is entrusted to protect.",
    poster: "https://via.placeholder.com/300x450?text=Dune",
    price_rent: 4.99,
    price_buy: 14.99
  },
  {
    id: 2,
    title: "No Time to Die",
    description: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help.",
    poster: "https://via.placeholder.com/300x450?text=No+Time+To+Die",
    price_rent: 5.99,
    price_buy: 19.99
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    poster: "https://via.placeholder.com/300x450?text=Spider-Man",
    price_rent: 5.99,
    price_buy: 19.99
  },
  {
    id: 4,
    title: "The Batman",
    description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    poster: "https://via.placeholder.com/300x450?text=The+Batman",
    price_rent: 6.99,
    price_buy: 24.99
  }
];

const featuredTVShows = [
  {
    id: 1,
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    poster: "https://via.placeholder.com/300x450?text=Stranger+Things",
    seasons: 4
  },
  {
    id: 2,
    title: "The Witcher",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    poster: "https://via.placeholder.com/300x450?text=The+Witcher",
    seasons: 2
  },
  {
    id: 3,
    title: "Squid Game",
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    poster: "https://via.placeholder.com/300x450?text=Squid+Game",
    seasons: 1
  },
  {
    id: 4,
    title: "Money Heist",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    poster: "https://via.placeholder.com/300x450?text=Money+Heist",
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
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${featuredMovie.poster})` }}
      >
        <div className="container">
          <div className="hero-content">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.description}</p>
            <div className="hero-buttons">
              <Link to={`/movies/${featuredMovie.id}`} className="btn btn-primary me-3">
                <i className="fas fa-play me-2"></i> Watch Now
              </Link>
              <button className="btn btn-outline-light">
                <i className="fas fa-info-circle me-2"></i> More Info
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Movies Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Movies</h2>
          
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {featuredMovies.map(movie => (
                <div key={movie.id} className="col-md-3 col-sm-6 mb-4">
                  <div className="content-card">
                    <img 
                      src={movie.poster} 
                      className="card-img-top" 
                      alt={movie.title} 
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.description.substring(0, 80)}...</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="price">
                          From ${movie.price_rent}
                        </div>
                        <Link to={`/movies/${movie.id}`} className="btn btn-sm btn-primary">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link to="/movies" className="btn btn-outline-light">
              View All Movies
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured TV Shows Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured TV Shows</h2>
          
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {featuredTVShows.map(show => (
                <div key={show.id} className="col-md-3 col-sm-6 mb-4">
                  <div className="content-card">
                    <img 
                      src={show.poster} 
                      className="card-img-top" 
                      alt={show.title} 
                    />
                    <div className="card-body">
                      <h5 className="card-title">{show.title}</h5>
                      <p className="card-text">{show.description.substring(0, 80)}...</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="seasons">
                          {show.seasons} {show.seasons === 1 ? 'Season' : 'Seasons'}
                        </div>
                        <Link to={`/tv-series/${show.id}`} className="btn btn-sm btn-primary">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link to="/tv-series" className="btn btn-outline-light">
              View All TV Shows
            </Link>
          </div>
        </div>
      </section>
      
      {/* Subscription Banner */}
      <section className="subscription-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2>Subscribe for Premium Access</h2>
              <p>Get unlimited access to all movies and TV shows with our premium subscription.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <Link to="/pricing" className="btn btn-primary btn-lg">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 