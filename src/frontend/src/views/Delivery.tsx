import React from 'react'

const Delivery: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">Delivery</h2>
          <p className="mt-4 text-gray-700">
            At Sheba's Caravan, we are dedicated to delivering your jewellery with care and attention. Below, you'll find details about our fulfillment 
            times and shipping policies.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fulfillment Times</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Made-to-Order Items:</strong> Handcrafted with care, these pieces take 2–4 weeks to fulfill. This time allows us to ensure the 
                highest quality and attention to detail for each unique design.
              </li>
              <li>
                <strong>In-Stock Items:</strong> These are shipped within 2 business days of your order being placed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Options</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Free Domestic Shipping:</strong> We offer free shipping within the UK on all orders, ensuring you receive your jewellery at no extra cost.
              </li>
              <li>
                <strong>Worldwide Shipping:</strong> International shipping is available upon request. Please contact us for rates and delivery times.
              </li>
              <li>
                All orders are carefully packaged to protect your jewellery during transit, ensuring it arrives in perfect condition.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tracking and Delivery</h2>
            <p className="text-gray-700 leading-relaxed">
              Once your order is shipped, you will receive a confirmation email with a tracking number (if applicable). Delivery times may vary depending on 
              your location, but we strive to ensure prompt and reliable service.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              For international shipments, customs clearance may extend delivery times. Any applicable customs duties or taxes are the responsibility of the recipient.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions?</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about your delivery, please don't hesitate to contact us. We're here to help ensure your experience with 
              Sheba's Caravan is seamless and enjoyable.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Delivery
