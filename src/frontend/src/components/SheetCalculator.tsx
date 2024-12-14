import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

import { ToolsService } from '../client/services/ToolsService'

export const SheetCalculator: React.FC = () => {
  const [height, setHeight] = useState(0)
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [result, setResult] = useState(0)
  const [metals, setMetals] = useState<string[]>([])

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
      ToolsService.toolsSheetWeight({
        "alloy": alloy.value,
        "dimX": height,
        "dimY": length,
        "dimZ": width,
      }).then((response) => setResult(response))
    }
  }, [alloy, height, length, width])

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
          <h3 className="my-2 font-semibold">Sheet Calculator</h3>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              =
            </span>
            <p className="grid col-span-9 text-sm text-center px-3 bg-gray-100">{ result.toFixed(2) } g</p>
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 rounded-l">
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
          <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Height
            </span>
            <input
              className="text-sm grid col-span-7 text-right"
              type="number"
              value={height}
              onChange={(event) => {
                setHeight(event.target.valueAsNumber)
              }}
            />
            <span className="text-sm grid col-span-2 bg-gray-200">
              mm
            </span>
          </div>
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
          <div className="grid grid-cols-12 mb-2 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Width
            </span>
            <input
              className="text-sm grid col-span-7 text-right"
              type="number"
              value={width}
              onChange={(event) => {
                setWidth(event.target.valueAsNumber)
              }}
            />
            <span className="text-sm grid col-span-2 bg-gray-200">
              mm
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}