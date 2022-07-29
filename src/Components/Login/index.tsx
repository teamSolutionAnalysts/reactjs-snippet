import React, { useState } from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { withTranslation } from "@Server/i18n";
import { STLInput, Loader, STLButton, STLCol, STLRow } from "@Components/Common";
import AuthService from "@Services/API/Auth";
import { LOCAL_HOST_KEY } from "@Utils/enums";
import RoutPath from "@Utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "@Utils/validationSchema";
import { getCookie, NotificationWithIcon } from "@Utils/helper";
import ConfigService from "@Services/API/Config";
import CartService from "@Services/API/Cart";
import CartActions from "@Redux/Actions/CartActions";
import AnonymousUserCartActions from "@Redux/Actions/AnonymousUserCartActions";
import PlanActions from "@Redux/Actions/PlanActions";
import loaderStyle from "@Components/Common/Loader.module.scss";
import _ from "lodash";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import profileStyle from "@Pages/profile-dashboard/profileDashboard.module.scss";
import style from "./Login.module.scss";

interface Props {
    handleRequestOTPLogin: any;
    getUserDetailsHandler: any;
}

const Login: NextPage<Props> = ({ t, i18n, handleRequestOTPLogin, getUserDetailsHandler }: any) => {
    const router: any = useRouter();
    const dispatch = useDispatch();
    const { AUTH_TOKEN, REFRESH_TOKEN } = LOCAL_HOST_KEY;
    const { Checkout, RootRoute } = RoutPath;
    const [errors, setErrors] = useState<any>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const [isUserNameTouched, setUserNameTouched] = useState(false);
    const commonState = useSelector((state: any) => state.common);
    const { planID } = commonState;
    
    // function to check where to redirect after login page 
    const handleRedirectTo = (): any => {
        if (router?.query?.from === "header" || !router?.query?.from) {
            return RootRoute;
        }
        if (router?.query?.from === "cart") {
            return Checkout;
        }
        if (router?.query?.from === "addon") {
            return `/plan/${planID.planID}`;
        }
        return router?.query?.from ? decodeURIComponent(router?.query?.from) : "/";
    };
    const redirectTo = handleRedirectTo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userNameRequiredError, setUserNameRequiredError] = useState<any>(null);
    const [linkConfig, setLinkConfig] = React.useState<any>(null);
    const [mobileActiveError, setMobileActiveError] = useState<any>(null);
    const [MSISDNExp, setMSISDNExp] = useState<any>("");
    const [OTPLoginAccess, setOTPLoginAccess] = useState<any>("");
    const [isRequestOTP, setIsRequestOTP] = useState<any>("");
    const [enteredUsername, setUsername] = useState<any>(null);
    const [cartMergeMsg, setCartMergeMsg] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const cartState = useSelector((state: any) => state.cart);
    const anonymousUserState = useSelector((state: any) => state.anonymousUser);
    const { shoppingCartId } = cartState;
    const { shoppingCartId: anonymousshoppingCartId } = anonymousUserState;

    // function to check the credential and set the data which is required after login
    const handleLoginSubmit = async (values: any) => {
        if ((getCookie("uuid") && shoppingCartId) || (!getCookie("uuid") && anonymousshoppingCartId)) {
            // eslint-disable-next-line no-param-reassign
            values = { ...values, cartId: anonymousshoppingCartId || shoppingCartId };
        }
        setLoader(true);
        AuthService.postLoginDetail(values)
            .then(async (res: any) => {
                if (res) {
                    if (res) {
                        Cookie.set(AUTH_TOKEN, res?.token);
                        Cookie.set(REFRESH_TOKEN, res?.refreshToken);
                        const userData = await getUserDetailsHandler();
                        Cookie.remove("uuid");
                        // setting the various data that we get after successful login
                        dispatch(AnonymousUserCartActions.Reset());
                        const createCartResponse: any = await CartService.createTMFShoppingCart({
                            userId: userData?.id,
                            name: userData?.username,
                        });
                        dispatch(
                            CartActions.SetSubscriptionLimit({
                                checkSubscriptionLimitExceed: res?.checkSubscriptionLimitExceed || false,
                            })
                        );
                        dispatch(
                            CartActions.SetAmountOverDueForCustome({
                                isAmountOverDueForCustomer: res?.isAmountOverDueForCustomer || false,
                            })
                        );
                        dispatch(
                            CartActions.SetSpendingLimit({
                                isSpendingLimitExceeded: res?.isSpendingLimitExceeded || false,
                            })
                        );
                        dispatch(
                            CartActions.SetIsRemainingSpendingLimitFound(res?.isRemainingSpendingLimitFound || false)
                        );
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
                                    paymentMode: createCartResponse?.result?.cart?.cartItems[0]?.product?.["@type"],
                                })
                            );
                        }
                        if (res?.merged === false && typeof res?.isCartAbleToMerge === "string") {
                            setCartMergeMsg(res?.isCartAbleToMerge);
                            setShowConfirm(true);
                        } else {
                            await router.push(redirectTo);
                        }
                    }
                    setLoader(false);
                }
            })
            .catch(err => {
                setLoader(false);
                setErrors(err?.data?.responseMessage);
            });
    };

    // function to check link of forget password 
    const handleLinkClick = (reqType: any, username: any) => {
        setLoader(true);
        const reqData = {
            requestType: reqType,
            username,
        };
        AuthService.forgotPassword(reqData)
            .then((res: any) => {
                setLoader(false);
                if (res) {
                    NotificationWithIcon("success", res?.responseMessage || "");
                }
            })
            .catch((err: any) => {
                setLoader(false);
                NotificationWithIcon("error", err?.data?.responseMessage || "");
            });
    };

    // function to redirect at forget password page if link is valid or not 
    const handleForgotClick = (username: any) => {
        if (username) {
            if (linkConfig.length === 1 && linkConfig[0] === "Link") {
                handleLinkClick("link", username);
            } else {
                router.push(`/forgotPassword?username=${username}`);
            }
            setUserNameRequiredError(null);
        } else {
            setUserNameRequiredError(t("login:USERNAME_REQUIRED_FOR_FORGOT"));
        }
    };

    // function to request OTP for login
    const handleRequestOTP = (username: any) => {
        if (username) {
            setUserNameRequiredError(null);
            handleRequestOTPLogin(username);
        } else {
            setUserNameRequiredError(t("login:USERNAME_REQUIRED_FOR_REQUEST_OTP"));
        }
    };

    // function to get configuration from API
    const getConfigurations = async () => {
        setLoader(true);
        const configResponse: any = await ConfigService.getConfiguration("");
        setLoader(false);
        if (configResponse?.responseCode === 200) {
            const forgotPasswordOptions = _.find(
                configResponse?.result,
                item => item.configurableKey === "user.forgotPassword.options"
            );
            const msisdn = _.find(configResponse?.result, item => item.configurableKey === "msisdn.regExp");
            const otpLoginFor = _.find(configResponse?.result, item => item.configurableKey === "user.otp.loginFor");
            setLinkConfig(forgotPasswordOptions?.configurableValue);
            setMSISDNExp(msisdn?.configurableValue);
            setOTPLoginAccess(otpLoginFor?.configurableValue);
        }
    };

    // useEffect to call configuration function at every render of the page
    React.useEffect(() => {
        getConfigurations();
    }, []);

    // function to change the username
    const handleUserNameChange = (e: any) => {
        if (!isUserNameTouched) {
            setUserNameTouched(true);
            return;
        }
        setMobileActiveError(null);
        const { value } = e.target;
        setUsername(value);
        setUserNameRequiredError(null);
        const mobilePattern = new RegExp(MSISDNExp);
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
                        if (OTPLoginAccess === "Email") {
                            setIsRequestOTP(true);
                        } else {
                            setIsRequestOTP(false);
                        }
                    } else {
                        setMobileActiveError(t("formikError:INACTIVE_MOBILE_NUMBER"));
                    }
                })
                .catch(() => {
                    setLoader(false);
                    setMobileActiveError(t("formikError:INACTIVE_MOBILE_NUMBER"));
                });
        } else if (!isValidEmail && value.length > 0) {
            setMobileActiveError(t("formikError:VALID_MOBILE_NUMBER"));
        } else if (isValidEmail) {
            if (OTPLoginAccess === "MSISDN") {
                setIsRequestOTP(true);
            } else {
                setIsRequestOTP(false);
            }
        } else if (OTPLoginAccess === "Both") {
            setIsRequestOTP(true);
        } else {
            setIsRequestOTP(false);
            setMobileActiveError(null);
        }
    };

    // function to confirm submit
    const handleConfirm = () => {
        setShowConfirm(false);
    };
    // function to redirect after confirm submit
    const handleConfirmTransfer = async () => {
        handleConfirm();
        await router.push(redirectTo);
    };
    return (
        <>
            <div>
            {/* loader component */}
                {loader && (
                    <Loader loaderClassName={loaderStyle.loaderClassName} divClassName={loaderStyle.devClassName} />
                )}
                <h2 className={`${style.h2}`}>{t("login:ALREADY_HAVE_AN_ACCOUNT")}</h2>
                <h3 className={`${style.h3}`}>{t("login:LOGIN_TO_RETRIEVE_YOUR_ACCOUNT_SETTINGS")}</h3>
                {/* Formik form to show form at login screen to get the username and password form user */}
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    validationSchema={() => loginSchema(t)}
                    onSubmit={handleLoginSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                            {/* customised input component for username */}
                                <STLInput
                                    className={`${style["form-control"]}`}
                                    placeholder={t("johnmartin@gmail.com")}
                                    type="text"
                                    name="username"
                                    label={t("login:ENTER_EMAIL_PHONE_NUMBER")}
                                    value={values.username}
                                    dataTestId="username"
                                    handleInputChange={(e: any) => {
                                        setFieldValue("username", e.target.value);
                                        setErrors(null);
                                        handleUserNameChange(e);
                                    }}
                                />
                                <div className={`${style["invalid-username-txt"]}`} data-testid="username-error">
                                    {!errors?.username && mobileActiveError}
                                </div>
                                <div className={`${style["invalid-username-txt"]}`} data-testid="username-error">
                                    {!errors?.username && userNameRequiredError}
                                </div>
                            </div>
                            <div className={`${style["password-cover"]}`}>
                                <div className="form-group mb-0">
                                {/* customised input component for password */}
                                    <STLInput
                                        className={`${style["form-control"]}`}
                                        placeholder={t("***************************")}
                                        type="password"
                                        name="password"
                                        label={t("login:PASSWORD")}
                                        value={values.username}
                                        dataTestId="password"
                                        handleInputChange={(e: any) => {
                                            setFieldValue("password", e.target.value);
                                            setErrors(null);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <p className="text-right">
                                    <label
                                        className={`${style["forgot-password"]}`}
                                        onClick={() => handleForgotClick(values.username)}
                                    >
                                        {t("login:FORGOT_PASSWORD")}
                                    </label>
                                </p>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className={`${style.btn} ${style["btn-large"]}`}
                                    disabled={loader === true}
                                    data-testid="submit-login"
                                >
                                    {loader && <Loader divClassName={style.smallLoader} />}
                                    {t("login:LOGIN")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className={`${style["invalid-otp-txt"]}`} data-testid="login-error">
                    {errors}
                </div>

                <div className={`${style["or-section"]}`}>
                    <label>{t("login:OR")}</label>
                </div>
                <div className={`${style["login-bottom"]} text-center`}>
                    <p className="text-center">
                        <button
                            className={`${style["login-with-otp"]}`}
                            disabled={isRequestOTP}
                            onClick={() => handleRequestOTP(enteredUsername)}
                        >
                            {t("login:REQUEST_OTP")}
                        </button>
                    </p>
                    <p>
                        {t("login:DO_NOT_HAVE_AN_ACCOUNT")}
                        <Link
                            href={{
                                pathname: RoutPath.Register,
                                query: { from: router?.query?.from },
                            }}
                        >
                            <a onClick={() => setLoader(true)}>{t("login:REGISTER_HERE")}</a>
                        </Link>
                    </p>
                </div>
            </div>
            {/* Modal start */}
            <Modal show={showConfirm} onHide={handleConfirm} className="changePinModal" centered backdrop="static">
                <Modal.Header className="justify-content-center">
                    <Modal.Title>
                        <img src="/images/alert.svg" alt="" className="w-auto mr-0" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={profileStyle.modalBody}>
                    <div className={i18n.language === "ar" ? `${profileStyle["arabic-body"]}` : ""}>
                        <>
                            <STLRow gutter={16}>
                                <STLCol xl={24} lg={24} md={24} sm={24} xs={24} className={profileStyle["mb-20"]}>
                                    <div className={`${profileStyle["form-section"]} border-0`}>
                                        <div className={profileStyle["drop-section"]}>
                                            <div className={profileStyle["form-group"]}>
                                                <label>{t(cartMergeMsg)}</label>
                                            </div>
                                        </div>
                                    </div>
                                </STLCol>
                                <STLCol xl={24} lg={24} md={24} sm={24} xs={24} className="d-flex">
                                    <STLButton className={`${profileStyle.yellowBtn} `} onClick={handleConfirmTransfer}>
                                        {t("login:OK")}
                                    </STLButton>
                                </STLCol>
                            </STLRow>
                        </>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Modal end */}
        </>
    );
};

export default withTranslation(["login", "formikError"])(Login);
