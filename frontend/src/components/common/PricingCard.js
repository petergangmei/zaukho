import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Reusable PricingCard component for displaying pricing plans
 * @param {Object} props - Component props
 * @param {string} props.name - Plan name
 * @param {number} props.monthlyPrice - Monthly price
 * @param {number} props.annualPrice - Annual price
 * @param {Array} props.features - Array of plan features
 * @param {boolean} props.highlight - Whether to highlight this plan
 * @param {string} props.cta - Call to action text
 * @param {boolean} props.isAnnual - Whether to display annual pricing
 * @param {Function} props.onSelect - Function called when plan is selected
 */
const PricingCard = ({
  name,
  monthlyPrice,
  annualPrice,
  features = [],
  highlight = false,
  cta = 'Select Plan',
  isAnnual = false,
  onSelect
}) => {
  // Calculate savings
  const calculateSavings = () => {
    const monthlyCostPerYear = monthlyPrice * 12;
    const savings = monthlyCostPerYear - annualPrice;
    return Math.round(savings);
  };
  
  // Current price based on billing cycle
  const currentPrice = isAnnual ? annualPrice : monthlyPrice;
  
  // Card classes based on highlight status
  const cardClasses = `
    rounded-lg overflow-hidden 
    ${highlight 
      ? 'border-2 border-red-600 bg-gray-900 transform scale-105 shadow-xl z-10' 
      : 'border border-gray-800 bg-gray-900/50'
    }
    transition-all duration-300
  `.trim();
  
  return (
    <div className={cardClasses}>
      {/* Card Header */}
      <div className={`p-6 ${highlight ? 'bg-red-600' : 'bg-gray-800'}`}>
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">${currentPrice.toFixed(2)}</span>
          <span className="text-gray-300 ml-1">/{isAnnual ? 'year' : 'month'}</span>
        </div>
        
        {/* Show savings for annual plans */}
        {isAnnual && (
          <p className="text-sm text-white mt-2">
            Save ${calculateSavings()} compared to monthly
          </p>
        )}
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant={highlight ? 'primary' : 'outline'}
          fullWidth
          onClick={onSelect}
        >
          {cta}
        </Button>
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  monthlyPrice: PropTypes.number.isRequired,
  annualPrice: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.bool,
  cta: PropTypes.string,
  isAnnual: PropTypes.bool,
  onSelect: PropTypes.func
};

export default PricingCard; 