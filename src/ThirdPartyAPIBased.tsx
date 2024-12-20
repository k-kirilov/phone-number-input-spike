import { useEffect, useState } from "react";
import { CountriesDropdown } from "./CountriesDropdown";
import { CountryCode } from "libphonenumber-js/core";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";

const URL = "https://ipapi.co/json/";

const PHONE_NUMBER_NAME = "phoneNumber";

export function ThirdPartyAPIBased() {
  const { control, watch, setError, clearErrors, formState } = useForm();

  const [selectedCountryCode, setSelectedCountryCode] =
    useState<CountryCode>("AC");

  useEffect(() => {
    fetch(URL)
      .then(async (resp) => await resp.json())
      .then((data) => setSelectedCountryCode(data.country));
  }, []);

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
      <p style={{ marginTop: 0 }}>Third Party API based (uses CDN for flags)</p>
      <CountriesDropdown
        value={selectedCountryCode}
        onSelect={setSelectedCountryCode}
        imageBase="cdn"
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
