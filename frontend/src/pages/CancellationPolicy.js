import React from 'react';
import { Link } from 'react-router-dom';

const CancellationPolicy = () => {
  // Last updated date
  const lastUpdated = "December 15, 2023";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Cancellation Policy</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>
          
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              At Zaukho, we understand that your entertainment needs may change over time. This Cancellation Policy 
              outlines the process and terms for cancelling your subscription or rental agreements with our service.
            </p>
          </section>
          
          {/* Subscription Cancellation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Subscription Cancellation</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">How to Cancel Your Subscription</h3>
            <p className="text-gray-300 mb-4">
              You can cancel your subscription at any time by following these steps:
            </p>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
              <li>Log in to your Zaukho account</li>
              <li>Go to Account Settings</li>
              <li>Select "Subscription"</li>
              <li>Click on "Cancel Subscription"</li>
              <li>Follow the prompts to confirm cancellation</li>
            </ol>
            <p className="text-gray-300 mb-4">
              Alternatively, you can contact our customer support team at support@zaukho.com for assistance with 
              cancelling your subscription.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Effective Date of Cancellation</h3>
            <p className="text-gray-300 mb-4">
              When you cancel your subscription, your membership will continue until the end of your current billing 
              period. After that date, your account will no longer be charged, and your subscription will be terminated.
            </p>
            <p className="text-gray-300 mb-4">
              For example, if your monthly subscription renews on the 15th of each month and you cancel on the 5th, 
              you will still have access to your subscription until the 14th of that month.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Service Access After Cancellation</h3>
            <p className="text-gray-300 mb-4">
              After your subscription period ends following cancellation:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>You will no longer have access to subscription content</li>
              <li>Any downloaded content will become unavailable</li>
              <li>Your account will remain active for pay-per-view purchases or future subscriptions</li>
              <li>You will maintain access to any content you've purchased (not rented) separately from your subscription</li>
            </ul>
          </section>
          
          {/* Rental Cancellations */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Rental Cancellations</h2>
            <p className="text-gray-300 mb-4">
              For movie and TV show rentals, cancellation policies depend on the status of the rental:
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">Before Playback Begins</h3>
            <p className="text-gray-300 mb-4">
              If you have rented content but have not yet started watching it, you can cancel the rental within 24 hours 
              of the transaction and receive a full refund. To cancel, go to "My Rentals" in your account and select 
              "Cancel Rental" for the specific title.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-red-500">After Playback Begins</h3>
            <p className="text-gray-300 mb-4">
              Once you have started watching a rented title, the rental cannot be cancelled, and no refund will be 
              provided. You will maintain access to the content for the duration of the rental period (typically 48 hours 
              from the start of playback).
            </p>
          </section>
          
          {/* Free Trial Cancellation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Free Trial Cancellation</h2>
            <p className="text-gray-300 mb-4">
              If you are currently in a free trial period, you can cancel at any time before the trial ends to avoid 
              being charged for the first billing period. To cancel your free trial:
            </p>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
              <li>Log in to your Zaukho account</li>
              <li>Go to Account Settings</li>
              <li>Select "Subscription"</li>
              <li>Click on "Cancel Free Trial"</li>
              <li>Follow the prompts to confirm cancellation</li>
            </ol>
            <p className="text-gray-300 mb-4">
              You will continue to have access to the service until the end of your free trial period. After cancellation, 
              your account will not be charged, and your subscription will not automatically begin.
            </p>
          </section>
          
          {/* Annual Subscription Cancellation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Annual Subscription Cancellation</h2>
            <p className="text-gray-300 mb-4">
              For annual subscription plans, the same cancellation process applies. When you cancel an annual 
              subscription:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>You will maintain access until the end of your current annual billing cycle</li>
              <li>Your subscription will not automatically renew for the next year</li>
              <li>No partial refunds are provided for the unused portion of your annual subscription after the first 14 days (see our Refund Policy for more details)</li>
            </ul>
            <p className="text-gray-300 mb-4">
              We recommend setting a reminder before your annual renewal date if you're considering cancellation, 
              to ensure you make your decision before the next billing cycle begins.
            </p>
          </section>
          
          {/* Reactivation */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Reactivating Your Subscription</h2>
            <p className="text-gray-300 mb-4">
              If you decide to return to Zaukho after cancelling, you can reactivate your subscription at any time:
            </p>
            <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-4">
              <li>Log in to your account (your profile and preferences will still be saved)</li>
              <li>Go to Account Settings</li>
              <li>Select "Subscription"</li>
              <li>Choose a subscription plan</li>
              <li>Complete the payment process</li>
            </ol>
            <p className="text-gray-300 mb-4">
              If you reactivate within 90 days of cancellation, your viewing history and preferences will be intact. 
              After 90 days, some personalization data may be reset.
            </p>
          </section>
          
          {/* Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you need assistance with cancelling your subscription or have questions about this policy, please 
              contact our customer support team:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg inline-block">
              <p className="text-gray-300">support@zaukho.com</p>
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
              <Link to="/refund-policy" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Refund Policy
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy; 