import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibrary } from '../config/redux/slices/librarySlice';
import { selectPurchases, selectRentals, selectLibraryLoading, selectLibraryError } from '../config/redux/slices/librarySlice';
import MediaCard from '../components/common/MediaCard';
import { toast } from 'react-toastify';

const Library = () => {
  const dispatch = useDispatch();
  const purchases = useSelector(selectPurchases);
  const rentals = useSelector(selectRentals);
  const isLoading = useSelector(selectLibraryLoading);
  const error = useSelector(selectLibraryError);
  const [activeTab, setActiveTab] = useState('purchases');

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const renderContent = (items) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
          </svg>
          <h3 className="text-xl font-semibold text-gray-200 mb-2">No content found</h3>
          <p className="text-gray-400 text-center max-w-md">
            {activeTab === 'purchases' 
              ? "You haven't purchased any content yet. Browse our catalog to find something you'll love."
              : "You haven't rented any content yet. Check out our latest releases available for rent."}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.content.id}
            title={item.content.title}
            posterUrl={item.content.poster_url}
            releaseYear={item.content.release_year}
            rating={item.content.rating}
            type={item.content.type}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Library</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`py-3 px-6 font-medium text-lg focus:outline-none ${
              activeTab === 'purchases'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg focus:outline-none ${
              activeTab === 'rentals'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('rentals')}
          >
            Rentals
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div>
            {activeTab === 'purchases' ? renderContent(purchases) : renderContent(rentals)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library; 