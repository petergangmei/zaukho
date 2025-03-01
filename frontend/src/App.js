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
// Import existing pages
import About from './pages/About';
import Pricing from './pages/Pricing';
// Import new pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import ContactUs from './pages/ContactUs';

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
          {/* New routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 