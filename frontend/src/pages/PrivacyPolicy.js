import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Last updated date
  const lastUpdated = "December 15, 2023";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>
          
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              At Zaukho, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website and use our streaming service.
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the site.
            </p>
          </section>
          
          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Personal Data</h3>
            <p className="text-gray-300 mb-4">
              Personally identifiable information, such as your name, email address, telephone number, and payment 
              information that you voluntarily give to us when you register with our service or when you choose 
              to participate in various activities related to the Service.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Derivative Data</h3>
            <p className="text-gray-300 mb-4">
              Information our servers automatically collect when you access the Service, such as your IP address, 
              your browser type, your operating system, your access times, the pages you viewed, your device 
              information, and the movies and TV shows you watch.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Financial Data</h3>
            <p className="text-gray-300 mb-4">
              Financial information, such as data related to your payment method (e.g., valid credit card number, 
              card brand, expiration date) that we may collect when you purchase, order, return, exchange, or 
              request information about our services.
            </p>
          </section>
          
          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use personal information collected via our Service for a variety of business purposes including:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>To provide and maintain our Service</li>
              <li>To process your subscription and payments</li>
              <li>To personalize your experience with content recommendations</li>
              <li>To provide customer support</li>
              <li>To communicate with you about service updates and offers</li>
              <li>To monitor usage and improve our service</li>
              <li>To protect our Service and your account from unauthorized access</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>
          
          {/* Third-Party Disclosure */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Disclosure of Your Information</h2>
            <p className="text-gray-300 mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">By Law or to Protect Rights</h3>
            <p className="text-gray-300 mb-4">
              If we believe the release of information about you is necessary to respond to legal process, to 
              investigate or remedy potential violations of our policies, or to protect the rights, property, 
              and safety of others, we may share your information as permitted or required by any applicable law, 
              rule, or regulation.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Third-Party Service Providers</h3>
            <p className="text-gray-300 mb-4">
              We may share your information with third parties that perform services for us or on our behalf, 
              including payment processing, data analysis, email delivery, hosting services, customer service, 
              and marketing assistance.
            </p>
          </section>
          
          {/* Security of Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Security of Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use administrative, technical, and physical security measures to help protect your personal 
              information. While we have taken reasonable steps to secure the personal information you provide to us, 
              please be aware that despite our efforts, no security measures are perfect or impenetrable, and no 
              method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
          
          {/* Children's Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Children's Information</h2>
            <p className="text-gray-300 mb-4">
              The Service is not directed to children under 13 years of age. We do not knowingly collect personally 
              identifiable information from children under 13. If you are under 13, do not use or provide any 
              information on this Service or register for an account.
            </p>
          </section>
          
          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>The right to access personal information we hold about you</li>
              <li>The right to request that we update or correct any personal information</li>
              <li>The right to request that we delete your personal information</li>
              <li>The right to opt-out of marketing communications</li>
              <li>The right to lodge a complaint with a supervisory authority</li>
            </ul>
          </section>
          
          {/* Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg inline-block">
              <p className="text-gray-300">privacy@zaukho.com</p>
              <p className="text-gray-300">123 Streaming Street, San Francisco, CA 94105</p>
            </div>
          </section>
          
          {/* Other Policies */}
          <section className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/terms" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Terms & Conditions
              </Link>
              <Link to="/refund-policy" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Refund Policy
              </Link>
              <Link to="/cancellation-policy" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Cancellation Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 