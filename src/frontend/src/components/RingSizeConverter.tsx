import React, { useState, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'

import { ToolsService } from '../client/services/ToolsService'

export const RingSizeConverter: React.FC = () => {
//   const [ringWidth, setRingWidth] = useState(0)
//   const [sheetThickness, setSheetThickness] = useState(0)
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
  const [sizeFormatFrom, setSizeFormatFrom] = useState<Option>(sizeFormatOptions[0])
  const [sizeFormatTo, setSizeFormatTo] = useState<Option>(sizeFormatOptions[0])

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
    if (sizeFormatFrom) {
      ToolsService.toolsRingSizeOptions({
        "locale": sizeFormatFrom.value,
      }).then((response) => setRingSizes(response))
    }
  }, [sizeFormatFrom])

  useEffect(() => {
    if (sizeFormatTo && sizeFormatTo && ringSize) {
      ToolsService.toolsRingSizeConverter({
          "sizeFormatFrom": sizeFormatFrom.value,
          "sizeFormatTo": sizeFormatTo.value,
          "ringSize": ringSize.value,
      }).then((response) => setResult(response))
    }
  }, [sizeFormatFrom, sizeFormatTo, ringSize])

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
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  }

  return (
    <div className="bg-gray-100 rounded border border-gray-300">
      <div className="mx-2">
        <form className="max-w-sm mx-auto">
          <h3 className="my-2 font-semibold text-center">Ring Size Converter</h3>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
              <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
                =
              </span>
              <p className="grid col-span-9 text-sm text-center px-3 bg-gray-100">{ result }</p>
            </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm grid col-span-3 items-center px-3 bg-gray-200">
              From
            </span>
            <Select
              className="text-sm grid col-span-9"
              styles={dropdownStyles}
              value={sizeFormatFrom}
              options={sizeFormatOptions}
              onChange={ (e) => setSizeFormatFrom(e!) }
            />
          </div>
          <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
            <span className="text-sm  grid col-span-3 items-center px-3 bg-gray-200">
              To
            </span>
            <Select
              className="text-sm grid col-span-9"
              styles={dropdownStyles}
              value={sizeFormatTo}
              options={sizeFormatOptions}
              onChange={ (e) => setSizeFormatTo(e!) }
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
        </form>
      </div>
    </div>
  )
}