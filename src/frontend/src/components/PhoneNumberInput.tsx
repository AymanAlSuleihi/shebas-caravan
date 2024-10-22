import React from "react"
import { useCountries } from "use-react-countries"
import {
 Input,
 Menu,
 MenuHandler,
 MenuList,
 MenuItem,
 Button,
} from "@material-tailwind/react"

interface Country {
  name: string
  flags: {
    svg: string
  }
  countryCallingCode: string
}

const InputWithDropdown: React.FC = () => {
  const { countries } = useCountries()
  const [country, setCountry] = React.useState<number>(0)

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
          >
            <img
              src={countries[country].flags.svg}
              alt={countries[country].name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countries[country].countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem]">
          {countries.map((countryData: Country, index: number) => {
            return (
              <MenuItem
                key={countryData.name}
                value={countryData.name}
                className="flex items-center gap-2"
                onClick={() => setCountry(index)}
              >
                <img
                  src={countryData.flags.svg}
                  alt={countryData.name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {countryData.name} <span className="ml-auto">{countryData.countryCallingCode}</span>
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder="Mobile Number"
        className="!border !border-gray-300 bg-white text-gray-900 rounded rounded-l-none shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{ className: "min-w-[80px]" }}
        />
    </div>
  )
}

export default InputWithDropdown