import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, PricingCard } from '../components/common';

const Pricing = () => {
  // Toggle for monthly/annual billing
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Pricing plans data
  const plans = [
    {
      name: "Basic",
      monthlyPrice: 7.99,
      annualPrice: 79.99,
      features: [
        "Access to all movies and TV shows",
        "Watch on one device at a time",
        "HD available",
        "No downloads",
        "Ad-supported"
      ],
      highlight: false,
      cta: "Get Started"
    },
    {
      name: "Premium",
      monthlyPrice: 14.99,
      annualPrice: 149.99,
      features: [
        "Everything in Basic",
        "Watch on up to 3 devices",
        "Full HD and 4K available",
        "Download up to 20 titles",
        "Ad-free experience",
        "Early access to select new releases"
      ],
      highlight: true,
      cta: "Get Premium"
    },
    {
      name: "Ultimate",
      monthlyPrice: 24.99,
      annualPrice: 249.99,
      features: [
        "Everything in Premium",
        "Watch on up to 5 devices",
        "Dolby Atmos and HDR",
        "Unlimited downloads",
        "Exclusive behind-the-scenes content",
        "Discount on movie purchases",
        "Priority customer support"
      ],
      highlight: false,
      cta: "Get Ultimate"
    }
  ];
  
  // Handle plan selection
  const handleSelectPlan = (planName) => {
    console.log(`Selected plan: ${planName}`);
    // In a real app, this would navigate to checkout or registration
  };
  
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Join ZAUKHO for unlimited access to our library of movies and TV shows. 
              Cancel anytime, no commitments.
            </p>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-900 p-1 rounded-full inline-flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  !isAnnual ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isAnnual ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual <span className="text-xs font-bold text-green-400 ml-1">Save 16%</span>
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                monthlyPrice={plan.monthlyPrice}
                annualPrice={plan.annualPrice}
                features={plan.features}
                highlight={plan.highlight}
                cta={plan.cta}
                isAnnual={isAnnual}
                onSelect={() => handleSelectPlan(plan.name)}
              />
            ))}
          </div>
          
          {/* Features Comparison */}
          <div className="mt-20 bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-8 text-center">Compare All Features</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 font-medium text-gray-400">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.name} className="text-center py-4 px-4 font-medium">
                        <span className={plan.highlight ? "text-red-500" : "text-white"}>
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Video Quality */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Video Quality</td>
                    <td className="text-center py-4 px-4">Good</td>
                    <td className="text-center py-4 px-4">Better</td>
                    <td className="text-center py-4 px-4">Best</td>
                  </tr>
                  
                  {/* Resolution */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Resolution</td>
                    <td className="text-center py-4 px-4">720p</td>
                    <td className="text-center py-4 px-4">1080p/4K</td>
                    <td className="text-center py-4 px-4">4K + HDR</td>
                  </tr>
                  
                  {/* Simultaneous Streams */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Simultaneous Streams</td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">3</td>
                    <td className="text-center py-4 px-4">5</td>
                  </tr>
                  
                  {/* Downloads */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Downloads</td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">Up to 20</td>
                    <td className="text-center py-4 px-4">Unlimited</td>
                  </tr>
                  
                  {/* Ad-Free */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Ad-Free</td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  
                  {/* Early Access */}
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">Early Access</td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="text-center py-4 px-4">
                      <svg className="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Can I change my plan later?</h3>
                <p className="text-gray-300">Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your subscription will take effect on your next billing date.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">How does the billing work?</h3>
                <p className="text-gray-300">Your subscription will be automatically renewed at the end of each billing period. You can cancel at any time before your next billing date to avoid charges.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
                <p className="text-gray-300">Yes, new members receive a 7-day free trial. You won't be charged until your trial period ends, and you can cancel anytime during the trial.</p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-300">We accept all major credit cards, PayPal, and select digital payment methods. Gift cards are also available for purchase.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to start your streaming journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join millions of viewers enjoying the latest movies and TV shows on ZAUKHO.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleSelectPlan('Premium')}
            >
              Get Started
            </Button>
            <p className="mt-4 text-sm text-gray-400">No contracts, cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 