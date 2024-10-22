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
    ToolsService.toolsRingSizeOptions({
      "locale": sizeFormatFrom?.value,
    }).then((response) => setRingSizes(response))
  }, [sizeFormatFrom])

  useEffect(() => {
    ToolsService.toolsRingSizeConverter({
        "sizeFormatFrom": sizeFormatFrom?.value,
        "sizeFormatTo": sizeFormatTo?.value,
        "ringSize": ringSize?.value,
    }).then((response) => setResult(response))
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
    <div className="max-w-sm bg-gray-100 rounded border border-gray-300">
      <form className="mx-2">
        <h3 className="my-2 font-semibold text-center">Ring Size Converter</h3>
        <p className="text-center">{ result }</p>
        <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
          <span className="grid col-span-3 items-center px-3 bg-gray-200">
            From
          </span>
          <Select
            styles={dropdownStyles}
            className="grid col-span-9"
            value={sizeFormatFrom}
            options={sizeFormatOptions}
            onChange={ (e) => setSizeFormatFrom(e!) }
          />
        </div>
        <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
          <span className="grid col-span-3 items-center px-3 bg-gray-200">
            To
          </span>
          <Select
            styles={dropdownStyles}
            className="grid col-span-9"
            value={sizeFormatTo}
            options={sizeFormatOptions}
            onChange={ (e) => setSizeFormatTo(e!) }
          />
        </div>
        <div className="grid grid-cols-12 mb-2 bg-gray-200 border border-gray-300 rounded">
          <span className="grid col-span-3 items-center px-3 bg-gray-200">
            Size
          </span>
          <Select
            styles={dropdownStyles}
            className="grid col-span-9"
            value={ringSize}
            options={ringSizeOptions}
            onChange={ (e) => setRingSize(e!) }
          />
          <span className="grid col-span-2 bg-gray-200">
            
          </span>
        </div>
      </form>
    </div>
  )
}