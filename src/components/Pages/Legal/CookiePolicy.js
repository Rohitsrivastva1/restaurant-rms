import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Home/Nav';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="hm" style={{ minHeight: 'auto', background: 'transparent', overflow: 'visible' }}>
        <Nav />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 10, 2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit 
                our website. They help us provide you with a better experience by remembering your preferences 
                and enabling certain functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>To remember your login status and preferences</li>
                <li>To analyze how you use our website</li>
                <li>To improve our website's performance and functionality</li>
                <li>To provide personalized content and advertisements</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions 
                like page navigation and access to secure areas of the website.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Performance Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies collect information about how visitors use our website, such as which pages 
                are visited most often and if visitors get error messages from web pages.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Functionality Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies allow the website to remember choices you make and provide enhanced, more 
                personal features.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Marketing Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are used to track visitors across websites to display relevant and engaging 
                advertisements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may also use third-party cookies from trusted partners to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide social media features</li>
                <li>Deliver targeted advertisements</li>
                <li>Process payments securely</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control and manage cookies in several ways:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. You can 
                set your browser to refuse cookies or delete certain cookies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Cookie Consent</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie consent banner. You can choose to 
                accept or decline non-essential cookies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Opt-Out Links</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For third-party cookies, you can often opt out directly through the third-party's website 
                or through industry opt-out pages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you choose to disable cookies, some features of our website may not function properly:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>You may need to log in repeatedly</li>
                <li>Your preferences may not be saved</li>
                <li>Some interactive features may not work</li>
                <li>We may not be able to provide personalized content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookie Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Session cookies: Deleted when you close your browser</li>
                <li>Persistent cookies: Remain on your device for a set period</li>
                <li>Essential cookies: Typically retained for the duration of your session</li>
                <li>Analytics cookies: Usually retained for 1-2 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                for other operational, legal, or regulatory reasons. We will notify you of any material 
                changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> privacy@servya.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Servya Technologies Pvt Ltd, Tech Park, Sector 5, Gurgaon, Haryana 122001
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
