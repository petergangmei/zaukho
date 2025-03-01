import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  // Last updated date
  const lastUpdated = "December 15, 2023";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-gray-400">Last Updated: {lastUpdated}</p>
            <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>
          
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-300 mb-4">
              These Terms of Service ("Terms") govern your access to and use of the Zaukho streaming platform, 
              including any content, functionality, and services offered on or through our website and mobile applications
              (collectively, the "Service"). Please read these Terms carefully before using our Service.
            </p>
            <p className="text-gray-300 mb-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, 
              you must not access or use the Service.
            </p>
          </section>
          
          {/* Account Registration */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Account Registration and Security</h2>
            <p className="text-gray-300 mb-4">
              To access certain features of the Service, you may be required to register for an account. You agree to provide 
              accurate, current, and complete information during the registration process and to update such information 
              to keep it accurate, current, and complete.
            </p>
            <p className="text-gray-300 mb-4">
              You are responsible for safeguarding your password and for all activities that occur under your account. 
              You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
            </p>
          </section>
          
          {/* Subscription and Payments */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Subscriptions and Payments</h2>
            <p className="text-gray-300 mb-4">
              Zaukho offers various subscription plans and pay-per-view options. By subscribing to a plan or purchasing 
              content, you agree to pay the applicable fees as they become due.
            </p>
            <p className="text-gray-300 mb-4">
              Subscription fees are billed at the beginning of your subscription and on each renewal date. Unless you 
              cancel your subscription before the renewal date, you authorize us to charge the subscription fee for the 
              next billing cycle to your payment method.
            </p>
            <p className="text-gray-300 mb-4">
              All purchases and rentals are final and non-refundable, except as expressly set forth in our Refund Policy 
              or as required by applicable law.
            </p>
          </section>
          
          {/* Content Usage */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Content Usage and Restrictions</h2>
            <p className="text-gray-300 mb-4">
              The content provided through our Service, including but not limited to movies, TV shows, images, text, 
              graphics, logos, and software, is owned by Zaukho or its licensors and is protected by copyright, trademark, 
              and other intellectual property laws.
            </p>
            <p className="text-gray-300 mb-4">
              Your subscription or purchase grants you a limited, non-exclusive, non-transferable license to access and 
              view the content solely for your personal, non-commercial use. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Reproduce, distribute, publicly display, or publicly perform any content</li>
              <li>Modify, adapt, or create derivative works of any content</li>
              <li>Remove any copyright, trademark, or other proprietary notices</li>
              <li>Circumvent, disable, or interfere with security features of the Service</li>
              <li>Use any robot, spider, or other automatic device to access the Service</li>
              <li>Share your account credentials with others or allow others to access your account</li>
            </ul>
          </section>
          
          {/* Termination */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-gray-300 mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice or 
              liability, for any reason, including if you breach these Terms.
            </p>
            <p className="text-gray-300 mb-4">
              Upon termination, your right to use the Service will immediately cease. All provisions of these Terms 
              which by their nature should survive termination shall survive, including ownership provisions, warranty 
              disclaimers, indemnity, and limitations of liability.
            </p>
          </section>
          
          {/* Limitation of Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              To the maximum extent permitted by law, in no event shall Zaukho, its directors, employees, partners, 
              agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible 
              losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>
          
          {/* Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating 
              to these Terms or your use of the Service shall be brought exclusively in the federal or state courts 
              located in San Francisco County, California, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>
          
          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
              a material change will be determined at our sole discretion.
            </p>
            <p className="text-gray-300 mb-4">
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by 
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </section>
          
          {/* Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-800 p-4 rounded-lg inline-block">
              <p className="text-gray-300">legal@zaukho.com</p>
              <p className="text-gray-300">123 Streaming Street, San Francisco, CA 94105</p>
            </div>
          </section>
          
          {/* Other Policies */}
          <section className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/privacy-policy" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition">
                Privacy Policy
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

export default Terms; 