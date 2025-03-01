import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Reusable HeroSection component for displaying featured content
 * @param {Object} props - Component props
 * @param {Object} props.content - Featured content data
 * @param {string} props.content.id - Content ID
 * @param {string} props.content.title - Content title
 * @param {string} props.content.description - Content description
 * @param {string} props.content.backgroundImage - Background image URL
 * @param {number} props.content.matchPercentage - Match percentage (0-100)
 * @param {string} props.content.year - Release year
 * @param {string} props.content.rating - Content rating (PG, PG-13, etc.)
 * @param {string} props.content.duration - Content duration
 * @param {string} props.content.quality - Content quality (HD, 4K, etc.)
 * @param {Function} props.onPlay - Play button click handler
 * @param {Function} props.onMoreInfo - More info button click handler
 */
const HeroSection = ({
  content,
  onPlay,
  onMoreInfo
}) => {
  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  if (!content) {
    return null;
  }
  
  const {
    id,
    title,
    description,
    backgroundImage,
    matchPercentage,
    year,
    rating,
    duration,
    quality
  } = content;
  
  return (
    <div 
      className="relative w-full h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage || 'https://dummyimage.com/1920x1080/333/fff'})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-1/2 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
        
        {/* Content metadata */}
        <div className="flex items-center space-x-4 mb-4">
          {matchPercentage && (
            <span className="text-green-500 font-semibold">{matchPercentage}% Match</span>
          )}
          {year && (
            <span className="text-gray-300">{year}</span>
          )}
          {rating && (
            <span className="border border-gray-400 px-1 text-xs">{rating}</span>
          )}
          {duration && (
            <span className="text-gray-300">{duration}</span>
          )}
          {quality && (
            <span className="border border-gray-400 px-1 text-xs">{quality}</span>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-gray-300 mb-6 text-lg">
            {description}
          </p>
        )}
        
        {/* Action buttons */}
        <div className="flex space-x-4">
          <Button
            variant="primary"
            onClick={onPlay}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            }
          >
            Play
          </Button>
          
          <Button
            variant="secondary"
            onClick={onMoreInfo}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    backgroundImage: PropTypes.string,
    matchPercentage: PropTypes.number,
    year: PropTypes.string,
    rating: PropTypes.string,
    duration: PropTypes.string,
    quality: PropTypes.string
  }).isRequired,
  onPlay: PropTypes.func,
  onMoreInfo: PropTypes.func
};

export default HeroSection; 