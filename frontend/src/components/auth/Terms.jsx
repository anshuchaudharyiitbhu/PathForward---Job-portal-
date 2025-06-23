import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Terms = () => {
  return (
    <>
    <Navbar/>
    <div className="p-8 max-w-4xl mx-auto text-gray-800 leading-relaxed">
        
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        <strong>Last Updated:</strong> June 16, 2025
      </p>

      <p className="mb-4">
        Welcome to <strong>PathForward</strong>! By accessing or using our website, you agree to these Terms & Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">Using our platform means you accept our terms and privacy policy.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Eligibility</h2>
      <p className="mb-4">You must be 18+ or the legal working age in your country.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Account Registration</h2>
      <p className="mb-4">Provide accurate details. You're responsible for your login credentials.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. User Responsibilities</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Don't post false or offensive content.</li>
        <li>Be respectful and professional.</li>
        <li>Follow all applicable laws.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Platform Usage</h2>
      <p className="mb-4">Job seekers and recruiters must use the platform fairly. Misuse can lead to suspension.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
      <p className="mb-4">All site content belongs to PathForward and can’t be copied without permission.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
      <p className="mb-4">We can suspend your account for any violation of our terms.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Limitation of Liability</h2>
      <p className="mb-4">We’re not responsible for job outcomes or offers. Use the platform at your own risk.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
      <p className="mb-4">For questions, email us at <strong>support@pathforward.com</strong></p>
    </div>
    <Footer/>
    </>
  );
};

export default Terms;
