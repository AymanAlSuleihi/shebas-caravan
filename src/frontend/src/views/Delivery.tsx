import React from "react"
import { useDarkMode } from "../contexts/DarkModeContext"

const Delivery: React.FC = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className={`my-5 text-2xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Delivery</h2>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
            At Sheba's Caravan, we are dedicated to delivering your jewellery with care and attention. Below, you'll find details about our fulfillment 
            times and shipping policies.
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Fulfillment Times</h2>
            <ul className={`list-disc list-inside ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
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
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Shipping Options</h2>
            <ul className={`list-disc list-inside ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              <li>
                <span className="font-semibold">Free Domestic Shipping:</span> We offer free shipping within the UK on all orders, ensuring you receive your jewellery at no extra cost.
              </li>
              <li>
                <span className="font-semibold">Worldwide Shipping:</span> International shipping is available upon request. Please contact us for rates and delivery times.
              </li>
              <li>
                All orders are carefully packaged to protect your jewellery during transit, ensuring it arrives in perfect condition.
              </li>
            </ul>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Tracking and Delivery</h2>
            <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              Once your order is shipped, you will receive a confirmation email with a tracking number (if applicable). Delivery times may vary depending on 
              your location, but we strive to ensure prompt and reliable service.
            </p>
            <p className={`mt-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
              For international shipments, customs clearance may extend delivery times. Any applicable customs duties or taxes are the responsibility of the recipient.
            </p>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Questions?</h2>
            <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
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
