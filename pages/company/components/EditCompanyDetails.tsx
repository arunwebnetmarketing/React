import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { useFetchCountryStateCity } from "../../../../../query/countryStateCity/query";
import { useFetchCompanyDetail } from "../../../../../query/user/companies/company/query";

import { showModal } from "../../../../../components/Modal/action";

import Button from "../../../../../components/Button/Button";
import Input from "../../../../../components/Form/Input/Input";
import Select from "../../../../../components/Form/Select/Select";
import ImageUpload from "../../../../../components/ImageUpload/ImageUpload";
import WYSIWYGEditor from "../../../../../components/WYSIWYGEditor/WYSIWYGEditor";
import AccordionMenu from "../../../../../components/Accordion/AccordionMenu";
import AccordionItem from "../../../../../components/Accordion/AccordionItem";
import ModalCenter from "../../../../../components/Modal/ModalCenter";
import LocationFieldsContainer from "./LocationFieldsContainer";
import { useUpdateCompany } from "../../../../../query/user/companies/company/mutation";

type LocationsProps = {
  name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  address_id: string | number;
  is_new_address: true | false;
};

const EditCompanyDetails = ({ data }: { data: any }): JSX.Element => {
  const { t } = useTranslation(["common", "validationMsg", "user"]);
  const dispatch = useDispatch();

  const [imageData, setImageData] = useState<File | null>(null);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(),
  );
  const [tabActive, setTabActive] = useState(data || "basic");
  const [locationCount, setLocationCount] = useState(0);

  const locations = useRef<LocationsProps[]>([]);

  const {
    data: countryStateCityData,
    status,
  } = useFetchCountryStateCity();
  const { data: companyDetailData } = useFetchCompanyDetail();

  useEffect(() => {
    if (
      companyDetailData?.data?.company_address &&
      companyDetailData.data.company_address.length > 0
    ) {
      locations.current = companyDetailData.data.company_address.map(
        (addrees: {
          branch_name: string;
          contact_person_name: string;
          branch_email: string;
          branch_mobile_number: string;
          line_1: string;
          line_2: string;
          city: string;
          state_id: string;
          zip_code: string;
          country_id: string;
          id_address: string;
        }) => {
          return {
            name: addrees.branch_name,
            contact_person: addrees.contact_person_name,
            email: addrees.branch_email,
            phone_number: addrees.branch_mobile_number,
            line_1: addrees.line_1,
            line_2: addrees.line_2,
            city: addrees.city,
            state: addrees.state_id,
            zipcode: addrees.zip_code,
            country: addrees.country_id,
            address_id: addrees.id_address,
            is_new_address: false,
          };
        },
      );
      setLocationCount(companyDetailData.data.company_address.length);
    }
  }, [companyDetailData]);

  const tabBasicActiveClass =
    tabActive === "basic"
      ? "fieldy-tab-active"
      : "fieldy-tab-inactive";
  const tabLocationActiveClass =
    tabActive === "location"
      ? "fieldy-tab-active"
      : "fieldy-tab-inactive";
  const tabNotesActiveClass =
    tabActive === "notes"
      ? "fieldy-tab-active"
      : "fieldy-tab-inactive";

  const {
    register,
    trigger,
    errors,
    watch,
    control,
    handleSubmit,
  } = useForm();
  const { remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const handleNextTab = async () => {
    let tab = tabActive;
    switch (tabActive) {
      case "basic":
        const basicTabValidationFields = [
          "company_name",
          "company_website",
          "account_owner",
        ];
        const basicTabValidation = await trigger(
          basicTabValidationFields,
        );
        if (basicTabValidation) {
          tab = "location";
        }
        break;
      case "location":
        const locationTabFields = [
          "name",
          "email",
          "contact_person",
          "phone_number",
          "line_1",
          "line_2",
          "country",
          "state",
          "city",
          "zipcode",
        ];
        let locationTabValidationFields: any = [];
        new Array(locationCount)
          .fill(undefined)
          .forEach((count, index) => {
            locationTabFields.forEach((field) => {
              locationTabValidationFields = [
                ...locationTabValidationFields,
                `addresses[${index}].${field}`,
              ];
            });
          });
        const locationTabValidation = await trigger(
          locationTabValidationFields,
        );
        if (locationTabValidation) {
          tab = "notes";
        }
        break;
      default:
        tab = "location";
    }
    setTabActive(tab);
  };

  const handlePrevioustTab = () => {
    let tab = tabActive;
    switch (tabActive) {
      case "location":
        tab = "basic";
        break;
      case "notes":
        tab = "location";
        break;
      default:
        tab = "basic";
    }
    setTabActive(tab);
  };

  const appendLocation = () => {
    locations.current = [
      ...locations.current,
      {
        name: "",
        contact_person: "",
        email: "",
        phone_number: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        address_id: Date.now(),
        is_new_address: true,
      },
    ];
    setLocationCount((prevState) => prevState + 1);
  };

  const removeLocation = (id: number, index: number) => {
    locations.current = locations.current.filter(function (location) {
      return (location.address_id as number) !== id;
    });
    remove(index);

    setLocationCount((prevState) => prevState - 1);
  };

  const handleLocationInputChange = (
    index: number,
    field: string,
    fieldValue: string,
  ) => {
    locations.current = locations.current.map((location, i) => {
      if (i === index) {
        return { ...location, [field]: fieldValue };
      } else {
        return { ...location };
      }
    });
  };

  const handleEditorChange = (editorState: EditorState): void => {
    setEditorState(editorState);
    console.log(
      "notes",
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  };

  const [mutate] = useUpdateCompany();

  const onSubmit = async (data: any) => {
    console.log("data", data);

    console.log("locations.current", locations.current);

    let formattedData = {
      _method: "put",
      company_name: data.company_name,
      account_owner: data.account_owner,
      company_website: data.company_website,
      notes: draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      ),
      industry: data.industry,
      company_size: data.company_size,
      addresses: JSON.stringify(locations.current),
    };

    if (imageData) {
      formattedData = { ...formattedData, ...{ image: imageData } };
    }

    console.log("formattedData", formattedData);

    const formData = new FormData();
    for (const [key, value] of Object.entries(formattedData)) {
      formData.append(key, value);
    }

    try {
      const companyUpdateResponse = await mutate(formData);
      console.log(
        "company update response - success",
        companyUpdateResponse,
      );
    } catch (err) {
      console.log("company update response - error", err);
      console.log("company update response - error", err.response);
      return err;
    }
  };

  return (
    <ModalCenter>
      <div className="edit-company-detail-modal">
        <div className="modal-header p-3  ">
          <h5 className="mb-0">
            {t("common:edit")} {companyDetailData?.data?.company_name}
          </h5>
        </div>
        <div className="modal-body fieldy-tab">
          <ul className="navbar-frist fieldy-tab-navbar mb-2">
            <li className={tabBasicActiveClass}>{t("user:basic")}</li>
            <li className={tabLocationActiveClass}>
              {t("user:location")}
            </li>
            <li className={tabNotesActiveClass}>{t("user:note")}</li>
          </ul>
          <form>
            <div
              className={`scroll-400 basic-tab ${tabBasicActiveClass}`}
            >
              <div className="row">
                <div className="col-lg-5">
                  <Input
                    className="col-md-12 mdndatory"
                    label={t("user:companyname")}
                    name="company_name"
                    placeholder={t("user:companyname")}
                    type="text"
                    onChange={() => trigger(["company_name"])}
                    defaultValue={
                      companyDetailData?.data?.company_name
                    }
                    register={register({
                      required: t(
                        "validationMsg:requiredField",
                      ) as string,
                      pattern: {
                        value: /.*[^ ].*/,
                        message: t(
                          "validationMsg:blankSpace",
                        ) as string,
                      },
                      maxLength: {
                        value: 50,
                        message: t("validationMsg:maxCharacter", {
                          count: 50,
                        }) as string,
                      },
                    })}
                    automationid="compay-name"
                    errorId="company-name-error"
                    errors={errors}
                  />
                  <Input
                    className="col-md-12"
                    label={t("user:comapnywebsiteurl")}
                    name="company_website"
                    placeholder={t("user:comapnywebsiteurl")}
                    type="text"
                    onChange={() => trigger(["company_website"])}
                    defaultValue={
                      companyDetailData?.data?.company_website
                    }
                    register={register({
                      pattern: {
                        value: /.*[^ ].*/,
                        message: t(
                          "validationMsg:blankSpace",
                        ) as string,
                      },
                      maxLength: {
                        value: 100,
                        message: t("validationMsg:maxCharacter", {
                          count: 100,
                        }) as string,
                      },
                    })}
                    automationid="company-website"
                    errorId="company-website-error"
                    errors={errors}
                  />
                  <Select
                    className="col-md-12"
                    label={t("user:industry")}
                    name="industry"
                    options={[
                      {
                        name: "Industry1",
                        value: "Industry1",
                      },
                      {
                        name: "Industry2",
                        value: "Industry2",
                      },
                      {
                        name: "Industry3",
                        value: "Industry3",
                      },
                    ]}
                    placeholder={t("user:choose")}
                    defaultValue={companyDetailData?.data?.industry}
                    automationid="industry"
                    register={register}
                  />
                  <Select
                    className="col-md-12"
                    label={t("user:companysize")}
                    name="company_size"
                    options={[
                      {
                        name: "1 To 50",
                        value: "1 To 50",
                      },
                      {
                        name: "51 To 100",
                        value: "51 To 100",
                      },
                      {
                        name: "101 To 500",
                        value: "101 To 500",
                      },
                      {
                        name: "Above 500",
                        value: "Above 500",
                      },
                    ]}
                    placeholder={t("user:choose")}
                    defaultValue={
                      companyDetailData?.data?.company_size
                    }
                    automationid="company-size"
                    register={register}
                  />
                  <Input
                    className="col-md-12"
                    label={t("user:accountowner")}
                    name="account_owner"
                    placeholder={t("user:accountowner")}
                    type="text"
                    onChange={() => trigger(["account_owner"])}
                    register={register({
                      pattern: {
                        value: /.*[^ ].*/,
                        message: t("user:blankSpace") as string,
                      },
                      maxLength: {
                        value: 50,
                        message: t("validationMsg:maxCharacter", {
                          count: 50,
                        }) as string,
                      },
                    })}
                    defaultValue={
                      companyDetailData?.data?.account_owner
                    }
                    automationid="company-accountowner"
                    errorId="company-accountowner-error"
                    errors={errors}
                  />
                </div>
                <div className="col-lg-7">
                  <div className="w-75 text-center  ml-auto">
                    <div id="upload-box" className="light">
                      <ImageUpload
                        setImageData={setImageData}
                        imgUrl={companyDetailData?.data?.image}
                      />
                    </div>
                    <p className="text-left w-75">
                      {t("user:uploadtext")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`scroll-400 location-tab ${tabLocationActiveClass}`}
            >
              <>
                <AccordionMenu
                  className="col-lg-12"
                  type="plus-minus"
                >
                  {new Array(locationCount)
                    .fill(undefined)
                    .map((count, index) => (
                      <AccordionItem
                        id={locations.current[index].address_id}
                        className={
                          errors?.addresses?.[index]
                            ? "has-error"
                            : ""
                        }
                        title={
                          watch(`addresses[${index}].name`) ||
                          locations.current[index].name ||
                          `Location ${index + 1}`
                        }
                        automationid={`Location ${index + 1}`}
                        key={index}
                      >
                        <LocationFieldsContainer
                          register={register}
                          countryStateCityData={countryStateCityData}
                          apiResStatus={status}
                          index={index}
                          locationData={locations.current[index]}
                          handleLocationInputChange={
                            handleLocationInputChange
                          }
                          removeLocation={removeLocation}
                          errors={errors}
                          trigger={trigger}
                          watch={watch}
                        />
                      </AccordionItem>
                    ))}
                </AccordionMenu>
              </>
              <div className="text-center mt-4 mb-4">
                <Button
                  onClick={appendLocation}
                  size="sm"
                  type="button"
                  variant="blue"
                  automationid="anotherLocation"
                >
                  {t("user:anotherlocation")}
                </Button>
              </div>
            </div>

            <div
              className={`scroll-400 search-section note-tab ${tabNotesActiveClass}`}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="col-md-12">
                    <WYSIWYGEditor
                      value={editorState}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer p-2">
          <div className="row">
            <div className="col-lg-6 col-6">
              {tabActive !== "basic" && (
                <Button
                  onClick={handlePrevioustTab}
                  size="sm"
                  type="button"
                  variant="blue"
                  automationid="previous"
                >
                  {t("user:button.previous")}
                </Button>
              )}
              {tabActive !== "notes" && (
                <Button
                  onClick={handleNextTab}
                  size="sm"
                  type="button"
                  variant="blue"
                  automationid="next"
                >
                  {t("user:button.next")}
                </Button>
              )}
            </div>
            <div className="col-lg-6 col-6 text-right">
              <Button
                onClick={handleSubmit(onSubmit)}
                size="sm"
                type="button"
                variant="lime-green"
                automationid="saveAndComplete"
              >
                {t("user:button.saveandcomplete")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalCenter>
  );
};

export default EditCompanyDetails;
