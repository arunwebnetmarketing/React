import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../styles/auth.scss";

import {
  addToast,
  removeToast,
} from "../../../components/Toast/action";

import loginADImage from "../../../assets/images/ad-img.png";

import { setServerErrors } from "../../../utils/form";

import { LoginProps } from "../../../types/login.type";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input/Input";
import Logo from "../../../components/Logo/Logo";

import { useLogin } from "../../../query/login/mutation";
import { validateToken } from "../../../query/login/query";

import Loader from "../../../components/Loader/Loader";

import {
  useGetQueryString,
  getDomainName,
} from "../../../utils/helper";
import { RANDOM_NUMBER } from "../../../utils/constant";

const Login = (): JSX.Element => {
  const { t } = useTranslation(["common", "auth"]);
  const history = useHistory();
  const dispatch = useDispatch();

  const queryEmail = useGetQueryString("login");
  useEffect(() => {
    if (queryEmail) {
      setValue("login", queryEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryEmail]);

  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
  } = useForm<LoginProps>();
  const currentDomainName = getDomainName();

  const [mutateLogin] = useLogin();

  const { i18n } = useTranslation("common");

  const onSubmit = async (data: LoginProps) => {
    const reqData = { ...data, origin: currentDomainName };

    try {
      const loginResponse = await mutateLogin(reqData);

      const userLanguage = loginResponse?.data?.language;
      const accessToken = loginResponse?.data?.data?.access_token;
      const userDetails = loginResponse?.data?.data?.user_details;
      const salt = loginResponse?.data?.data?.salt;

      //Success Redirection Start
      if (loginResponse?.data?.status === "multi_account") {
        //User accessing from main account - User has multi accounts
        history.replace({
          pathname: "/accounts",
          state: {
            login: data.login,
            password: data.password,
            tenants: loginResponse?.data?.data,
          },
        });
      } else if (loginResponse?.data?.status === "single_account") {
        //User accessing from main account - User has single account
        const domain =
          loginResponse?.data?.data?.user_details?.domain;
        window.location.replace(
          `${domain}?user=${accessToken}&token=${salt}`,
        );
      } else if (loginResponse?.data?.status === "success") {
        //User accessing from self tenant account(sub domain)
        localStorage.setItem("_token", accessToken);
        localStorage.setItem("user", JSON.stringify(userDetails));
        localStorage.setItem("userLang", userLanguage);
        i18n.language !== userLanguage &&
          i18n.changeLanguage(userLanguage);
        dispatch({
          type: "LOGIN",
          payload: userDetails,
        });
        history.replace("/");
      }
      //Success Redirection End
    } catch (err) {
      const { status, data } = err.response;
      //Validation Error Start
      if (status === 400) {
        const serverValidationErrors = data.data;
        setServerErrors(serverValidationErrors, setError);
      }
      //Validation Error End

      //Notification Error Start
      // eslint-disable-next-line no-constant-condition
      if (status === 401 || status === 403) {
        const notificationError = data.data.status;
        const toastID = RANDOM_NUMBER;
        dispatch(
          addToast({
            id: toastID,
            variant: "notice",
            msg: notificationError,
          }),
        );
        setTimeout(() => {
          dispatch(removeToast(toastID));
        }, 2500);
      }
      //Notification Error End
    }
  };

  const userAccessToken = useGetQueryString("user");
  const userSalt = useGetQueryString("token");

  useEffect(() => {
    if (userAccessToken) {
      const currentDomainName = getDomainName();
      validateToken(userAccessToken, currentDomainName)
        .then(
          (res: {
            data: {
              language: string;
              data: {
                user_details: {
                  email: string;
                  id: string;
                  image: string;
                  name: string;
                };
              };
            };
          }) => {
            const userLanguage = res?.data?.language;
            const userDetails = res?.data?.data?.user_details;

            localStorage.setItem("_token", userAccessToken);
            localStorage.setItem("user", JSON.stringify(userDetails));
            localStorage.setItem("userLang", userLanguage);
            i18n.language !== userLanguage &&
              i18n.changeLanguage(userLanguage);
            dispatch({
              type: "LOGIN",
              payload: userDetails,
            });
            window.location.replace("/");
          },
        )
        .catch(() => {
          window.location.replace(currentDomainName);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid light-blue">
      <div className="row ">
        <div className="col-lg-6 col-md-12 ">
          <div className="text-left">
            <Logo className="pt-3" />
          </div>
          <div className="align-middle text-center sideimg">
            <img src={loginADImage} alt="ad_img" className="w-75" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 sideimg-50  ">
          {userAccessToken && userSalt && (
            <Loader variant="variant1" />
          )}
          {!(userAccessToken && userSalt) && (
            <>
              <div className="text-center pt-4 pb-4">
                <h4
                  className="font-21"
                  data-automationid="welcomeText"
                >
                  {t("auth:login.welcomeText")}
                </h4>
              </div>
              <form
                className="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row justify-content-center login mt-2">
                  <div className="col-lg-8">
                    <Input
                      icon="fa-envelope"
                      placeholder={t("common:fields.emailAddress")}
                      name="login"
                      type="text"
                      id="login"
                      register={register({
                        required: t(
                          "auth:login.validations.emailRequired",
                        ) as string,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: t(
                            "auth:login.validations.emailValid",
                          ) as string,
                        },
                      })}
                      errors={errors}
                      automationid="emailAddress"
                      errorId="login-login-error"
                    />
                    <Input
                      icon="fa-lock"
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      register={register({
                        required: t(
                          "auth:login.validations.passwordRequired",
                        ) as string,
                        pattern: {
                          value: /.*[^ ].*/,
                          message: t(
                            "common:validations.blankSpaceNotAllowed",
                          ) as string,
                        },
                      })}
                      errors={errors}
                      automationid="password"
                      errorId="login-password-error"
                    />
                    <div className="row">
                      <div className="col-lg-6"></div>
                      <div className="col-lg-6 text-right">
                        <Link
                          to="/forgot-password"
                          data-automationid="forgotPassword"
                        >
                          {t("auth:forgotPassword")}?
                        </Link>
                      </div>
                    </div>
                    <div className="text-left ">
                      <Button
                        onClick={function noRefCheck() {}}
                        rounded
                        size="sm"
                        type="submit"
                        upperCase
                        variant="blue"
                        automationid="loginBtn"
                      >
                        {t("auth:login.loginBtn")}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
