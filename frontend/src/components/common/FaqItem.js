import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable FaqItem component for displaying FAQ items
 * @param {Object} props - Component props
 * @param {string} props.question - FAQ question
 * @param {string} props.answer - FAQ answer
 * @param {boolean} props.isOpen - Whether the FAQ item is open
 * @param {Function} props.toggleOpen - Function to toggle open state
 */
const FaqItem = ({
  question,
  answer,
  isOpen,
  toggleOpen
}) => {
  // If toggleOpen is not provided, manage state internally
  const [isOpenInternal, setIsOpenInternal] = useState(isOpen || false);
  
  // Use either the provided toggle function or the internal state
  const handleToggle = () => {
    if (toggleOpen) {
      toggleOpen();
    } else {
      setIsOpenInternal(!isOpenInternal);
    }
  };
  
  // Use either the provided isOpen prop or the internal state
  const isExpanded = toggleOpen ? isOpen : isOpenInternal;
  
  return (
    <div className="border-b border-gray-800">
      <button
        className="w-full py-5 px-4 flex items-center justify-between focus:outline-none"
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <svg
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <div className="px-4 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
};

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
};

export default FaqItem; 