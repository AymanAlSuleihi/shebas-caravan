import React, { useState, useEffect } from "react"
import Select, { StylesConfig } from "react-select"
import { ToolsService } from "../client/services/ToolsService"
import { useDarkMode } from "../contexts/DarkModeContext"

export const WireCalculator: React.FC = () => {
  const [radius, setRadius] = useState(0)
  const [length, setLength] = useState(0)
  const [weight, setWeight] = useState(0)
  const [result, setResult] = useState(0)
  const [unit, setUnit] = useState<string>("g")
  const [metals, setMetals] = useState<string[]>([])
  const [solveFor, setSolveFor] = useState("weight")
  const { isDarkMode } = useDarkMode()

  const options = metals.map(v => ({
    label: v,
    value: v
  }))
  interface Option {
    readonly label: string
    readonly value: string
  }
  const [alloy, setAlloy] = useState<Option>(options[0])

  useEffect(() => {
    if (alloy) {
      if (solveFor == "weight") {
        ToolsService.toolsWireWeight({
          "alloy": alloy.value,
          "radius": radius,
          "length": length,
        }).then((response) => setResult(response))
        setUnit("g")
      }
      else if (solveFor == "radius") {
        ToolsService.toolsWireRadius({
          "alloy": alloy.value,
          "length": length,
          "weight": weight,
        }).then((response) => setResult(response))
        setUnit("mm")
      }
      else if (solveFor == "length") {
        ToolsService.toolsWireLength({
          "alloy": alloy.value,
          "radius": radius,
          "weight": weight,
        }).then((response) => setResult(response))
        setUnit("mm")
      }
    }
  }, [alloy, radius, length, weight, solveFor])

  useEffect(() => {
    ToolsService.toolsMetals().then((response) => setMetals(response))
  }, [])

  const dropdownStyles: StylesConfig<Option, false> = {
    container: (provided) => ({
      ...provided,
      flexGrow: 1,
    }),
    control: (provided, state) => ({
      ...provided,
      border: "none",
      minHeight: "24px",
      height: "24px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      backgroundColor: isDarkMode ? (state.isFocused ? "#555555" : "#424242") : (state.isFocused ? "#e5e7eb" : "#fff"),
      color: isDarkMode ? "#d1d5db" : "#000",
      boxShadow: state.isFocused ? "none" : "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "24px",
      padding: "0 8px",
      color: isDarkMode ? "#d1d5db" : "#000",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
      color: isDarkMode ? "#d1d5db" : "#000",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "24px",
      color: isDarkMode ? "#d1d5db" : "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "1px",
      backgroundColor: state.isSelected ? (isDarkMode ? "#333333" : "#e5e7eb") : (state.isFocused ? (isDarkMode ? "#555555" : "#f3f4f6") : (isDarkMode ? "#424242" : "#fff")),
      color: isDarkMode ? "#d1d5db" : "#000",
      ":active": {
        backgroundColor: isDarkMode ? "#777777" : "#f3f4f6",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkMode ? "#d1d5db" : "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? "#424242" : "#fff",
      color: isDarkMode ? "#d1d5db" : "#000",
    }),
  }

  return (
    <div className={`rounded border ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
      <div className="mx-2">
        <form className="max-w-sm mx-auto">
          <h3 className={`my-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Wire Calculator</h3>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              =
            </span>
            <p className={`grid col-span-9 text-sm text-center px-3 ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}>{ result.toFixed(2) } { unit }</p>
          </div>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              Alloy
            </span>
            <Select
              styles={dropdownStyles}
              className="text-sm grid col-span-9"
              value={alloy}
              options={options}
              onChange={ (e) => setAlloy(e!) }
            />
          </div>
          <div className={`grid grid-cols-4 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-1 items-center px-3 border-r ${isDarkMode ? "bg-black/30 text-gray-200 border-gray-700" : "bg-gray-200 text-gray-900 border-gray-300"}`}>
              Solve For
            </span>
            <div className="grid col-span-1">
              <input
                type="radio"
                id="wire-weight"
                name="solve-for"
                value="weight"
                defaultChecked={true}
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="wire-weight" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} border-r flex items-center justify-center h-full`}>
                Weight
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                type="radio"
                id="wire-radius"
                name="solve-for"
                value="radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="wire-radius" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} border-r flex items-center justify-center h-full`}>
                Radius
              </label>
            </div>
            <div className="grid col-span-1">
              <input
                className="text-sm hidden peer"
                type="radio"
                id="wire-length"
                name="solve-for"
                value="length"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
              />
              <label htmlFor="wire-length" className={`text-sm ${isDarkMode ? "peer-checked:bg-gray-900/50 text-gray-200 border-gray-700" : "peer-checked:bg-gray-400/30 text-gray-900 border-gray-300"} flex items-center justify-center h-full`}>
                Length
              </label>
            </div>
          </div>
          {
            solveFor != "radius" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Radius
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={radius}
                onChange={(event) => {
                  setRadius(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                mm
              </span>
            </div>
          }
          {
            solveFor != "length" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Length
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={length}
                onChange={(event) => {
                  setLength(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                mm
              </span>
            </div>
          }
          {
            solveFor != "weight" && 
            <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "border-gray-300"}`}>
              <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                Weight
              </span>
              <input
                className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
                type="number"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.valueAsNumber)
                }}
              />
              <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
                g
              </span>
            </div>
          }
        </form>
      </div>
    </div>
  )
}