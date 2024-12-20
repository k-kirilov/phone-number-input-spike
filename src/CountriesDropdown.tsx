import { CountryCode } from "libphonenumber-js/core";
import { useState } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
// en.json returns mapping between country code and country name
// library also has JSONs for other languages in react-phone-number-input/locale
import en from "react-phone-number-input/locale/en.json";
import "./dropdown.css";

interface CountriesDropdownProps {
  value: CountryCode;
  onSelect: (code: CountryCode) => void;
  imageBase: "emoji" | "cdn";
}

const URL = `https://flagcdn.com/w40/`;

export function CountriesDropdown(props: CountriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(props.value);

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {props.imageBase === "emoji" ? (
          <>
            {countryCodeToFlagEmoji(props.value)}{" "}
            {en[props.value] + " +" + getCountryCallingCode(props.value)}
          </>
        ) : (
          <>
            <img
              src={`${URL}${props.value.toLowerCase()}.png`}
              alt={props.value}
              className="flag-icon"
            />
            {en[props.value] + " +" + getCountryCallingCode(props.value)}
          </>
        )}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {getCountries().map((code) => {
            const callingCode = en[code] + " +" + getCountryCallingCode(code);
            return (
              <li
                key={code}
                onClick={() => {
                  props.onSelect(code);
                  setIsOpen(false);
                }}
                className="dropdown-item"
              >
                {props.imageBase === "emoji" ? (
                  <>
                    {countryCodeToFlagEmoji(code)} {callingCode}
                  </>
                ) : (
                  <>
                    <img
                      src={`${URL}${code.toLowerCase()}.png`}
                      alt={code}
                      className="flag-icon"
                    />
                    {callingCode}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function countryCodeToFlagEmoji(countryCode: CountryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
