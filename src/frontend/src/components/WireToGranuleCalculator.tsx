import React, { useState, useEffect } from 'react'

import { ToolsService } from '../client/services/ToolsService'

export const WireToGranuleCalculator: React.FC = () => {
  const [granuleRadius, setGranuleRadius] = useState(0)
  const [wireRadius, setWireRadius] = useState(0)
  const [rodRadius, setRodRadius] = useState(0)
  const [result, setResult] = useState(0)
  const [solveFor, setSolveFor] = useState("granule-radius")

  useEffect(() => {
    if (solveFor == "granule-radius") {
      ToolsService.toolsWireToGranuleGranuleRadius({
        "wireRadius": wireRadius,
        "rodRadius": rodRadius,
      }).then((response) => setResult(response))
    }
    else if (solveFor == "wire-radius") {
      ToolsService.toolsWireToGranuleWireRadius({
        "rodRadius": rodRadius,
        "granuleRadius": granuleRadius,
      }).then((response) => setResult(response))
    }
    else if (solveFor == "rod-radius") {
      ToolsService.toolsWireToGranuleRodRadius({
        "wireRadius": wireRadius,
        "granuleRadius": granuleRadius,
      }).then((response) => setResult(response))
    }
  }, [granuleRadius, wireRadius, rodRadius, solveFor])

  return (
    <div className="bg-gray-100 rounded border border-gray-300">
      <div className="mx-2">
        <form className="max-w-sm mx-auto">
          <h3 className="my-2 font-semibold">Wire to Granule Calculator</h3>
          <p>{ result.toFixed(2) } mm</p>
          <div className="grid grid-cols-4 mb-2 border border-gray-300 rounded">
            <span className="grid col-span-1 items-center px-3 bg-gray-200 border-r border-gray-300">
              Solve For
            </span>
            <div className="grid col-span-1">
              <input
                type="radio"
                id="wtg-granule-radius"
                name="solve-for"
                value="granule-radius"
                defaultChecked={true}
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="wtg-granule-radius" className="peer-checked:bg-gray-200 border-r border-gray-300">
                Granule Radius
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                type="radio"
                id="wtg-wire-radius"
                name="solve-for"
                value="wire-radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="wtg-wire-radius" className="peer-checked:bg-gray-200 border-r border-gray-300">
                Wire Radius
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                type="radio"
                id="wtg-rod-radius"
                name="solve-for"
                value="rod-radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="wtg-rod-radius" className="peer-checked:bg-gray-200">
                Rod Radius
              </label>
            </div>
          </div>
          {
            solveFor != "granule-radius" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="grid col-span-3 items-center px-3 bg-gray-200">
                Granule Radius
              </span>
              <input
                className="grid col-span-7 text-right"
                type="number"
                value={granuleRadius}
                onChange={(event) => {
                  setGranuleRadius(event.target.valueAsNumber)
                }}
              />
              <span className="grid col-span-2 bg-gray-200 content-center">
                mm
              </span>
            </div>
          }
          {
            solveFor != "wire-radius" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="grid col-span-3 items-center px-3 bg-gray-200">
                Wire Radius
              </span>
              <input
                className="grid col-span-7 text-right"
                type="number"
                value={wireRadius}
                onChange={(event) => {
                  setWireRadius(event.target.valueAsNumber)
                }}
              />
              <span className="grid col-span-2 bg-gray-200 content-center">
                mm
              </span>
            </div>
          }
          {
            solveFor != "rod-radius" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="grid col-span-3 items-center px-3 bg-gray-200">
                Rod Radius
              </span>
              <input
                className="grid col-span-7 text-right"
                type="number"
                value={rodRadius}
                onChange={(event) => {
                  setRodRadius(event.target.valueAsNumber)
                }}
              />
              <span className="grid col-span-2 bg-gray-200 content-center">
                mm
              </span>
            </div>
          }
        </form>
      </div>
    </div>
  )
}