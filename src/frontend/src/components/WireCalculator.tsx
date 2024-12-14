import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

import { ToolsService } from '../client/services/ToolsService'

export const WireCalculator: React.FC = () => {
  const [radius, setRadius] = useState(0)
  const [length, setLength] = useState(0)
  const [weight, setWeight] = useState(0)
  const [result, setResult] = useState(0)
  const [unit, setUnit] = useState<string>("g")
  const [metals, setMetals] = useState<string[]>([])
  const [solveFor, setSolveFor] = useState("weight")

  const options = metals.map(v => ({
    label: v,
    value: v
  }));
  interface Option {
    readonly label: string;
    readonly value: string;
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
    control: (provided) => ({
      ...provided,
      // background: "#fff",
      // borderColor: "#9e9e9e",
      border: "none",
      minHeight: "24px",
      height: "24px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "24px",
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "24px",
    }),
    option: (provided) => ({
      ...provided,
      padding: "1px",
    }),
  }

  return (
    <div className="bg-gray-100 rounded border border-gray-300">
      <div className="mx-2">
        <form className="max-w-sm mx-auto">
          <h3 className="my-2 font-semibold">Wire Calculator</h3>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              =
            </span>
            <p className="grid col-span-9 text-sm text-center px-3 bg-gray-100">{ result.toFixed(2) } { unit }</p>
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
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
          <div className="grid grid-cols-4 mb-2 border border-gray-300 rounded">
            <span className="text-sm grid col-span-1 items-center px-3 bg-gray-200 border-r border-gray-300">
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
              <label htmlFor="wire-weight" className="text-sm peer-checked:bg-gray-200 border-r border-gray-300 flex items-center justify-center h-full">
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
              <label htmlFor="wire-radius" className="text-sm peer-checked:bg-gray-200 border-r border-gray-300 flex items-center justify-center h-full">
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
              <label htmlFor="wire-length" className="text-sm peer-checked:bg-gray-200 flex items-center justify-center h-full">
                Length
              </label>
            </div>
          </div>
          {
            solveFor != "radius" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
                Radius
              </span>
              <input
                className="text-sm grid col-span-7 text-right"
                type="number"
                value={radius}
                onChange={(event) => {
                  setRadius(event.target.valueAsNumber)
                }}
              />
              <span className="text-sm grid col-span-2 bg-gray-200">
                mm
              </span>
            </div>
          }
          {
            solveFor != "length" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
                Length
              </span>
              <input
                className="text-sm grid col-span-7 text-right"
                type="number"
                value={length}
                onChange={(event) => {
                  setLength(event.target.valueAsNumber)
                }}
              />
              <span className="text-sm grid col-span-2 bg-gray-200">
                mm
              </span>
            </div>
          }
          {
            solveFor != "weight" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
                Weight
              </span>
              <input
                className="text-sm grid col-span-7 text-right"
                type="number"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.valueAsNumber)
                }}
              />
              <span className="text-sm grid col-span-2 bg-gray-200">
                g
              </span>
            </div>
          }
        </form>
      </div>
    </div>
  )
}