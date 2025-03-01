import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with different variants and sizes
 * @param {Object} props - Component props
 * @param {string} props.variant - Button style variant (primary, secondary, outline, text)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.isLoading - Whether button is in loading state
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left side
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right side
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  onClick,
  children,
  className = '',
  ...rest
}) => {
  // Base classes for all buttons
  const baseClasses = 'rounded font-medium transition-colors duration-300 flex items-center justify-center';
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  };
  
  // Variant classes (Netflix-inspired)
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-600 bg-opacity-70 hover:bg-opacity-50 text-white',
    outline: 'border border-gray-600 hover:border-white text-white',
    text: 'text-white hover:text-red-600 bg-transparent'
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled/loading classes
  const stateClasses = (disabled || isLoading) 
    ? 'opacity-70 cursor-not-allowed' 
    : 'cursor-pointer';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${widthClasses} 
    ${stateClasses}
    ${className}
  `.trim();
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Button; 