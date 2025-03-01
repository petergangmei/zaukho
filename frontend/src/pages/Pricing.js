import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      cta: "Go Ultimate"
    }
  ];

  // Calculate savings
  const calculateSavings = (monthlyPrice, annualPrice) => {
    const monthlyCostPerYear = monthlyPrice * 12;
    const savings = monthlyCostPerYear - annualPrice;
    return Math.round(savings);
  };

  // FAQs data
  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your subscription will take effect on your next billing cycle."
    },
    {
      question: "How many people can use one account?",
      answer: "The number of simultaneous streams depends on your plan. Basic allows 1 stream, Premium allows 3 streams, and Ultimate allows 5 streams at the same time."
    },
    {
      question: "Do you offer family sharing?",
      answer: "Yes, our Premium and Ultimate plans are designed with families in mind, allowing multiple simultaneous streams and personalized profiles for each family member."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer a 20% discount for verified students on any plan. Contact our support team with your valid student ID to apply for the discount."
    },
    {
      question: "Can I still rent or buy individual movies?",
      answer: "Absolutely! In addition to our subscription plans, you can rent or purchase specific titles that may not be included in the subscription catalog."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-300 mb-10">Choose the plan that's right for you and start streaming today.</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`text-lg ${!isAnnual ? 'text-white font-bold' : 'text-gray-400'}`}>Monthly</span>
              <button 
                className="relative mx-4 w-16 h-8 flex items-center bg-gray-700 rounded-full p-1 cursor-pointer"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div 
                  className={`bg-red-600 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-white font-bold' : 'text-gray-400'}`}>
                Annual <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full ml-1">Save up to 20%</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-12 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${plan.highlight ? 'bg-gradient-to-b from-red-900 to-red-800 border-2 border-red-500 transform scale-105 md:scale-110 z-10 shadow-xl' : 'bg-gray-800'}`}
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
                    
                    {isAnnual && (
                      <div className="text-green-500 text-sm mt-2">
                        Save ${calculateSavings(plan.monthlyPrice, plan.annualPrice)} per year
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/register" 
                    className={`block w-full py-3 px-4 rounded-md text-center font-semibold transition ${plan.highlight ? 'bg-white text-red-900 hover:bg-gray-100' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Comparison */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="inline-block border-b-4 border-red-600 pb-1">Compare All Features</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">Basic</th>
                  <th className="py-4 px-6 text-center">Premium</th>
                  <th className="py-4 px-6 text-center">Ultimate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Monthly Price</td>
                  <td className="py-4 px-6 text-center">${plans[0].monthlyPrice}</td>
                  <td className="py-4 px-6 text-center">${plans[1].monthlyPrice}</td>
                  <td className="py-4 px-6 text-center">${plans[2].monthlyPrice}</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Video Quality</td>
                  <td className="py-4 px-6 text-center">HD</td>
                  <td className="py-4 px-6 text-center">Full HD, 4K</td>
                  <td className="py-4 px-6 text-center">HD, 4K, HDR, Dolby</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Simultaneous Streams</td>
                  <td className="py-4 px-6 text-center">1</td>
                  <td className="py-4 px-6 text-center">3</td>
                  <td className="py-4 px-6 text-center">5</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Ads</td>
                  <td className="py-4 px-6 text-center">Yes</td>
                  <td className="py-4 px-6 text-center">No</td>
                  <td className="py-4 px-6 text-center">No</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Downloads</td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">20 titles</td>
                  <td className="py-4 px-6 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-6">Early Access</td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Priority Support</td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <svg className="h-6 w-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="inline-block border-b-4 border-red-600 pb-1">Frequently Asked Questions</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pay-Per-View Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Ready for a Subscription?</h2>
              <p className="text-xl text-gray-300 mb-4">
                Try our pay-per-view options for individual movies and TV episodes.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>New releases from $3.99</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Classic movies from $1.99</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>TV episodes from $0.99</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>48-hour viewing window</span>
                </li>
              </ul>
            </div>
            <div className="md:w-5/12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-center">Browse Our Catalog</h3>
                <p className="text-center mb-6">Sign up for free to browse our collection of over 10,000 titles</p>
                <Link 
                  to="/register" 
                  className="block w-full py-3 px-4 bg-white text-purple-900 rounded-md text-center font-semibold hover:bg-gray-100 transition"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Entertainment Journey Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join millions of viewers enjoying premium content at affordable prices. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-md transition">
              Try Free for 14 Days
            </Link>
          </div>
          <p className="text-gray-500 mt-4">No credit card required for trial</p>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 