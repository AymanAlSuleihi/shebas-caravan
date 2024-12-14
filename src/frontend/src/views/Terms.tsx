import React from 'react'

const Terms: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-gray-900 my-5 text-2xl font-semibold mb-4">Terms and Conditions</h2>
          <p>
            Please read these Terms and Conditions carefully before using Sheba's Caravan services. By accessing or using our website, you agree to 
            be bound by these terms. If you do not agree to any part of these terms, you must not use our website or services.
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">1. General Information</h2>
            <p className="leading-relaxed">
              Sheba's Caravan specializes in handcrafted jewellery inspired by the rich heritage of Ancient South Arabia and Yemenite artistry. 
              Our pieces are made using traditional techniques and high-quality materials to ensure authenticity and durability.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">2. Use of the Website</h2>
            <p className="leading-relaxed">
              You agree to use our website for lawful purposes only. Any unauthorized use of the website, including but not limited to data extraction, 
              reverse engineering, or other misuse, is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">3. Orders and Payments</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Order Fulfillment:</span> Made-to-order items take 2–4 weeks to fulfill, while in-stock items are shipped within 2 business days.
              </li>
              <li>
                <span className="font-semibold">Pricing and Payment:</span> All prices are displayed in GBP and are subject to change without notice. Payments must be made 
                in full at the time of purchase.
              </li>
              <li>
                <span className="font-semibold">Custom Orders:</span> We may accept custom orders upon request. Additional terms and conditions may apply.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <p className="leading-relaxed">
              We offer free domestic shipping within the UK and ship worldwide upon request. Delivery times may vary depending on your location and 
              the availability of the items. Any customs duties or import taxes are the responsibility of the customer.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">5. Returns and Refunds</h2>
            <p className="leading-relaxed">
              We accept returns of in-stock items within 30 days of delivery, provided the items are in their original condition and packaging. 
              Made-to-order or custom items are non-refundable. Please contact us for return instructions.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on this website, including designs, text, and images, is the intellectual property of Sheba's Caravan. Unauthorized reproduction 
              or distribution is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="leading-relaxed">
              Sheba's Caravan shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or 
              products. Our liability is limited to the value of the product purchased.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">8. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from 
              these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">9. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to update or modify these terms at any time without prior notice. Please review this page periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">10. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns regarding these terms and conditions, please contact us at {" "}
              <a 
                href="mailto:contact@shebascaravan.com" 
                className="underline hover:text-gray-700"
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

export default Terms
