import React, { useState, useEffect } from "react"
import Select, { StylesConfig } from "react-select"
import { ToolsService } from "../client/services/ToolsService"
import { useDarkMode } from "../contexts/DarkModeContext"

export const RingBlankCalculator: React.FC = () => {
  const [ringWidth, setRingWidth] = useState(0)
  const [sheetThickness, setSheetThickness] = useState(0)
  const [result, setResult] = useState(0)
  const { isDarkMode } = useDarkMode()

  interface Option {
    readonly label: string
    readonly value: string
  }
  const [sizeFormats, setSizeFormats] = useState<string[]>([])
  const sizeFormatOptions = sizeFormats.map(v => ({
    label: v,
    value: v
  }))
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
          <h3 className={`my-2 font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Ring Blank Calculator</h3>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              =
            </span>
            <p className={`grid col-span-9 text-sm text-center px-3 ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}>{ result.toFixed(2) } mm</p>
          </div>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
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
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
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
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              Width
            </span>
            <input
              className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
              type="number"
              value={ringWidth}
              onChange={(event) => {
                setRingWidth(event.target.valueAsNumber)
              }}
            />
            <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              mm
            </span>
          </div>
          <div className={`grid grid-cols-12 mb-2 border rounded ${isDarkMode ? "bg-gray-700/50 border-gray-700" : "bg-gray-200 border-gray-300"}`}>
            <span className={`text-sm grid col-span-3 items-center px-3 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              Thickness
            </span>
            <input
              className={`text-sm grid col-span-7 text-right ${isDarkMode ? "bg-gray-800/50 text-gray-200" : "bg-gray-100 text-gray-900"}`}
              type="number"
              value={sheetThickness}
              onChange={(event) => {
                setSheetThickness(event.target.valueAsNumber)
              }}
            />
            <span className={`text-sm grid col-span-2 ${isDarkMode ? "bg-black/30 text-gray-200" : "bg-gray-200 text-gray-900"}`}>
              mm
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}