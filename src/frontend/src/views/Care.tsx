import React from 'react'

const Care: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-gray-900 my-5 text-2xl font-semibold mb-4">Care</h2>
          <p className="">
            Caring for your jewellery ensures it remains as beautiful and radiant as the day it was crafted. Our pieces are made from 
            925 or 999 silver, with some gold-plated designs, requiring thoughtful handling to preserve their quality and finish.
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">Silver Jewellery Care</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Avoid exposing silver jewellery to harsh chemicals, such as household cleaning products, perfumes, or chlorinated water.
              </li>
              <li>
                To reduce tarnish, store your silver jewellery in a dry, airtight container when not in use. Anti-tarnish strips can help.
              </li>
              <li>
                Clean your silver pieces regularly using a soft cloth or a silver polishing cloth. Avoid abrasive materials that may scratch the surface.
              </li>
              <li>
                For stubborn tarnish, use a gentle silver cleaner or a DIY solution of warm water, mild dish soap, and baking soda.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">Gold-Plated Jewellery Care</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Gold plating can wear over time. To extend its life, avoid wearing gold-plated jewellery during activities that cause heavy wear or sweating.
              </li>
              <li>
                Keep gold-plated jewellery away from perfumes, lotions, and chemicals to preserve its finish.
              </li>
              <li>
                Clean gently with a soft, damp cloth and avoid abrasive cleaners or polishing agents that could strip the gold layer.
              </li>
              <li>
                Store gold-plated items separately in soft pouches to prevent scratching.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">General Care Tips</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Put on your jewellery last when getting ready and remove it first when undressing to avoid accidental damage.
              </li>
              <li>
                Avoid wearing jewellery during physical activities, swimming, or bathing.
              </li>
              <li>
                Check clasps and settings periodically to ensure they remain secure.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-gray-900 text-xl font-semibold mb-4">Professional Maintenance</h2>
            <p className="leading-relaxed">
              For deep cleaning or repairs, consider visiting a professional jeweller. They can restore the finish of your silver or gold-plated pieces and address any wear or damage.
            </p>
            <p className="mt-4 leading-relaxed">
              With proper care, your jewellery from Sheba's Caravan will remain a timeless treasure, reflecting the beauty and craftsmanship 
              of its heritage.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Care