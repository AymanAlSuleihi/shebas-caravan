import React, { useState, useEffect } from "react"
import { ToolsService } from "../client/services/ToolsService"
import { useDarkMode } from "../contexts/DarkModeContext"

export const WireToGranuleCalculator: React.FC = () => {
  const [granuleRadius, setGranuleRadius] = useState(0)
  const [wireRadius, setWireRadius] = useState(0)
  const [rodRadius, setRodRadius] = useState(0)
  const [result, setResult] = useState(0)
  const [unit, setUnit] = useState<string>("")
  const [solveFor, setSolveFor] = useState("granule-radius")
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    if (solveFor == "granule-radius") {
      ToolsService.toolsWireToGranuleGranuleRadius({
        "wireRadius": wireRadius,
        "rodRadius": rodRadius,
      }).then((response) => setResult(response))
      setUnit("mm")
    }
    else if (solveFor == "wire-radius") {
      ToolsService.toolsWireToGranuleWireRadius({
        "rodRadius": rodRadius,
        "granuleRadius": granuleRadius,
      }).then((response) => setResult(response))
      setUnit("mm")
    }
    else if (solveFor == "rod-radius") {
      ToolsService.toolsWireToGranuleRodRadius({
        "wireRadius": wireRadius,
        "granuleRadius": granuleRadius,
      }).then((response) => setResult(response))
      setUnit("mm")
    }
  }, [granuleRadius, wireRadius, rodRadius, solveFor])

  return (
    <div className={`rounded border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
      <div className="mx-2">
        <form className="max-w-sm mx-auto">
          <h3 className={`my-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Wire to Granule Calculator</h3>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              =
            </span>
            <p className={`grid col-span-9 text-sm text-center px-3 ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}>{ result.toFixed(2) } { unit }</p>
          </div>
          <div className={`grid grid-cols-4 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-1 items-center px-3 border-r ${isDarkMode ? "bg-black/30 text-gray-200 border-gray-700" : "bg-gray-200 text-gray-900 border-gray-300"}`}>
              Solve For
            </span>
            <div className="grid col-span-1">
              <input
                className="text-sm hidden peer"
                type="radio"
                id="wtg-granule-radius"
                name="solve-for"
                value="granule-radius"
                defaultChecked={true}
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
              />
              <label htmlFor="wtg-granule-radius" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} border-r flex items-center justify-center h-full`}>
                Granule Radius
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                className="text-sm hidden peer"
                type="radio"
                id="wtg-wire-radius"
                name="solve-for"
                value="wire-radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
              />
              <label htmlFor="wtg-wire-radius" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} border-r flex items-center justify-center h-full`}>
                Wire Radius
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                className="text-sm hidden peer"
                type="radio"
                id="wtg-rod-radius"
                name="solve-for"
                value="rod-radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
              />
              <label htmlFor="wtg-rod-radius" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} flex items-center justify-center h-full`}>
                Rod Radius
              </label>
            </div>
          </div>
          {
            solveFor != "granule-radius" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Granule Radius
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={granuleRadius}
                onChange={(event) => {
                  setGranuleRadius(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                mm
              </span>
            </div>
          }
          {
            solveFor != "wire-radius" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Wire Radius
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={wireRadius}
                onChange={(event) => {
                  setWireRadius(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                mm
              </span>
            </div>
          }
          {
            solveFor != "rod-radius" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Rod Radius
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={rodRadius}
                onChange={(event) => {
                  setRodRadius(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                mm
              </span>
            </div>
          }
        </form>
      </div>
    </div>
  )
}