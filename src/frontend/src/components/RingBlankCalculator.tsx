import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

import { ToolsService } from '../client/services/ToolsService'

export const RingBlankCalculator: React.FC = () => {
  const [ringWidth, setRingWidth] = useState(0)
  const [sheetThickness, setSheetThickness] = useState(0)
  const [result, setResult] = useState(0)

  interface Option {
    readonly label: string;
    readonly value: string;
  }
  const [sizeFormats, setSizeFormats] = useState<string[]>([])
  const sizeFormatOptions = sizeFormats.map(v => ({
    label: v,
    value: v
  }));
  const [sizeFormat, setSizeFormat] = useState<Option>(sizeFormatOptions[0])

  const [ringSizes, setRingSizes] = useState<string[]>([])
  const ringSizeOptions = ringSizes.map(v => ({
    label: v,
    value: v
  }));
  const [ringSize, setRingSize] = useState<Option>(ringSizeOptions[0])

  useEffect(() => {
    ToolsService.toolsRingSizeFormats().then((response) => setSizeFormats(response))
  }, [])

  useEffect(() => {
    if (sizeFormat) {
      ToolsService.toolsRingSizeOptions({
        "locale": sizeFormat.value,
      }).then((response) => setRingSizes(response))
    }
  }, [sizeFormat])

  useEffect(() => {
    if (ringSize && sizeFormat) {
      ToolsService.toolsRingBlank({
        "ringSize": ringSize.value,
        "sizeFormat": sizeFormat.value,
        "ringWidth": ringWidth,
        "sheetThickness": sheetThickness,
      }).then((response) => setResult(response))
    }
  }, [ringSize, ringWidth, sheetThickness])

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
          <h3 className="my-2 font-semibold">Ring Blank Calculator</h3>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              =
            </span>
            <p className="grid col-span-9 text-sm text-center px-3 bg-gray-100">{ result.toFixed(2) } mm</p>
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Format
            </span>
            <Select
              className="text-sm grid col-span-9"
              styles={dropdownStyles}
              value={sizeFormat}
              options={sizeFormatOptions}
              onChange={ (e) => setSizeFormat(e!) }
            />
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Size
            </span>
            <Select
              className="text-sm grid col-span-9"
              styles={dropdownStyles}
              value={ringSize}
              options={ringSizeOptions}
              onChange={ (e) => setRingSize(e!) }
            />
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Width
            </span>
            <input
              className="text-sm grid col-span-7 text-right"
              type="number"
              value={ringWidth}
              onChange={(event) => {
                setRingWidth(event.target.valueAsNumber)
              }}
            />
            <span className="text-sm grid col-span-2 bg-gray-200">
              mm
            </span>
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              Thickness
            </span>
            <input
              className="text-sm grid col-span-7 text-right"
              type="number"
              value={sheetThickness}
              onChange={(event) => {
                setSheetThickness(event.target.valueAsNumber)
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