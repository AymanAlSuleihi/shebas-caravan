import React from 'react'

import { SheetCalculator } from '../components/SheetCalculator'
import { WireCalculator } from '../components/WireCalculator'
import { GranuleCalculator } from '../components/GranuleCalculator'
import { WireToGranuleCalculator } from '../components/WireToGranuleCalculator'
import { RingBlankCalculator } from '../components/RingBlankCalculator'
import { RingSizeConverter } from '../components/RingSizeConverter'

const Tools: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 text-2xl font-semibold text-gray-900">Tools</h2>
          <div className="flex-wrap grid md:grid-cols-3 text-center gap-2">
            <SheetCalculator/>
            <WireCalculator/>
            <GranuleCalculator/>
            <WireToGranuleCalculator/>
            <RingBlankCalculator/>
            <RingSizeConverter/>
          </div>
        </div>
    </main>
  )
}

export default Tools