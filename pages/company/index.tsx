import React from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import { useFetchCountryStateCity } from "../../../../query/countryStateCity/query";
import { useFetchCompanyDetail } from "../../../../query/user/companies/company/query";

import useCanAccess from "../../../../hooks/useCanAccess";
import { showModal } from "../../../../components/Modal/action";

import AccordionItem from "../../../../components/Accordion/AccordionItem";
import AccordionMenu from "../../../../components/Accordion/AccordionMenu";
import Button from "../../../../components/Button/Button";

const UserCompaniesComapny = (): JSX.Element => {
  const { t } = useTranslation(["user"]);
  const dispatch = useDispatch();

  const companyEdit = useCanAccess(
    "user_companies_tenant_company_edit",
  );

  const addressDelete = useCanAccess(
    "user_companies_tenant_company_address_delete",
  );

  const { data: companyDetailData } = useFetchCompanyDetail();
  console.log(companyDetailData, "companyDetailData");

  useFetchCountryStateCity();

  console.log("UserCompaniesComapny Component");
  console.log(
    companyDetailData?.data?.company_name.length,
    "companyDetailData?.data?.company_website",
  );
  console.log(typeof companyDetailData?.data?.company_website);
  return (
    <>
      <div className="container-fluid component ">
        <div className="row mt-4 pt-2">
          <div className="col-lg-10">
            <h3>{t("user:company.companydetails")}</h3>
          </div>
          <div className="col-lg-2">
            {companyEdit && (
              <Button
                onClick={() =>
                  dispatch(showModal("USER_COMPANIES_COMPANY_EDIT"))
                }
                size="sm"
                type="button"
                variant="blue"
                automationid="companyEdit"
              >
                {t("user:button.edit")}
              </Button>
            )}
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6 ">
            <h4>
              <span className="ws-100">
                {t("user:company.basicdetails")}
              </span>
              <span className="icon-color pl-2">
                {companyEdit && (
                  <Button
                    onClick={() =>
                      dispatch(
                        showModal(
                          "USER_COMPANIES_COMPANY_EDIT",
                          "basic",
                        ),
                      )
                    }
                    size="sm"
                    type="button"
                    variant="transparent"
                    automationid="basicDetailsEdit"
                  >
                    <i className="fa fa-pencil-square-o" />
                  </Button>
                )}
              </span>
            </h4>
            <div className="row">
              <div className="col-lg-2 col-6">
                {(companyDetailData?.data?.image && (
                  <div className="profile-logo">
                    <img
                      src={companyDetailData?.data?.image}
                      className="img-fluid"
                    />
                  </div>
                )) || <Skeleton height={100} />}
              </div>
              <div className="col-lg-10">
                <div className="name">{t("user:company.name")} </div>
                <div className="company">
                  {typeof companyDetailData?.data?.company_name !==
                  "undefined" ? (
                    companyDetailData?.data?.company_name.length >
                    0 ? (
                      companyDetailData?.data?.company_name
                    ) : (
                      "NA"
                    )
                  ) : (
                    <Skeleton height={20} />
                  )}
                </div>
                <div className="name mt-3 ">
                  {t("user:company.website")}
                </div>
                <div className="company">
                  {typeof companyDetailData?.data?.company_website !==
                  "undefined" ? (
                    companyDetailData?.data?.company_website.length >
                    0 ? (
                      companyDetailData?.data?.company_website
                    ) : (
                      "NA"
                    )
                  ) : (
                    <Skeleton height={20} />
                  )}
                </div>

                <div className="notes mt-3">
                  <h5>{t("user:company.note")}</h5>
                  <p>
                    {typeof companyDetailData?.data?.notes !==
                    "undefined" ? (
                      companyDetailData?.data?.notes.length > 0 ? (
                        companyDetailData?.data?.notes
                      ) : (
                        "NA"
                      )
                    ) : (
                      <Skeleton height={50} />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h4 className="">
            <span className="ws-100">
              {t("user:company.location")}
            </span>
            <span className="icon-color pl-2">
              {companyEdit && (
                <Button
                  onClick={() =>
                    dispatch(
                      showModal(
                        "USER_COMPANIES_COMPANY_EDIT",
                        "location",
                      ),
                    )
                  }
                  size="sm"
                  type="button"
                  variant="transparent"
                  automationid="locationEdit"
                >
                  <i className="fa fa-pencil-square-o" />
                </Button>
              )}
            </span>
          </h4>
        </div>
        <div className="row">
          <AccordionMenu>
            <AccordionItem id="tab-1" title="Delhi Branch">
              <div className="row">
                <div className="col-lg-8">
                  <h5> Contact Person : Sriram </h5>
                  <p>
                    Akahya Nagar 1st Block 1st Cross, Rammurthy Nager,
                    Chennai - 600 088
                  </p>
                  <p className="phone-icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                    044 2345 6791
                  </p>
                  <p className="email-icon">
                    <i
                      className="fa fa-envelope"
                      aria-hidden="true"
                    ></i>
                    abcadmin@abc.com
                  </p>
                </div>
                <div className="col-lg-4 text-right">
                  {addressDelete && (
                    <Button
                      onClick={function noRefCheck() {}}
                      size="sm"
                      type="button"
                      variant="transparent"
                      automationid="trash"
                    >
                      <i className="fa fa fa-trash-o" />
                    </Button>
                  )}
                </div>
              </div>
            </AccordionItem>
            <AccordionItem id="tab-2" title="Delhi Branch">
              <div className="row">
                <div className="col-lg-8">
                  <h5> Contact Person : Sriram </h5>
                  <p>
                    Akahya Nagar 1st Block 1st Cross, Rammurthy Nager,
                    Chennai - 600 088
                  </p>
                  <p className="phone-icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                    044 2345 6791
                  </p>
                  <p className="email-icon">
                    <i
                      className="fa fa-envelope"
                      aria-hidden="true"
                    ></i>
                    abcadmin@abc.com
                  </p>
                </div>
                <div className="col-lg-4 text-right">
                  {addressDelete && (
                    <Button
                      onClick={function noRefCheck() {}}
                      size="sm"
                      type="button"
                      variant="transparent"
                      automationid="trash"
                    >
                      <i className="fa fa fa-trash-o" />
                    </Button>
                  )}
                </div>
              </div>
            </AccordionItem>
          </AccordionMenu>
        </div>
      </div>
      <div className="pt-5"></div>
    </>
  );
};

export default UserCompaniesComapny;
