import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// Using Tailwind CSS for styling instead of SCSS

const ProfileSettings = () => {
  // State for user profile data
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: null,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  
  // State for loading and form submission
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [previewImage, setPreviewImage] = useState(null);

  // Mock function to fetch user profile data
  useEffect(() => {
    // In a real application, this would be an API call to fetch user data
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          setProfileData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '+1 (555) 123-4567',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            profilePicture: null,
            emailNotifications: true,
            smsNotifications: false,
            twoFactorAuth: false
          });
          setPreviewImage('https://via.placeholder.com/150');
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data. Please try again.');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should not exceed 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and GIF images are allowed');
        return;
      }
      
      setProfileData({
        ...profileData,
        profilePicture: file
      });
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form based on active tab
  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'personal') {
      // Validate personal information
      if (!profileData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!profileData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!profileData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (profileData.phoneNumber && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(profileData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number is invalid';
      }
      
      if (profileData.zipCode && !/^\d{5}(-\d{4})?$/.test(profileData.zipCode)) {
        newErrors.zipCode = 'ZIP code is invalid (e.g. 12345 or 12345-6789)';
      }
    } else if (activeTab === 'security') {
      // Validate security information
      if (profileData.newPassword) {
        if (!profileData.currentPassword) {
          newErrors.currentPassword = 'Current password is required';
        }
        
        if (profileData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(profileData.newPassword)) {
          newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        
        if (profileData.newPassword !== profileData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      } else if (profileData.currentPassword) {
        newErrors.newPassword = 'New password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to update profile
      setTimeout(() => {
        toast.success('Profile updated successfully');
        setIsLoading(false);
        
        // Reset password fields after successful update
        if (activeTab === 'security') {
          setProfileData({
            ...profileData,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-settings-container min-h-screen bg-black text-white container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      {/* Tabs */}
      <div className="profile-tabs flex border-b border-gray-800 mb-8">
        <button 
          className={`tab-btn py-2 px-4 mr-4 ${activeTab === 'personal' ? 'border-b-2 border-red-600 text-white font-semibold' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button 
          className={`tab-btn py-2 px-4 mr-4 ${activeTab === 'security' ? 'border-b-2 border-red-600 text-white font-semibold' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab-btn py-2 px-4 ${activeTab === 'preferences' ? 'border-b-2 border-red-600 text-white font-semibold' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-md p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="personal-info">
              <div className="profile-picture-section mb-8 flex flex-col md:flex-row items-start md:items-center">
                <div className="profile-picture-container mr-6 mb-4 md:mb-0">
                  <div className="profile-picture-preview w-32 h-32 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
                    {previewImage ? (
                      <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                </div>
                <div className="profile-picture-upload">
                  <h3 className="text-xl font-semibold mb-2">Profile Picture</h3>
                  <p className="text-gray-400 mb-3">Upload a new profile picture. JPG, PNG or GIF, max 5MB.</p>
                  <input 
                    type="file" 
                    id="profilePicture" 
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="profilePicture" 
                    className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-700 transition inline-block"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                    required
                  />
                  {errors.firstName && <p className="error-message text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                    required
                  />
                  {errors.lastName && <p className="error-message text-red-500 mt-1">{errors.lastName}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                    required
                  />
                  {errors.email && <p className="error-message text-red-500 mt-1">{errors.email}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                  />
                  {errors.phoneNumber && <p className="error-message text-red-500 mt-1">{errors.phoneNumber}</p>}
                </div>
                
                <div className="form-group md:col-span-2">
                  <label htmlFor="address" className="block text-gray-300 mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city" className="block text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state" className="block text-gray-300 mb-2">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode" className="block text-gray-300 mb-2">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.zipCode ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                  />
                  {errors.zipCode && <p className="error-message text-red-500 mt-1">{errors.zipCode}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="country" className="block text-gray-300 mb-2">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="security-settings">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="grid grid-cols-1 gap-6 max-w-md">
                <div className="form-group">
                  <label htmlFor="currentPassword" className="block text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={profileData.currentPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                  />
                  {errors.currentPassword && <p className="error-message text-red-500 mt-1">{errors.currentPassword}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword" className="block text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={profileData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.newPassword ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                  />
                  {errors.newPassword && <p className="error-message text-red-500 mt-1">{errors.newPassword}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded focus:outline-none focus:border-red-600 text-white`}
                  />
                  {errors.confirmPassword && <p className="error-message text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-800 pt-6">
                <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={profileData.twoFactorAuth}
                    onChange={handleInputChange}
                    className="mr-2 h-5 w-5 bg-gray-800 border-gray-700 text-red-600 focus:ring-red-600 focus:ring-opacity-25"
                  />
                  <label htmlFor="twoFactorAuth" className="text-gray-300">Enable Two-Factor Authentication</label>
                </div>
                <p className="text-gray-400 mb-4">
                  Two-factor authentication adds an extra layer of security to your account. 
                  When enabled, you'll need to provide a verification code in addition to your password when signing in.
                </p>
                {profileData.twoFactorAuth && (
                  <button 
                    type="button" 
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition border border-gray-700"
                    onClick={() => toast.info('Two-factor authentication setup would be initiated here.')}
                  >
                    Set Up Two-Factor Authentication
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="preferences-settings">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={profileData.emailNotifications}
                    onChange={handleInputChange}
                    className="mr-2 h-5 w-5 bg-gray-800 border-gray-700 text-red-600 focus:ring-red-600 focus:ring-opacity-25"
                  />
                  <label htmlFor="emailNotifications" className="text-gray-300">Email Notifications</label>
                </div>
                <p className="text-gray-400 ml-7 mb-4">
                  Receive email notifications about new releases, special offers, and account updates.
                </p>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    name="smsNotifications"
                    checked={profileData.smsNotifications}
                    onChange={handleInputChange}
                    className="mr-2 h-5 w-5 bg-gray-800 border-gray-700 text-red-600 focus:ring-red-600 focus:ring-opacity-25"
                  />
                  <label htmlFor="smsNotifications" className="text-gray-300">SMS Notifications</label>
                </div>
                <p className="text-gray-400 ml-7 mb-4">
                  Receive text message notifications about new releases, special offers, and account updates.
                </p>
              </div>
              
              <h2 className="text-xl font-semibold mb-4 border-t border-gray-800 pt-6">Language and Region</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="language" className="block text-gray-300 mb-2">Preferred Language</label>
                  <select
                    id="language"
                    name="language"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="timezone" className="block text-gray-300 mb-2">Timezone</label>
                  <select
                    id="timezone"
                    name="timezone"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white"
                    defaultValue="UTC-5"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                    <option value="UTC+8">China Standard Time (UTC+8)</option>
                    <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          <div className="form-actions mt-8 border-t border-gray-800 pt-6">
            <button
              type="submit"
              className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition mr-4"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="bg-gray-800 text-white py-3 px-6 rounded hover:bg-gray-700 transition border border-gray-700"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSettings; 