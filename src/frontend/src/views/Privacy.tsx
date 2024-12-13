import React from 'react'

const Privacy: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">Privacy Policy</h2>
          <p className="mt-4 text-gray-700">
            At Sheba's Caravan, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect 
            your personal information when you visit our website or use our services.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Personal Information:</strong> Your name, email address, phone number, shipping and billing address, and payment details.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> Data such as IP address, browser type, and browsing behavior collected through cookies and analytics tools.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To process and fulfill your orders, including shipping and payment transactions.</li>
              <li>To provide customer support and respond to your inquiries.</li>
              <li>To send updates about your order or promotional offers (only if you have opted in).</li>
              <li>To improve our website, services, and customer experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and will never sell your personal information. However, we may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party companies that help us process payments, ship orders, or provide analytics.
              </li>
              <li>
                <strong>Legal Requirements:</strong> Authorities if required to comply with legal obligations or to protect our rights.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We take the security of your personal information seriously and implement appropriate measures to protect it. However, no system is entirely secure, 
              and we cannot guarantee the absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies and similar technologies to enhance your browsing experience and collect usage data. You can manage your cookie preferences 
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at [Insert Contact Email].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
              Please review this policy periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our handling of your data, please contact us at {" "}
              <a 
                href="mailto:contact@shebascaravan.com" 
                className="text-gray-800 underline hover:text-gray-700"
              >
                contact@shebascaravan.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Privacy