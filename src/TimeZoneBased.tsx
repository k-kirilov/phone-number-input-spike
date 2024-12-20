import { CountryCode } from "libphonenumber-js/core";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input/input";
import { CountriesDropdown } from "./CountriesDropdown";

const PHONE_NUMBER_NAME = "phoneNumber";

export function TimeZoneBased() {
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>(
    timezoneToCountryCode(Intl.DateTimeFormat().resolvedOptions().timeZone)
  );
  const { control, watch, setError, clearErrors, formState } = useForm();

  const phoneNumber = watch(PHONE_NUMBER_NAME);

  useEffect(() => {
    clearErrors();

    if (phoneNumber) {
      if (!isValidPhoneNumber(phoneNumber, selectedCountryCode)) {
        setError(PHONE_NUMBER_NAME, { message: "Invalid phone number format" });
      }
    }
  }, [phoneNumber]);

  return (
    <div>
      <p style={{ marginTop: 0 }}>TimeZone based (flags are shows as emojis)</p>
      <CountriesDropdown
        value={selectedCountryCode}
        onSelect={setSelectedCountryCode}
        imageBase="emoji"
      />
      <br />
      <br />
      <Controller
        name={PHONE_NUMBER_NAME}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <PhoneInput
              country={selectedCountryCode}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        }}
      />
      {formState.errors[PHONE_NUMBER_NAME] && (
        <p>{formState.errors[PHONE_NUMBER_NAME].message}</p>
      )}
    </div>
  );
}

function timezoneToCountryCode(timezone: string): CountryCode {
  const countryCodes = moment.tz.countries();

  for (const countryCode of countryCodes) {
    const countryTimeZones = moment.tz.zonesForCountry(countryCode);

    if (countryTimeZones.includes(timezone)) {
      return countryCode as CountryCode;
    }
  }
}
