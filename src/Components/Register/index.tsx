/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-plusplus */
import React, { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import Cookie from "js-cookie";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "@Server/i18n";
import { useRouter } from "next/router";
import moment from "moment";
import _ from "lodash";

import { Loader, STLInput, STLButton, DateComponent, Breadcrumb, CustomCheckbox } from "@Components/Common";
import { LOCAL_HOST_KEY, ConstantsFreeze, PASSWORD_STRENGTH, LENGTH_VALIDATION } from "@Utils/enums";
import RoutPath from "@Utils/routes";
import { CheckOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import HomeActions from "@Redux/Actions/HomeActions";
import { registerSchema } from "@Utils/validationSchema";
import {
    getCookie,
    getTodayDateAndTime,
    NotificationWithIcon,
    PasswordValidationConfig,
    splitStringBySpace,
} from "@Utils/helper";
import BreadcrumbAction from "@Redux/Actions/BreadcrumbActions";
import CheckoutService from "@Services/API/Checkout";
import AuthService from "@Services/API/Auth";
import ConfigService from "@Services/API/Config";
import loaderStyle from "@Components/Common/Loader.module.scss";
import CartService from "@Services/API/Cart";
import AnonymousUserCartActions from "@Redux/Actions/AnonymousUserCartActions";
import CartActions from "@Redux/Actions/CartActions";
import PlanActions from "@Redux/Actions/PlanActions";
import DashboardActions from "@Redux/Actions/DashboardActions";
import ProfileService from "@Services/API/Profile";
import Timer from "./timer";
import style from "./Registration.module.scss";

// function to check if password has any sequence
export const checkSequnceInPassword = (password: any, metaString: any, maxLimit: any) => {
    if (password && metaString) {
        const { length: metaStringLength } = metaString;
        let start = 0;
        let end = Number(maxLimit);
        while (end <= metaStringLength) {
            const subStr = metaString.substring(start, end);
            const isContain = password.includes(subStr);
            if (isContain) {
                return true;
            }
            start++;
            end++;
        }
        return false;
    }

    return false;
};

// comparing current pass with new password function
export const checkCurrentWithNew = (newPin: any, currentPin: any) => {
    if (currentPin) {
        if (newPin === currentPin) {
            return true;
        }
        return false;
    }
    return false;
};

// function to check password characters
export const checkPasswordChar = (password: string) => {
    let data = [];
    data.push(
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
    );
    data = _.filter(data, item => item);
    return _.size(data) < 3;
};

// function to check if password contains Unicode or not
export const checkContainUnicode = (password: string, isCheck: any) => {
    // eslint-disable-next-line no-control-regex
    const specialCharCheck = /[^\u0000-\u00ff]/;
    const result = isCheck === "1" ? specialCharCheck.test(password) : true;
    return result;
};

interface Props extends WithTranslation {
    pageTitle: any;
}

const Registration: FC<Props> = ({ i18n, t, pageTitle }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isTouched, setTouched] = useState({ userName: false, password: false });
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [otpTime, setOtpTime] = useState<any>(null);
    const [passwordStatus, setPasswordStatus] = useState<any>({ status: null, value: null });
    const [otpLoader, setOtpLoader] = useState<any>(false);
    const [otpResendTime, setOtpResendTime] = useState<any>(null);
    const [otpBlockAfterMaxAttempt, setOtpBlockAfterMaxAttempt] = useState<any>(null);
    const [resendOtpLabel, setResendOtpLabel] = useState<any>({ visible: false, disable: false });
    const [loader, setLoader] = useState<boolean>(false);
    const [mobileActiveError, setMobileActiveError] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const [otpError, setOtpError] = useState<any>(null);
    const [minAge, setMinAge] = useState<any>(null);
    const [dobError, setDobError] = useState<string>("");
    const [userNameError, setUserNameError] = useState<any>(null);
    const [shouldShowConsent, setShouldShowConsent] = useState<boolean>(false);
    const [consentText, setConsentText] = useState<string>("");
    const [passwordPolicyConfig, setPasswordPolicyConfig] = useState<any>();
    const [configuration, setConfiguration] = useState<any>();
    const [genderList, setGenderList] = useState<any>(null);
    const [emailError, setEmailError] = React.useState<any>(null);
    const [alternateContactError, setAlternateContactError] = useState<any>(null);
    const [otpUUID, setOTPUUID] = useState<any>("");

    const cartState = useSelector((state: any) => state.cart);
    const anonymousCartState = useSelector((state: any) => state.anonymousUser);
    const commonState = useSelector((state: any) => state.common);
    const { planID } = commonState;
    const homeState = useSelector((state: any) => state.home);

    const { shoppingCartId } = cartState;
    const { shoppingCartId: anonymousshoppingCartId } = anonymousCartState;
    const { config } = homeState;

    const { AUTH_TOKEN, REFRESH_TOKEN } = LOCAL_HOST_KEY;
    const { Checkout, RootRoute } = RoutPath;
    // function to define where to redirect
    const redirectTo =
        // eslint-disable-next-line no-nested-ternary
        router?.query?.from === "cart"
            ? Checkout
            : router?.query?.from === "addon"
            ? `/plan/${planID.planID}`
            : RootRoute;
     
    // dummy breadcrumb data set
    const breadCrumbData = [
        {
            title: t("breadCrumb:Home"),
            active: false,
            href: "/",
        },
        {
            title: t("breadCrumb:Cart Summary"),
            active: false,
            href: "/cart",
        },
        {
            title: t("breadCrumb:User Registration"),
            active: true,
            href: "/register",
        },
    ];

    // configuration function to get configuration from API
    const getConfiguration = () => {
        ConfigService.getConfiguration("")
            .then(async (res: any) => {
                if (res?.result?.length) {
                    const otpTimeFromResponse = _.find(
                        res?.result,
                        item => item.configurableKey === "user.otp.resendTime"
                    );
                    const otpBlockAfterMaxAttemptResponse = _.find(
                        res?.result,
                        item => item.configurableKey === "user.otp.blockAfterMaxAttempt"
                    );
                    const minAgeFromResponse = _.find(
                        res?.result,
                        item => item.configurableKey === ConstantsFreeze.MIN_AGE_LIMIT
                    );
                    const userPasswordLengthResponse = _.find(
                        res?.result,
                        item => item.configurableKey === ConstantsFreeze.USER_PASSWORD_LENGTH
                    );
                    const userEmailLengthResponse = _.find(
                        res?.result,
                        item => item.configurableKey === ConstantsFreeze.USER_EMAIL_LENGTH
                    );
                    const userMobileLengthResponse = _.find(
                        res?.result,
                        item => item.configurableKey === ConstantsFreeze.USER_MOBILE_LENGTH
                    );
                    const cartEmptyResponse = _.find(
                        res?.result,
                        item => item.configurableKey === ConstantsFreeze.CART_EMPTY_BUTTON_TEXT
                    );
                    const MSISDNRegex = _.find(res?.result, item => item.configurableKey === "msisdn.regExp");

                    const gender = _.find(res?.result, item => item.configurableKey === "customer.gender")
                        ?.configurableValue;
                    const activeGenderList = _.filter(gender, i => i.isActive);
                    const list = activeGenderList.map((item: any) => {
                        return { label: item?.name, value: item?.value };
                    });
                    setGenderList(list);

                    let minAge = "";
                    let otpResendTime: any = "";
                    let otpBlockAfterMaxAttempt: any = "";
                    let userPasswordLength = "";
                    let userEmailLength = "";
                    let userMobileLength = "";
                    let emptyCart = "";
                    let MsisdnRegex = "";
                    if (minAgeFromResponse) {
                        minAge = minAgeFromResponse.configurableValue;
                    }
                    if (otpTimeFromResponse) {
                        otpResendTime = otpTimeFromResponse;
                    }
                    if (otpBlockAfterMaxAttemptResponse) {
                        otpBlockAfterMaxAttempt = otpBlockAfterMaxAttemptResponse;
                    }
                    if (userPasswordLengthResponse) {
                        userPasswordLength = userPasswordLengthResponse.configurableValue;
                    }
                    if (userEmailLengthResponse) {
                        userEmailLength = userEmailLengthResponse.configurableValue;
                    }
                    if (userMobileLengthResponse) {
                        userMobileLength = userMobileLengthResponse.configurableValue;
                    }
                    if (cartEmptyResponse) {
                        emptyCart = cartEmptyResponse.configurableValue;
                    }
                    if (MSISDNRegex) {
                        MsisdnRegex = MSISDNRegex.configurableValue;
                    }
                    const configData = {
                        minAge,
                        otpResendTime,
                        otpBlockAfterMaxAttempt,
                        userPasswordLength,
                        userEmailLength,
                        userMobileLength,
                        emptyCart,
                        MsisdnRegex,
                    };

                    if (minAge) {
                        setMinAge(minAge);
                    }

                    if (otpResendTime) {
                        const resendTime = splitStringBySpace(otpResendTime?.configurableValue);
                        setOtpResendTime(resendTime[0]);
                    }

                    if (otpBlockAfterMaxAttempt) {
                        const maxAttempt = splitStringBySpace(otpBlockAfterMaxAttempt?.configurableValue);
                        setOtpBlockAfterMaxAttempt(maxAttempt[0]);
                    }

                    setLoader(true);
                    try {
                        const validationConfig: any = await PasswordValidationConfig(i18n.language);
                        setLoader(false);
                        setConfiguration(validationConfig);

                        if (validationConfig && validationConfig?.displayConsent === "1") {
                            setShouldShowConsent(true);
                        }
                        setConsentText(validationConfig?.consentText);
                        setPasswordPolicyConfig(validationConfig?.passwordStrength);
                    } catch {
                        setLoader(false);
                        NotificationWithIcon("error", t("formikError:SOMETHING_WENT_WRONG"));
                    }

                    dispatch(
                        HomeActions.SetConfiguration({
                            config: configData,
                        })
                    );
                }
            })
            .catch(() => {});
    };

    // useEffect to call configuration function whenever page renders
    useEffect(() => {
        getConfiguration();

        const newBreadcrumb = { title: pageTitle, href: "/cart", active: true };
        dispatch(BreadcrumbAction.SaveBreadCrumbsData(newBreadcrumb));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function to check if email has any duplicate value
    const checkForDuplicateEmail = (email: string) => {
        return CheckoutService.checkDuplicateEmail(email)
            .then((data: any) => {
                if (data?.isValid !== true) {
                    setMobileActiveError(t("formikError:EMAIL_EXISTS"));
                    return false;
                }
                return true;
            })
            .catch(() => {
                setMobileActiveError(t("formikError:VALID_EMAIL"));
                return false;
            });
    };

    // function to change username 
    const handleUserNameChange = (e: any) => {
        if (!isTouched.userName) {
            setTouched(prevState => ({ ...prevState, userName: true }));
            return;
        }
        setMobileActiveError(null);
        const { value } = e.target;
        const mobilePattern = new RegExp(config.MsisdnRegex);
        const emailPattern = new RegExp(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const isValidPhoneNumber = mobilePattern.test(value);
        const isValidEmail = emailPattern.test(value);
        if (isValidPhoneNumber) {
            setLoader(true);
            AuthService.numberStatus({ mobile: value })
                .then((result: any) => {
                    setLoader(false);
                    if (result.status === true) {
                        setMobileActiveError(null);
                    } else {
                        setMobileActiveError(t("formikError:INACTIVE_MOBILE_NUMBER"));
                    }
                })
                .catch(() => {
                    setLoader(false);
                    setMobileActiveError(t("formikError:INACTIVE_MOBILE_NUMBER"));
                });
        } else if (!isValidEmail) {
            setMobileActiveError(t("formikError:VALID_MOBILE_NUMBER"));
        } else if (isValidEmail) {
            // checkForDuplicateEmail(value);
            // check email
        } else {
            setMobileActiveError(null);
        }
    };

    // function to get the user details 
    const getUserDetailsHandler = async (callback: any) => {
        setLoader(true);
        await AuthService.getUserDetails()
            .then(async (res: any) => {
                setLoader(false);
                let type = "";
                let role = "";
                let customerTypeSegment: any = null;
                try {
                    const allMSISDNs: any = await ProfileService.getDashboardNumbers("");
                    const allServices = allMSISDNs?.responseData?.data?.map((item: any) =>
                        item?.serviceType?.toLowerCase()
                    );
                    customerTypeSegment = allMSISDNs?.responseData?.customerType;
                    const isPostPaidThere = allServices?.includes("postpaid");
                    type = isPostPaidThere ? "postpaid" : "prepaid";
                    role = allMSISDNs?.responseData?.serviceType.toLowerCase() || "";
                } catch {
                    console.log("err");
                }
                dispatch(
                    HomeActions.SetUserConfiguration({
                        userConfig: {
                            ...res?.user,
                            serviceType: type,
                            accessRole: role,
                            customerTypeSegment,
                        },
                    })
                );
                callback(res?.user);
            })
            .catch((err: any) => {
                setLoader(false);
                NotificationWithIcon("error", err?.data?.responseMessage || t("formikError:SOMETHING_WENT_WRONG"));
            });
    };

    // function to show birthdate or not
    const disabledBirthDateDateHandler = (current: any) => {
        const eligibleYear = moment().subtract("years", minAge);
        return current && current > eligibleYear;
    };

    // function to get OTP
    const getOtpHandler = (values: any) => {
        if (values?.username) {
            setUserNameError(null);
            setOtpLoader(true);
            setOtpError("");
            setSuccess("");
            const url = resendOtpLabel.visible ? `api/customer/sendOtp?resend=true` : `api/customer/sendOtp`;
            AuthService.getOtp(url, {
                username: values?.username,
                event: "SEND_OTP_VIA_EMAIL",
                firstName: values?.firstName,
                lastName: values?.lastName,
                preferredLanguage: values?.preferredLanguage === "English" ? "en" : "ar",
            })
                .then((res: any) => {
                    if (res) {
                        if (res) {
                            setResendOtpLabel({ visible: false, disable: false });
                            setSuccess(res.message);
                            setOTPUUID(res.uuid);
                            setTimeout(() => {
                                setOtpTime(otpResendTime);
                                setResendOtpLabel({ visible: true, disable: true });
                                setOtpLoader(false);
                            }, 1000);
                        }
                    }
                })
                .catch(err => {
                    setSuccess("");
                    setOTPUUID("");
                    setResendOtpLabel({ visible: false, disable: false });
                    setOtpError(err.data.error);
                    if (err.data.responseMessage !== "Invalid username.") {
                        setTimeout(() => {
                            setOtpTime(otpBlockAfterMaxAttempt);
                            setResendOtpLabel({ visible: true, disable: true });
                            setOtpLoader(false);
                        }, 1000);
                    } else {
                        setOtpLoader(false);
                    }
                });
        } else {
            setUserNameError(t("register:OTP_WITHOUT_USERNAME"));
        }
    };
    
    // function to finish timer
    const handleFinishTimer = () => {
        setResendOtpLabel({ visible: true, disable: false });
        setOtpError("");
        setSuccess("");
    };

    // function to handle blur date of birth handler
    const onBlurDobHandler = (e: any) => {
        let dob = e.target.value;
        if (dob) {
            dob = moment(dob, ConstantsFreeze.DATE_FORMAT).format(ConstantsFreeze.SAVE_DATA_DATE_FORMAT);
            const todayDate = getTodayDateAndTime();
            const years = moment(todayDate).diff(moment(dob), "year");
            if (years < minAge) {
                setDobError(t("formikError:DOB_ERROR", { minAge }));
            } else {
                setDobError("");
            }
        }
    };

    const getOtpButtonText = () => {
        if (otpLoader) {
            return <Loader />;
        }
        if (resendOtpLabel.visible) {
            return t("register:RESEND_OTP");
        }
        return t("register:GET_OTP");
    };

    const handlePasswordChange = (e: any) => {
        if (!isTouched.password) {
            setTouched(prevState => ({ ...prevState, password: true }));
            return;
        }
        const password = e.target.value;

        const checkedPolicies: string[] = [];
        const checkLowerCase = /[a-z]/.test(password);
        const checkUpperCase = /[A-Z]/.test(password);
        const checkDigits = /\d/.test(password);
        const checkSpecialChars = /^(?:.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]){2}/.test(password);

        if (checkLowerCase) {
            checkedPolicies.push(PASSWORD_STRENGTH.lowerCase);
        }

        if (checkUpperCase) {
            checkedPolicies.push(PASSWORD_STRENGTH.upperCase);
        }

        if (checkDigits) {
            checkedPolicies.push(PASSWORD_STRENGTH.digits);
        }

        if (checkSpecialChars) {
            checkedPolicies.push(PASSWORD_STRENGTH.twoSpecialChar);
        }

        const sortedCheckedPolicies = checkedPolicies.sort((a, b) => a.localeCompare(b));

        let score = "weak";

        if (passwordPolicyConfig) {
            const keys = Object.keys(passwordPolicyConfig);
            keys.forEach((key: string, index: number) => {
                const splittedKey = key.split("+").sort((a, b) => a.localeCompare(b));

                const result = splittedKey.every(val => checkedPolicies.includes(val));
                if (_.isEqual(sortedCheckedPolicies, splittedKey) || result) {
                    score = passwordPolicyConfig?.[key];
                }
            });
        }

        let scoreTranslate: string;
        if (score.toLocaleLowerCase() === "weak") {
            scoreTranslate = t("formikError:WEAK");
        } else if (score.toLocaleLowerCase() === "medium") {
            scoreTranslate = t("formikError:MEDIUM");
        } else {
            scoreTranslate = t("formikError:STRONG");
        }
        setPasswordStatus({
            className: `password-${score.toLowerCase() || "weak"}`,
            value: t("formikError:PASSWORD_SCORE", { score: scoreTranslate }),
        });
    };

    const getUserPermissions = async (roleId: any) => {
        setLoader(true);
        await AuthService.getUserPermissionsByRole({ roleId })
            .then((res: any) => {
                if (res) {
                    setLoader(false);
                    const { permission } = res;
                    const alias = permission.map((item: any) => {
                        return item.permissionAlias;
                    });
                    dispatch(
                        DashboardActions.setUserPermissions({
                            userPermissions: permission,
                            userPermissionAlias: alias,
                        })
                    );
                }
            })
            .catch(() => {
                setLoader(false);
            });
    };

    const getUserRoles = async (userInfo: any) => {
        setLoader(true);
        await AuthService.getRoles(`page=1&limit=${ConstantsFreeze.PAGE_LIMIT}`)
            .then((res: any) => {
                if (res) {
                    setLoader(false);
                    const { roles } = res?.data;
                    roles.map(async (role: any) => {
                        if (role.name === userInfo?.role) {
                            await getUserPermissions(role.id);
                        }
                        return 0;
                    });
                }
            })
            .catch(() => {
                setLoader(false);
            });
    };

    const handleRegisterSubmit = async (v: any) => {
        const data = {
            firstName: v.firstName,
            lastName: v.lastName,
            middlename: v.middlename,
            password: v.password,
            confirmPassword: v.password,
            username: v.username,
            alternateEmail: v?.alternateEmail,
            alternateContact: v.alternateContact,
            dob: moment(v.dob, ConstantsFreeze.DATE_FORMAT).format(ConstantsFreeze.SAVE_DATA_DATE_FORMAT),
            gender: v.gender || null,
            preferredLanguage: v.preferredLanguage,
            otp: parseInt(v.otp, 10),
            communicationConsent: v.communicationConsent,
            uuid: otpUUID || "",
        };
        let loginData: any = {
            username: v.username,
            password: v.password,
        };
        if ((getCookie("uuid") && shoppingCartId) || (!getCookie("uuid") && anonymousshoppingCartId)) {
            loginData = { ...loginData, cartId: anonymousshoppingCartId || shoppingCartId };
        }
        setLoader(true);
        AuthService.postRegister(data)
            .then((res: any) => {
                if (res) {
                    AuthService.postLoginDetail(loginData)
                        .then(async (resLogin: any) => {
                            setLoader(false);
                            if (resLogin) {
                                if (resLogin.responseCode === 200) {
                                    Cookie.set(AUTH_TOKEN, resLogin?.token);
                                    Cookie.set(REFRESH_TOKEN, resLogin?.refreshToken);
                                    Cookie.remove("uuid");
                                    dispatch(AnonymousUserCartActions.Reset());
                                    dispatch(
                                        CartActions.SetSubscriptionLimit({
                                            checkSubscriptionLimitExceed:
                                                resLogin?.checkSubscriptionLimitExceed || false,
                                        })
                                    );
                                    dispatch(
                                        CartActions.SetAmountOverDueForCustome({
                                            isAmountOverDueForCustomer: resLogin?.isAmountOverDueForCustomer || false,
                                        })
                                    );
                                    dispatch(
                                        CartActions.SetSpendingLimit({
                                            isSpendingLimitExceeded: resLogin?.isSpendingLimitExceeded || false,
                                        })
                                    );
                                    dispatch(
                                        CartActions.SetIsRemainingSpendingLimitFound(
                                            resLogin?.isRemainingSpendingLimitFound || false
                                        )
                                    );
                                    await getUserDetailsHandler(async (userData: any) => {
                                        if (userData) {
                                            await getUserRoles(userData);
                                        }
                                        await CartService.createTMFShoppingCart({
                                            userId: userData?.id,
                                            name: userData?.username,
                                        }).then(async (createCartResponse: any) => {
                                            dispatch(
                                                CartActions.SetShoppingCartId({
                                                    shoppingCartId: createCartResponse?.result?.shoppingCartId,
                                                })
                                            );
                                            if (createCartResponse?.result?.cart?.cartItems?.length > 0) {
                                                dispatch(
                                                    CartActions.setCartBadge({
                                                        showBadge: true,
                                                        totalItems: createCartResponse?.result?.cart?.cartItems?.length,
                                                    })
                                                );
                                                dispatch(
                                                    PlanActions.SetPaymentMode({
                                                        paymentMode:
                                                            createCartResponse?.result?.cart?.cartItems[0]?.product?.[
                                                                "@type"
                                                            ],
                                                    })
                                                );
                                            }
                                            await router.push(redirectTo);
                                        });
                                    });
                                }
                            }
                        })
                        .catch(err => {
                            setLoader(false);
                            NotificationWithIcon(
                                "error",
                                err?.data?.responseMessage || t("formikError:SOMETHING_WENT_WRONG")
                            );
                        });
                }
            })
            .catch(err => {
                setLoader(false);
                if (err.data.error === "Invalid OTP") {
                    setResendOtpLabel({ visible: true, disable: false });
                }
                NotificationWithIcon("error", err?.data?.responseMessage || t("formikError:SOMETHING_WENT_WRONG"));
            });
    };
    const preventMinus = (e: any) => {
        if (!/^[0-9]+$/.test(e.key)) {
            e.preventDefault();
        }
    };
    const handlePhoneNumberChange = (e: any) => {
        setAlternateContactError("");
        const { value } = e.target;
        const phonePattern = new RegExp(/^[1-9+][0-9]{9,14}$/);
        const isValidPhone = phonePattern.test(value);
        if (!isValidPhone && value.length > 0) {
            setAlternateContactError(t("formikError:PHONE_NUMBER_INVALID"));
        } else {
            setAlternateContactError("");
        }
    };
    const handleEmailChange = (e: any) => {
        setEmailError("");
        const { value } = e.target;
        const emailPattern = new RegExp(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const isValidEmail = emailPattern.test(value);
        if (!isValidEmail && value.length > 0) {
            setEmailError(t("formikError:VALID_EMAIL"));
        } else {
            setEmailError("");
        }
    };
    return (
        <div className={i18n.language === "ar" ? `${style["arabic-body"]}` : ""}>
            {loader && <Loader loaderClassName={loaderStyle.loaderClassName} divClassName={loaderStyle.devClassName} />}
            <div className={style["main-contain-section"]}>
                <Breadcrumb breadCrumbData={breadCrumbData} />
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        middlename: "",
                        password: "",
                        username: "",
                        alternateEmail: "",
                        alternateContact: "",
                        dob: "",
                        gender: "",
                        preferredLanguage: "Arabic",
                        otp: "",
                        communicationConsent: false,
                    }}
                    validationSchema={() => registerSchema(t, configuration)}
                    onSubmit={handleRegisterSubmit}
                >
                    {({ handleSubmit, values, errors, setFieldValue, handleChange, handleBlur, isValid }) => (
                        <div className={`${style["login-from"]}`}>
                            <section className={style["form-section"]}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className={style["first-section"]}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <>{t("basicDetails:FIRST_NAME*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EG_JOHN_M")}
                                                                className={style["form-control"]}
                                                                name="firstName"
                                                                dataTestId="firstName"
                                                                value={values.firstName}
                                                                maxLength={LENGTH_VALIDATION.NAME_LENGTH}
                                                            />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <>{t("basicDetails:MIDDLE_NAME*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EG_JOHN_M")}
                                                                className={style["form-control"]}
                                                                name="middlename"
                                                                dataTestId="middlename"
                                                                value={values.middlename}
                                                                maxLength={LENGTH_VALIDATION.MIDDLE_NAME_LENGTH}
                                                            />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <>{t("basicDetails:LAST_NAME*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EG_JOHN_M")}
                                                                className={style["form-control"]}
                                                                name="lastName"
                                                                dataTestId="lastName"
                                                                value={values.lastName}
                                                                maxLength={LENGTH_VALIDATION.NAME_LENGTH}
                                                            />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className={style["first-section"]}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <>{t("register:USERNAME*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EMAIL_REGISTERED_MOBILE_NO")}
                                                                className={style["form-control"]}
                                                                name="username"
                                                                dataTestId="username"
                                                                value={values.username}
                                                                handleInputChange={(e: any) => {
                                                                    setFieldValue("username", e.target.value);
                                                                    handleUserNameChange(e);
                                                                }}
                                                            />
                                                            <div
                                                                className={`${style["invalid-username-txt"]}`}
                                                                data-testid="username-error"
                                                            >
                                                                {!errors?.username && mobileActiveError}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {/* username hint */}
                                                    <li>
                                                        <label />
                                                        <div className={style["box-hint"]}>
                                                            <>
                                                                <p className="notice-txt mb-0 pl-0">
                                                                    <img
                                                                        src="images/blueinfo.svg"
                                                                        alt=""
                                                                        className="mr-2"
                                                                    />
                                                                    {t("register:USERNAME_HINT")}
                                                                </p>
                                                            </>
                                                        </div>{" "}
                                                    </li>
                                                    <li className={style.passwordWrapper}>
                                                        <label>
                                                            <>{t("register:PASSWORD*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type={passwordVisible ? "text" : "password"}
                                                                placeholder={t("register:AT_LEAST_8_LETTERS", {
                                                                    length: Number(config.userPasswordLength),
                                                                })}
                                                                className={style["form-control"]}
                                                                name="password"
                                                                dataTestId="password"
                                                                value={values.password}
                                                                handleBlurChange={handleBlur}
                                                                handleInputChange={(e: any) => {
                                                                    setFieldValue("password", e.target.value);
                                                                    handlePasswordChange(e);
                                                                }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                            >
                                                                <img
                                                                    src={
                                                                        passwordVisible
                                                                            ? "images/eyeclose.svg"
                                                                            : "images/eyeopen.svg"
                                                                    }
                                                                    className={`${style.eyeopen}`}
                                                                    alt=""
                                                                />
                                                            </button>
                                                            {!errors?.password && (
                                                                <div className={`${style[passwordStatus.className]}`}>
                                                                    {passwordStatus?.value}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                    {/* password hint */}
                                                    <li className={style.passwordWrapper}>
                                                        <label />
                                                        <div className={style["box-hint"]}>
                                                            <>
                                                                <p className="notice-txt mb-0 pl-0">
                                                                    <img
                                                                        src="images/blueinfo.svg"
                                                                        alt=""
                                                                        className="mr-2"
                                                                    />
                                                                    {t("register:PASSWORD_HINT", {
                                                                        passwordLength:
                                                                            configuration?.userPasswordLength,
                                                                    })}
                                                                </p>
                                                            </>
                                                        </div>{" "}
                                                    </li>
                                                    <li className={style.otpWrapper}>
                                                        <label>
                                                            <>{t("register:ENTER_OTP*")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:CLICK_TO_GENERATE_OTP")}
                                                                className={style["form-control"]}
                                                                name="otp"
                                                                dataTestId="otp"
                                                                value={values.otp}
                                                                onKeyPress={e => preventMinus(e)}
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() => getOtpHandler(values)}
                                                                disabled={
                                                                    resendOtpLabel.disable || values.username === ""
                                                                }
                                                            >
                                                                {getOtpButtonText()}
                                                            </button>
                                                            <div className={`${style["invalid-username-txt"]}`}>
                                                                {!errors?.otp && userNameError}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label />
                                                        <div className={style.timerContainer}>
                                                            {success && (
                                                                <div className={style.otpSuccessful}>
                                                                    {`${success} .`}
                                                                </div>
                                                            )}
                                                            {resendOtpLabel.disable && (
                                                                <div className={style.timerOtpContainer}>
                                                                    <span className={style.resentText}>
                                                                        <>{t("register:RESEND_OTP_IN")}</>
                                                                    </span>
                                                                    <Timer
                                                                        initialSeconds={0}
                                                                        initialMinute={otpTime}
                                                                        handleFinishTimer={handleFinishTimer}
                                                                    />
                                                                </div>
                                                            )}
                                                            {otpError && (
                                                                <div className={style.invalidOtpTxt}>{otpError}</div>
                                                            )}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className={style["second-section"]}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <>{t("register:DATE_OF_BIRTH")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <DateComponent
                                                                name="dob"
                                                                dataTestId="dob"
                                                                placeholder={t("register:DD_MM_YYYY")}
                                                                className={`${style["form-control"]} ${style.DatePickerClassName}`}
                                                                divClassName={style.DatePickerDiv}
                                                                required
                                                                disabledDateHandler={disabledBirthDateDateHandler}
                                                                dateFormat={ConstantsFreeze.DATE_FORMAT}
                                                                onBlurHandler={onBlurDobHandler}
                                                                onMouseUp={() => {
                                                                    const eligibleYear = moment().subtract(
                                                                        "years",
                                                                        minAge
                                                                    );
                                                                    setFieldValue("dob", values.dob || eligibleYear);
                                                                }}
                                                                readonly
                                                            />
                                                            <div
                                                                className={`${style["invalid-username-txt"]}`}
                                                                data-testid="dob-error"
                                                            >
                                                                {!errors?.dob && dobError}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <>{t("register:GENDER")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <select
                                                                name="gender"
                                                                data-testid="gender"
                                                                value={values.gender}
                                                                className={`${style["form-control"]} ${style["custom-drop"]}`}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="" disabled>
                                                                    {t("register:SELECT")}
                                                                </option>
                                                                {genderList &&
                                                                    genderList.map((item: any) => (
                                                                        <option key={item.value} value={item.value}>
                                                                            {item.label}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <>{t("register:COMMUNICATION_LANGUAGE")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <select
                                                                name="preferredLanguage"
                                                                data-testid="preferredLanguage"
                                                                value={values.preferredLanguage}
                                                                className={`${style["form-control"]} ${style["custom-drop"]}`}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="English">{t("register:ENGLISH")}</option>
                                                                <option value="Arabic">{t("register:ARABIC")}</option>
                                                            </select>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className={style["second-section"]}>
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <>{t("register:ALTERNATE_CONTACT_NO")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EG_1234567890")}
                                                                className={style["form-control"]}
                                                                name="alternateContact"
                                                                dataTestId="alternateContact"
                                                                value={values.alternateContact}
                                                                maxLength={LENGTH_VALIDATION.CONTACT_LENGTH}
                                                                handleInputChange={(e: any) => {
                                                                    setFieldValue("alternateContact", e.target.value);
                                                                    handlePhoneNumberChange(e);
                                                                }}
                                                            />
                                                            <div
                                                                className={`${style["invalid-username-txt"]}`}
                                                                data-testid="alternateContact"
                                                            >
                                                                {!errors?.alternateContact && alternateContactError}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <>{t("register:ALTERNATE_EMAIL")}</>
                                                        </label>
                                                        <div className={style["btn-wraper"]}>
                                                            <STLInput
                                                                type="text"
                                                                placeholder={t("register:EG_JOHN_COM")}
                                                                className={style["form-control"]}
                                                                name="alternateEmail"
                                                                dataTestId="alternateEmail"
                                                                value={values.alternateEmail}
                                                                maxLength={Number(config.userEmailLength)}
                                                                handleInputChange={(e: any) => {
                                                                    setFieldValue("alternateEmail", e.target.value);
                                                                    handleEmailChange(e);
                                                                }}
                                                            />
                                                            <div
                                                                className={`${style["invalid-username-txt"]}`}
                                                                data-testid="phoneError"
                                                            >
                                                                {!errors?.alternateEmail && emailError}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {shouldShowConsent ? (
                                        <CustomCheckbox
                                            label={consentText}
                                            setFieldValue={setFieldValue}
                                            filedName="communicationConsent"
                                            checked={values?.communicationConsent}
                                            icon={
                                                <div className={style.checkboxIconContainer}>
                                                    <CheckOutlined color="#fff" />
                                                </div>
                                            }
                                            borderColor="#8c8c8c80"
                                            containerStyle={{ marginBottom: 0 }}
                                            borderRadius={2}
                                            size={20}
                                        />
                                    ) : null}
                                    <div className="text-center mt-5 pt-4">
                                        <STLButton
                                            disabled={Boolean(mobileActiveError) || !isValid}
                                            className={`${style["yellow-btn"]} ${style["custom-btn"]} ${
                                                mobileActiveError || !isValid ? style.disableButton : ""
                                            }`}
                                            dataTestId="submit-register"
                                            onClick={handleSubmit}
                                        >
                                            <>{t("register:REGISTER")}</>
                                        </STLButton>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};
export default withTranslation(["breadCrumb", "formikError", "register", "basicDetails"])(Registration);
