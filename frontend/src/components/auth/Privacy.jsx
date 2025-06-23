import React from 'react';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const Privacy = () => {
  return (
    <>
    <Navbar/>
    
    <div className="p-8 max-w-4xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4"><strong>Last Updated:</strong> June 16, 2025</p>

      <p className="mb-4">
        This Privacy Policy describes how <strong>PathForward</strong> ("we", "us", or "our") collects, uses, and protects your information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Personal Info:</strong> Name, email, contact number, role, etc.</li>
        <li><strong>Usage Data:</strong> IP address, browser type, device info.</li>
        <li><strong>Uploaded Data:</strong> Resume, profile image, job applications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To create and manage your account.</li>
        <li>To match you with relevant job opportunities.</li>
        <li>To improve the platform and user experience.</li>
        <li>To send important updates, like job alerts or notifications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="mb-4">
        We only share information with:
        <ul className="list-disc ml-6">
          <li>Verified recruiters (for job seekers)</li>
          <li>Service providers (e.g., hosting, analytics)</li>
          <li>Law enforcement, if required by law</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to remember your preferences, session management, and to improve our service. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your data but cannot guarantee 100% security. You are responsible for keeping your password secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You can request to update, delete, or access your data by contacting us. We will respond within a reasonable timeframe.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to this Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        If you have questions, contact us at: <strong>support@pathforward.com</strong>
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default Privacy;
