import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  // Mock function to simulate login/signup
  const handleGetStarted = () => {
    navigate('/register');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://dummyimage.com/1920x1080/000/fff)', 
            backgroundPosition: 'center 20%' 
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Unlimited Movies, TV Shows, and More
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your membership.
            </p>
            
            {/* Get Started Form */}
            <div className="w-full max-w-3xl">
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-grow py-4 px-5 rounded-md bg-black/40 border border-gray-600 text-white focus:outline-none focus:border-red-600"
                />
                <button 
                  onClick={handleGetStarted}
                  className="py-4 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Enjoy on your TV</h2>
              <p className="text-xl text-gray-300">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://dummyimage.com/600x400" 
                alt="TV" 
                className="rounded-lg shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-red-600/20 blur-3xl -z-0 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <img 
                src="https://dummyimage.com/600x400" 
                alt="Mobile" 
                className="rounded-lg shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-red-600/20 blur-3xl -z-0 opacity-60"></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold mb-6">Download your shows to watch offline</h2>
              <p className="text-xl text-gray-300">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Watch everywhere</h2>
              <p className="text-xl text-gray-300">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://dummyimage.com/600x400" 
                alt="Devices" 
                className="rounded-lg shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-red-600/20 blur-3xl -z-0 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <div className="border border-gray-700 rounded-md">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <span className="text-xl font-medium">What is ZAUKHO?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-5 pb-5">
                <p className="text-gray-300">
                  ZAUKHO is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="border border-gray-700 rounded-md">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <span className="text-xl font-medium">How much does ZAUKHO cost?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-5 pb-5">
                <p className="text-gray-300">
                  Watch ZAUKHO on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts.
                </p>
              </div>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="border border-gray-700 rounded-md">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <span className="text-xl font-medium">Where can I watch?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-5 pb-5">
                <p className="text-gray-300">
                  Watch anywhere, anytime. Sign in with your ZAUKHO account to watch instantly on the web at zaukho.com from your personal computer or on any internet-connected device that offers the ZAUKHO app.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-xl mb-6">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-grow py-4 px-5 rounded-md bg-black/40 border border-gray-600 text-white focus:outline-none focus:border-red-600"
              />
              <button 
                onClick={handleGetStarted}
                className="py-4 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-300 flex items-center justify-center gap-2"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 