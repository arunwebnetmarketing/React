import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Form/Input/Input";
import Select from "../../../../../components/Form/Select/Select";

type LocationFieldsContainerProps = {
  countryStateCityData: any;
  apiResStatus: string;
  register: any;
  locationData: any;
  index: number;
  handleLocationInputChange: any;
  removeLocation: (id: number, index: number) => void;
  errors: any;
  trigger: (name: string) => Promise<boolean>;
  watch: any;
};

type CountryStateProps = { name: string; value: string | number }[];

const LocationFieldsContainer = ({
  countryStateCityData,
  apiResStatus,
  register,
  locationData,
  index,
  handleLocationInputChange,
  removeLocation,
  errors,
  trigger,
  watch,
}: LocationFieldsContainerProps): JSX.Element => {
  const { t } = useTranslation(["validationMsg", "user"]);

  const [countries, setCountries] = useState<CountryStateProps>([
    {
      name: t("user:locations.loadingCountries"),
      value: "",
    },
  ]);
  const [
    countryStates,
    setCountryStates,
  ] = useState<CountryStateProps>([
    {
      name: t("user:locations.selectCountry"),
      value: "",
    },
  ]);

  useEffect(() => {
    if (apiResStatus === "loading") {
      setCountries([
        {
          name: t("user:locations.loadingCountries"),
          value: "",
        },
      ]);
      setCountryStates([
        {
          name: t("user:locations.selectCountry"),
          value: "",
        },
      ]);
    } else if (
      apiResStatus === "success" &&
      countryStateCityData?.data &&
      countryStateCityData?.data.length > 0
    ) {
      const tempCountries = countryStateCityData.data.map(
        (country: { id: number; name: string }) => {
          return {
            name: country.name,
            value: country.id,
          };
        },
      );
      setCountries(tempCountries);
    } else {
      setCountries([
        {
          name: t("user:locations.noCountries"),
          value: "",
        },
      ]);
      setCountryStates([
        {
          name: t("user:locations.selectCountry"),
          value: "",
        },
      ]);
    }
  }, [apiResStatus]);

  const renderCountryStates = (countryID: string) => {
    let tempStates = [
      {
        name: t("user:locations.selectCountry"),
        value: "",
      },
    ];
    if (
      countryStateCityData?.data &&
      countryStateCityData?.data.length > 0
    ) {
      const selectedContryMetaData = countryStateCityData.data.filter(
        (countryState: { id: number }) => {
          return (
            countryState.id == ((countryID as unknown) as number)
          );
        },
      );
      if (
        selectedContryMetaData?.[0]?.states &&
        selectedContryMetaData?.[0]?.states.length > 0
      ) {
        tempStates = selectedContryMetaData[0].states.map(
          function (state: { name: string; id: number }) {
            return {
              name: state.name,
              value: state.id,
            };
          },
        );
      } else {
        tempStates = [
          {
            name: t("user:locations.noStates"),
            value: "",
          },
        ];
      }
    }
    setCountryStates(tempStates);
  };

  useEffect(() => {
    const countryID = locationData.country;
    renderCountryStates(countryID);
  }, [locationData.country]);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <Input
              className="col-md-12 mdndatory"
              label={t("user:locationname")}
              name={`addresses[${index}].name`}
              placeholder={t("user:locationname")}
              type="text"
              defaultValue={locationData.name}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /.*[^ ].*/,
                  message: t("validationMsg:blankSpace") as string,
                },
                maxLength: {
                  value: 50,
                  message: t("validationMsg:maxCharacter", {
                    count: 50,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "name",
                  e.target.value,
                );
                trigger(`addresses[${index}].name`);
              }}
              automationid="locationName"
              errorId="locationName-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.name?.message
              }
            />
            <Input
              className="col-md-12 mdndatory"
              label={t("user:locationemail")}
              name={`addresses[${index}].email`}
              placeholder={t("user:locationemail")}
              type="text"
              defaultValue={locationData.email}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t("validationMsg:validEmail") as string,
                },
                maxLength: {
                  value: 50,
                  message: t("validationMsg:maxCharacter", {
                    count: 50,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "email",
                  e.target.value,
                );
                trigger(`addresses[${index}].email`);
              }}
              automationid="locationEmail"
              errorId="locationEmail-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.email?.message
              }
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <Input
              className="col-md-12 mdndatory"
              label={t("user:locationcontactpersonname")}
              name={`addresses[${index}].contact_person`}
              placeholder={t("user:locationcontactpersonname")}
              type="text"
              defaultValue={locationData.contact_person}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /.*[^ ].*/,
                  message: t("validationMsg:blankSpace") as string,
                },
                maxLength: {
                  value: 50,
                  message: t("validationMsg:maxCharacter", {
                    count: 50,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "contact_person",
                  e.target.value,
                );
                trigger(`addresses[${index}].contact_person`);
              }}
              automationid="locationContactPerson"
              errorId="locationContactPerson-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.contact_person?.message
              }
            />
            <Input
              className="col-md-12 mdndatory"
              label={t("user:locationphonenumber")}
              name={`addresses[${index}].phone_number`}
              placeholder={t("user:locationphonenumber")}
              type="number"
              defaultValue={locationData.phone_number}
              register={register({
                required: t("validationMsg:requiredField") as string,
                min: {
                  value: 0,
                  message: t("validationMsg:min", {
                    count: 0,
                  }) as string,
                },
                maxLength: {
                  value: 10,
                  message: t("validationMsg:maxCharacter", {
                    count: 10,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "phone_number",
                  e.target.value,
                );
                trigger(`addresses[${index}].phone_number`);
              }}
              automationid="locationPhoneNumber"
              errorId="locationPhoneNumber-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.phone_number?.message
              }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-left">
          <label>{t("user:locationaddress")}</label>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6">
          <div className="row">
            <Input
              className="col-md-12 mdndatory"
              label={t("user:nobuildingflatname")}
              name={`addresses[${index}].line_1`}
              placeholder={t("user:nobuildingflatname")}
              type="text"
              defaultValue={locationData.line_1}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /.*[^ ].*/,
                  message: t("validationMsg:blankSpace") as string,
                },
                maxLength: {
                  value: 150,
                  message: t("validationMsg:maxCharacter", {
                    count: 150,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "line_1",
                  e.target.value,
                );
                trigger(`addresses[${index}].line_1`);
              }}
              automationid="noBuildingFlatName"
              errorId="noBuildingFlatName-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.line_1?.message
              }
            />
            <Select
              className="col-md-12 mdndatory"
              label={t("user:country")}
              name={`addresses[${index}].country`}
              options={countries}
              placeholder={t("user:choose")}
              defaultValue={locationData.country}
              register={register({
                required: t("validationMsg:requiredField") as string,
              })}
              onChange={(e: any) => {
                renderCountryStates(e.target.value);
                handleLocationInputChange(
                  index,
                  "country",
                  e.target.value,
                );
                trigger(`addresses[${index}].country`);
              }}
              automationid="country"
              errorId="country-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.country?.message
              }
            />
            <Select
              className="col-md-12 mdndatory"
              label={t("user:state")}
              name={`addresses[${index}].state`}
              options={countryStates}
              placeholder={t("user:choose")}
              defaultValue={locationData.state}
              register={register({
                required: t("validationMsg:requiredField") as string,
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "state",
                  e.target.value,
                );
                trigger(`addresses[${index}].state`);
              }}
              automationid="state"
              errorId="state-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.state?.message
              }
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <Input
              className="col-md-12 mdndatory"
              label={t("user:streetname")}
              name={`addresses[${index}].line_2`}
              placeholder={t("user:streetname")}
              type="text"
              defaultValue={locationData.line_2}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /.*[^ ].*/,
                  message: t("validationMsg:blankSpace") as string,
                },
                maxLength: {
                  value: 150,
                  message: t("validationMsg:maxCharacter", {
                    count: 150,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "line_2",
                  e.target.value,
                );
                trigger(`addresses[${index}].line_2`);
              }}
              automationid="streetName"
              errorId="streetName-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.line_2?.message
              }
            />
            <Input
              className="col-md-12 mdndatory"
              label={t("user:cityvillage")}
              name={`addresses[${index}].city`}
              placeholder={t("user:cityvillage")}
              type="text"
              defaultValue={locationData.city}
              register={register({
                required: t("validationMsg:requiredField") as string,
                pattern: {
                  value: /.*[^ ].*/,
                  message: t("validationMsg:blankSpace") as string,
                },
                maxLength: {
                  value: 150,
                  message: t("validationMsg:maxCharacter", {
                    count: 150,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "city",
                  e.target.value,
                );
                trigger(`addresses[${index}].city`);
              }}
              automationid="cityVillage"
              errorId="cityVillage-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.city?.message
              }
            />
            <Input
              className="col-md-12 mdndatory"
              label={t("user:zipcode")}
              name={`addresses[${index}].zipcode`}
              placeholder={t("user:zipcode")}
              type="number"
              defaultValue={locationData.zipcode}
              register={register({
                required: t("validationMsg:requiredField") as string,
                min: {
                  value: 0,
                  message: t("validationMsg:min", {
                    count: 0,
                  }) as string,
                },
                maxLength: {
                  value: 10,
                  message: t("validationMsg:maxCharacter", {
                    count: 10,
                  }) as string,
                },
              })}
              onChange={(e: any) => {
                handleLocationInputChange(
                  index,
                  "zipcode",
                  e.target.value,
                );
                trigger(`addresses[${index}].zipcode`);
              }}
              automationid="zipCode"
              errorId="zipCode-error"
              fieldErrorMsg={
                errors?.addresses?.[index]?.zipcode?.message
              }
            />
          </div>
        </div>
      </div>
      <div className="col-lg-12 text-right">
        <Button
          onClick={() => {
            removeLocation(locationData.address_id, index);
          }}
          size="sm"
          type="button"
          variant="transparent"
          automationid="trash"
        >
          <i className="fa fa-trash" />
        </Button>
      </div>
    </>
  );
};

export default LocationFieldsContainer;
