import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../config/redux/slices/authSlice';
import { HeroSection, ContentRow } from '../components/common';

const Browse = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Check if user is logged in, redirect to login if not
  // This check is now redundant since ProtectedRoute already handles this
  // But keeping it with correct token name and proper dependency for safety
  useEffect(() => {
    // Only redirect if not authenticated according to Redux state
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]); // Add isAuthenticated as dependency

  // Mock featured content for hero section
  const featuredContent = {
    id: 'movie-1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    backgroundImage: 'https://dummyimage.com/1920x1080/333/fff',
    matchPercentage: 98,
    year: '2014',
    rating: 'PG-13',
    duration: '2h 49m',
    quality: 'HD'
  };

  // Mock data for content rows
  const trendingItems = [1, 2, 3, 4, 5, 6, 7, 8].map(item => ({
    id: `trending-${item}`,
    title: `Trending Title ${item}`,
    image: 'https://dummyimage.com/640x360/333/fff',
    type: 'movie',
    matchPercentage: 97
  }));

  const popularItems = [1, 2, 3, 4, 5, 6, 7, 8].map(item => ({
    id: `popular-${item}`,
    title: `Popular Title ${item}`,
    image: 'https://dummyimage.com/300x450/333/fff',
    type: 'movie'
  }));

  const continueWatchingItems = [1, 2, 3, 4, 5].map(item => ({
    id: `continue-${item}`,
    title: `Continue Title ${item}`,
    image: 'https://dummyimage.com/640x360/333/fff',
    type: 'tv',
    progress: 30 + (item * 10),
    episodeInfo: `S1:E${item}`
  }));

  // Handle play button click
  const handlePlay = () => {
    console.log('Play button clicked');
    // Navigate to video player or show modal
  };

  // Handle more info button click
  const handleMoreInfo = () => {
    console.log('More info button clicked');
    // Navigate to details page or show modal
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection 
        content={featuredContent}
        onPlay={handlePlay}
        onMoreInfo={handleMoreInfo}
      />
      
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        {/* Trending Now */}
        <ContentRow
          title="Trending Now"
          items={trendingItems}
          isWideCard={true}
        />
        
        {/* Popular on ZAUKHO */}
        <ContentRow
          title="Popular on ZAUKHO"
          items={popularItems}
          isWideCard={false}
        />
        
        {/* Continue Watching */}
        <ContentRow
          title="Continue Watching"
          items={continueWatchingItems}
          isWideCard={true}
          showProgress={true}
        />
      </div>
    </div>
  );
};

export default Browse;

/* Add this to your global CSS file */
/* 
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
*/ 