import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

import { ToolsService } from '../client/services/ToolsService'

export const GranuleCalculator: React.FC = () => {
  const [radius, setRadius] = useState(0)
  const [weight, setWeight] = useState(0)
  const [result, setResult] = useState(0)
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
    if (solveFor == "weight") {
      ToolsService.toolsGranuleWeight({
        "alloy": alloy?.value,
        "radius": radius,
      }).then((response) => setResult(response))
    }
    else if (solveFor == "radius") {
      ToolsService.toolsGranuleRadius({
        "alloy": alloy?.value,
        "weight": weight,
      }).then((response) => setResult(response))
    }
  }, [alloy, radius, weight, solveFor])

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
          <h3 className="my-2 font-semibold">Granule Calculator</h3>
          <p>{ result.toFixed(2) } g</p>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="grid col-span-3 items-center px-3 bg-gray-200">
              Alloy
            </span>
            <Select
              styles={dropdownStyles}
              className="grid col-span-9"
              value={alloy}
              options={options}
              onChange={ (e) => setAlloy(e!) }
            />
          </div>
          <div className="grid grid-cols-8 mb-2 border border-gray-300 rounded">
            <span className="grid col-span-2 items-center px-3 bg-gray-200 border-r border-gray-300">
              Solve For
            </span>
            <div className="grid col-span-3">
              <input
                type="radio"
                id="granule-weight"
                name="solve-for"
                value="weight"
                defaultChecked={true}
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="granule-weight" className="peer-checked:bg-gray-200 border-r border-gray-300">
                Weight
              </label>
            </div>
            <div className="grid col-span-3">
              <input
                type="radio"
                id="granule-radius"
                name="solve-for"
                value="radius"
                onChange={(event) => {
                  setSolveFor(event.target.value)
                }}
                className="hidden peer"
              />
              <label htmlFor="granule-radius" className="peer-checked:bg-gray-200">
                Radius
              </label>
            </div>
          </div>
          {
            solveFor != "radius" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="grid col-span-3 items-center px-3 bg-gray-200">
                Radius
              </span>
              <input
                className="grid col-span-7 text-right"
                type="number"
                value={radius}
                onChange={(event) => {
                  setRadius(event.target.valueAsNumber)
                }}
              />
              <span className="grid col-span-2 bg-gray-200">
                mm
              </span>
            </div>
          }
          {
            solveFor != "weight" && 
            <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
              <span className="grid col-span-3 items-center px-3 bg-gray-200">
                Weight
              </span>
              <input
                className="grid col-span-7 text-right"
                type="number"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.valueAsNumber)
                }}
              />
              <span className="grid col-span-2 bg-gray-200">
                g
              </span>
            </div>
          }
        </form>
      </div>
    </div>
  )
}