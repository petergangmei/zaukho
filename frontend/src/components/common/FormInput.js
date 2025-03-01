import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable form input component with label and error handling
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID (required for label association)
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.label - Input label text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.error - Error message to display
 * @param {string} props.placeholder - Input placeholder text
 * @param {boolean} props.required - Whether the input is required
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.className - Additional CSS classes for the input
 */
const FormInput = ({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  // Netflix-inspired styling
  const inputClasses = `
    w-full px-3 py-2 rounded-md 
    focus:outline-none focus:ring-2 focus:ring-red-600 
    bg-gray-800 border 
    ${error ? 'border-red-500' : 'border-gray-700'} 
    text-white
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...rest}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default FormInput; 