import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Reusable MediaCard component for displaying movies and TV shows
 * @param {Object} props - Component props
 * @param {string} props.id - Media ID
 * @param {string} props.title - Media title
 * @param {string} props.image - Media image URL
 * @param {string} props.type - Media type (movie, tv)
 * @param {number} props.matchPercentage - Match percentage (0-100)
 * @param {string} props.year - Release year
 * @param {string} props.rating - Content rating (PG, PG-13, etc.)
 * @param {string} props.duration - Media duration
 * @param {boolean} props.isWideCard - Whether to display as a wide card
 * @param {number} props.progress - Viewing progress percentage (0-100)
 * @param {string} props.episodeInfo - Episode information (S1:E1)
 */
const MediaCard = ({
  id,
  title,
  image,
  type = 'movie',
  matchPercentage,
  year,
  rating,
  duration,
  isWideCard = false,
  progress = 0,
  episodeInfo
}) => {
  // State for hover effect
  const [isHovered, setIsHovered] = useState(false);
  
  // Base card classes
  const cardClasses = `
    relative rounded overflow-hidden group 
    transition-transform duration-300 transform 
    hover:scale-105 flex-none
    ${isWideCard ? 'w-64 h-36' : 'w-40'}
  `.trim();
  
  return (
    <div 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <img 
        src={image || `https://dummyimage.com/${isWideCard ? '640x360' : '300x450'}/333/fff`}
        alt={title}
        className={`w-full ${isWideCard ? 'h-full' : 'h-auto'} object-cover`}
      />
      
      {/* Progress bar (for continue watching) */}
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end">
        <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-medium truncate">{title}</h3>
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex space-x-2">
              {/* Play button */}
              <button className="text-white hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Add to list button */}
              <button className="text-white hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            {/* Match percentage or episode info */}
            {matchPercentage && (
              <span className="text-green-500 text-sm">{matchPercentage}% Match</span>
            )}
            {episodeInfo && (
              <span className="text-white text-xs">{episodeInfo}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Link wrapper */}
      <Link 
        to={`/${type}/${id}`} 
        className="absolute inset-0 z-10"
        aria-label={`View details for ${title}`}
      />
    </div>
  );
};

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  type: PropTypes.oneOf(['movie', 'tv']),
  matchPercentage: PropTypes.number,
  year: PropTypes.string,
  rating: PropTypes.string,
  duration: PropTypes.string,
  isWideCard: PropTypes.bool,
  progress: PropTypes.number,
  episodeInfo: PropTypes.string
};

export default MediaCard; 