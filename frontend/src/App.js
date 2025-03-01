import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import TVSeries from './pages/TVSeries';
import TVSeriesDetail from './pages/TVSeriesDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyLibrary from './pages/MyLibrary';
import NotFound from './pages/NotFound';
// Import new pages
import About from './pages/About';
import Pricing from './pages/Pricing';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/tv-series" element={<TVSeries />} />
          <Route path="/tv-series/:id" element={<TVSeriesDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 