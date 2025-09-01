"use client";

export default function TermsOfService() {
  return (
    <div className="min-h-screen mt-18 bg-gray-50 text-gray-800">
      <section className="text-center py-16 px-6 bg-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-[#022f62] mb-4">Terms of Service</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
          These Terms of Service govern your use of our software development services. By using our services, you agree to these terms.
        </p>
      </section>

      <section className="container mx-auto py-16 px-6 max-w-4xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing our website or using our services, you agree to comply with these Terms of Service and any applicable laws or regulations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">2. Services Provided</h2>
          <p className="text-gray-700">
            We provide software development, web and mobile application services, AI and data solutions, and other IT services as described on our website. Service delivery depends on project agreements and contracts.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">3. Payment & Billing</h2>
          <p className="text-gray-700">
            Payment terms for services will be specified in project agreements. All fees are due as agreed and are non-refundable unless otherwise stated.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">4. Intellectual Property</h2>
          <p className="text-gray-700">
            All content, code, and materials provided by our company remain the property of our company unless explicitly assigned to the client through a contract.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">5. Limitations of Liability</h2>
          <p className="text-gray-700">
            We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our maximum liability is limited to the fees paid for the services rendered.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">6. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms of Service periodically. Changes will be posted on this page, and continued use of our services constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[#022f62] mb-2">7. Contact Us</h2>
          <p className="text-gray-700">
            For questions about these terms, contact us at <a href="mailto:info@elevaretech.site" className="text-[#50b4f1] underline">info@elevaretech.site</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
