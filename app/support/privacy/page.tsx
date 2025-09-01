"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 mt-18">
      <section className="text-center py-16 px-6 bg-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-[#022f62] mb-4">Privacy Policy</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
        </p>
      </section>

      <section className="container mx-auto py-16 px-6 max-w-4xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">1. Information We Collect</h2>
          <p className="text-gray-700">
            We may collect personal information like your name, email, and company details when you contact us or use our services. We also collect non-personal information to improve our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">2. How We Use Information</h2>
          <p className="text-gray-700">
            Information collected is used to provide our services, respond to inquiries, improve user experience, and communicate updates. We do not sell your data to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">3. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We may use cookies and similar technologies to enhance website functionality and analyze usage patterns. You can control cookie preferences through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">4. Data Security</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">5. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Updates will be posted on this page, and the date of revision will be noted.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">6. Contact Us</h2>
          <p className="text-gray-700">
            For questions about this policy, please contact us at <a href="mailto:info@elevaretech.site" className="text-[#50b4f1] underline">info@elevaretech.site</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
