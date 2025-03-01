import React from 'react';
import PropTypes from 'prop-types';
import MediaCard from './MediaCard';

/**
 * Reusable ContentRow component for displaying rows of media content
 * @param {Object} props - Component props
 * @param {string} props.title - Row title
 * @param {Array} props.items - Array of media items to display
 * @param {boolean} props.isWideCard - Whether to display wide cards
 * @param {boolean} props.showProgress - Whether to show progress bars
 */
const ContentRow = ({
  title,
  items = [],
  isWideCard = false,
  showProgress = false
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      {/* Row Title */}
      {title && (
        <h2 className="text-xl font-medium mb-4 pl-2">{title}</h2>
      )}
      
      {/* Scrollable Content */}
      <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            type={item.type}
            matchPercentage={item.matchPercentage}
            year={item.year}
            rating={item.rating}
            duration={item.duration}
            isWideCard={isWideCard}
            progress={showProgress ? item.progress : 0}
            episodeInfo={item.episodeInfo}
          />
        ))}
      </div>
    </section>
  );
};

ContentRow.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      type: PropTypes.oneOf(['movie', 'tv']),
      matchPercentage: PropTypes.number,
      year: PropTypes.string,
      rating: PropTypes.string,
      duration: PropTypes.string,
      progress: PropTypes.number,
      episodeInfo: PropTypes.string
    })
  ).isRequired,
  isWideCard: PropTypes.bool,
  showProgress: PropTypes.bool
};

export default ContentRow; 