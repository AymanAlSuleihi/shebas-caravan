import React from 'react'

const About: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-6 sm:px-8 lg:px-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900">About</h2>
          <p className="mt-4 text-gray-700">
            Discover the timeless beauty of handcrafted jewellery inspired by the rich heritage of Ancient South Arabia and Yemenite artistry.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Sheba's Caravan was born from a deep passion for preserving the traditions and craftsmanship of South Arabian and Yemenite culture.
              Each piece is meticulously designed to reflect the historical artistry and spiritual significance of the region. Our mission is to
              bridge the past and the present by creating timeless pieces that resonate with modern sensibilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Craft</h2>
            <p className="text-gray-700 leading-relaxed">
              Every item in our collection is handcrafted using traditional techniques. From intricate filigree patterns to bold, statement-making designs,
              our jewellery celebrates the stories, landscapes, and spirit of the ancient kingdoms of Saba and beyond.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We are committed to sourcing high-quality materials ethically and sustainably, ensuring that every piece not only looks beautiful
              but is made with respect for both people and the planet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Authenticity:</strong> Each design draws from centuries-old motifs and cultural traditions.
              </li>
              <li>
                <strong>Quality:</strong> We use only the finest materials, ensuring our jewellery stands the test of time.
              </li>
              <li>
                <strong>Meaningful Design:</strong> We create pieces with symbolic and historical resonance, offering more than just beauty.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Meaning</h2>
            <p className="text-gray-700 leading-relaxed">
              The name Sheba's Caravan is inspired by the legendary Queen of Sheba, renowned for her wisdom, wealth, and the vibrant cultural heritage
              of her realm. Ancient South Arabia, home to a constellation of kingdoms including Saba, was a flourishing center of trade, art, and storytelling.
              At the heart of this prosperity was the famed Incense Route, where caravans carried prized frankincense and myrrh alongside treasures, knowledge,
              and traditions. These caravans traversed the Arabian Peninsula, carrying trade between Asia, Africa, and Europe, connecting civilizations and
              shaping the course of history.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Our name reflects this spirit of connection and exchange. Like the fabled caravans of old, we aim to carry the beauty and heritage of
              Ancient South Arabia and Yemen to the modern world. Each piece of jewellery serves as a tribute to this legacy, embodying the timeless
              stories and artistry of the region.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default About