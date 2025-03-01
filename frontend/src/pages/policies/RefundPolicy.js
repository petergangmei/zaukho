import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  // Last updated date
  const lastUpdated = "December 15, 2023";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>
          
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              At Zaukho, we strive to ensure complete satisfaction with our streaming service. This Refund Policy 
              outlines the circumstances under which refunds may be issued for subscription plans, movie rentals, 
              and purchases.
            </p>
          </section>
          
          {/* Subscription Refunds */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Subscription Plan Refunds</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Free Trial Period</h3>
            <p className="text-gray-300 mb-4">
              If you cancel your subscription during the free trial period (where applicable), you will not be charged, 
              and no refund will be necessary as no payment has been processed.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Paid Subscriptions</h3>
            <p className="text-gray-300 mb-4">
              For monthly subscription plans, we generally do not offer refunds for partial subscription periods. When you 
              cancel your subscription, you will continue to have access to the service until the end of your current 
              billing period, after which your subscription will not renew.
            </p>
            <p className="text-gray-300 mb-4">
              For annual subscription plans, if you cancel within 14 days of the initial purchase or the most recent 
              renewal, you may request a prorated refund for the unused portion of your subscription. After the 14-day 
              period, cancellations will not result in a refund, but you will maintain access until the end of your 
              billing period.
            </p>
          </section>
          
          {/* Rental Refunds */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Movie and TV Show Rental Refunds</h2>
            <p className="text-gray-300 mb-4">
              Due to the nature of digital content, movie and TV show rentals are generally non-refundable once playback 
              has begun or 24 hours after the rental transaction has been completed, whichever occurs first.
            </p>
            <p className="text-gray-300 mb-4">
              However, if you experience significant technical issues that prevent you from viewing your rented content 
              (such as continuous buffering, video quality issues, or audio problems), and our technical support team 
              is unable to resolve these issues, you may be eligible for a refund or rental extension.
            </p>
          </section>
          
          {/* Purchase Refunds */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Digital Purchase Refunds</h2>
            <p className="text-gray-300 mb-4">
              Purchases of digital content (movies or TV seasons) are generally final and non-refundable once the 
              content has been accessed or downloaded, or 48 hours after purchase, whichever occurs first.
            </p>
            <p className="text-gray-300 mb-4">
              If you have not accessed or downloaded the purchased content and it has been less than 48 hours since 
              purchase, you may request a refund by contacting our customer support team.
            </p>
            <p className="text-gray-300 mb-4">
              If you have purchased content by mistake (for example, you intended to rent but accidentally purchased), 
              please contact customer support within 24 hours of the transaction, and we may, at our discretion, issue 
              a refund or convert your purchase to a rental with appropriate credit for the difference.
            </p>
          </section>
          
          {/* Technical Issues */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Refunds for Technical Issues</h2>
            <p className="text-gray-300 mb-4">
              If you experience significant technical issues with our service that prevent you from accessing or properly 
              using the content you've paid for, please contact our customer support team. After verifying the issues, 
              we may offer:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>A full or partial refund</li>
              <li>Service credit for future use</li>
              <li>Extended rental period</li>
              <li>Alternative content of equivalent value</li>
            </ul>
          </section>
          
          {/* How to Request a Refund */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
            <p className="text-gray-300 mb-4">
              To request a refund, please contact our customer support team at refunds@zaukho.com or through the 
              "Contact Us" page on our website. When requesting a refund, please include:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Your account email address</li>
              <li>Date of purchase or subscription</li>
              <li>The specific content or service for which you're requesting a refund</li>
              <li>The reason for your refund request</li>
              <li>Any relevant details about technical issues experienced</li>
            </ul>
            <p className="text-gray-300 mb-4">
              Our customer support team will review your request and respond within 2 business days.
            </p>
          </section>
          
          {/* Processing Time */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Refund Processing Time</h2>
            <p className="text-gray-300 mb-4">
              Once a refund is approved, please allow 5-10 business days for the refund to be processed and credited 
              back to your original payment method. The exact timing may depend on your payment provider.
            </p>
          </section>
          
          {/* Policy Changes */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to modify this Refund Policy at any time. Changes will be effective when posted on 
              this page with a new "Last Updated" date. We encourage you to review this policy periodically for any changes.
            </p>
          </section>
          
          {/* Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about our Refund Policy, please contact us at:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg inline-block">
              <p className="text-gray-300">refunds@zaukho.com</p>
              <p className="text-gray-300">123 Streaming Street, San Francisco, CA 94105</p>
              <p className="text-gray-300">Support Hours: Monday-Friday, 9am-5pm PT</p>
            </div>
          </section>
          
          {/* Other Policies */}
          <section className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/privacy-policy" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Terms & Conditions
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

export default RefundPolicy; 