/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { withTranslation } from "@Server/i18n";
import Cookie from "js-cookie";
import { WithTranslation } from "next-i18next";
import { Layout, Login, LoginOtp } from "@Components";
import RoutPath from "@Utils/routes";
import { ConstantsFreeze, LOCAL_HOST_KEY } from "@Utils/enums";
import HomeService from "@Services/API/Home";
import { getCookieBasedOnProcess, NotificationWithIcon } from "@Utils/helper";
import { Loader } from "@Components/Common";
import loaderStyle from "@Components/Common/Loader.module.scss";
import BreadcrumbAction from "@Redux/Actions/BreadcrumbActions";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "@Services/API/Auth";
import AnonymousUserCartActions from "@Redux/Actions/AnonymousUserCartActions";
import CartService from "@Services/API/Cart";
import CartActions from "@Redux/Actions/CartActions";
import PlanActions from "@Redux/Actions/PlanActions";
import ProfileService from "@Services/API/Profile";
import HomeActions from "@Redux/Actions/HomeActions";
import DashboardActions from "@Redux/Actions/DashboardActions";
import ConfigService from "@Services/API/Config";
import _ from "lodash";
import style from "./Login.module.scss";

interface InitialProps {
    namespacesRequired: string[];
}

interface Props extends WithTranslation {
    metatag: any;
}

const LoginPage: NextPage<Props, InitialProps> = ({ i18n, t, metatag }) => {
    const dispatch = useDispatch();
    const router: any = useRouter();
    const { Checkout, RootRoute } = RoutPath;
    const [otpScreen, setOtpScreen] = React.useState(false);
    const [loader, setLoader] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<any>(null);
    const [verifyOTPSuccess, setVarifiedMsg] = React.useState<any>(null);
    const [otpLengthConfig, setOTPLengthConfig] = React.useState("");
    const [otpValidTime, setOTPValidTime] = React.useState("");
    const [resendMaxAttemp, setResendMaxAttemp] = React.useState("");
    const [resendMaxAttempCount, setResendAttempCount] = React.useState<any>(0);

    const [verifyOTPError, setNotVarifiedMsg] = React.useState<any>(null);
    const { AUTH_TOKEN } = LOCAL_HOST_KEY;
    const commonState = useSelector((state: any) => state.common);
    const { planID } = commonState;

    // function to define where we should redirect after login screen
    const handleRedirectTo = (): any => {
        if (router?.query?.from === "header" || !router?.query?.from) {
            return RootRoute;
        }
        if (router?.query?.from === "cart") {
            return Checkout;
        }
        if (router?.query?.from === "addon") {
            return `/plan/${planID?.planID}`;
        }
        return router?.query?.from ? decodeURIComponent(router?.query?.from) : "/";
    };
    const redirectTo = handleRedirectTo();
    
    // useEffect function , gets called when dispatch or language changes
    React.useEffect(() => {
        const newBreadcrumb = {
            title: t("breadCrumb:Login"),
            href: `/login?from=${router?.query?.from}`,
            active: false,
        };
        dispatch(BreadcrumbAction.SaveBreadCrumbsData(newBreadcrumb));
    }, [dispatch, t]);
    
    // useEffect function , gets called whenever page renders
    React.useEffect(() => {
        (async () => {
            await ConfigService.getConfiguration("fields=user.otp").then((res: any) => {
                if (res) {
                    const { result } = res;
                    const otpValid = _.find(result, ele => ele.configurableKey === "user.otp.validFor")
                        ?.configurableValue;
                    setOTPValidTime(otpValid);
                    const maxAttempResend = _.find(result, ele => ele.configurableKey === "user.otp.resendMaxAttempt")
                        ?.configurableValue;
                    setResendMaxAttemp(maxAttempResend);
                    const otpLength = _.find(result, ele => ele.configurableKey === "user.otp.otpLength")
                        ?.configurableValue;
                    setOTPLengthConfig(otpLength);
                }
            });
        })();
    }, []);

    // function for requesting OTP vie login
    const handleRequestOTPLogin = (data: any) => {
        setUsername(data);
        setLoader(true);
        setVarifiedMsg(null);
        setNotVarifiedMsg(null);
        setResendAttempCount(resendMaxAttempCount + 1);
        const reqData = {
            username: data,
            event: "SEND_LOGIN_OTP",
            preferredLanguage: `${i18n.language}`,
        };
        AuthService.requestOTPForLogin(reqData)
            .then((res: any) => {
                setLoader(false);
                if (res) {
                    NotificationWithIcon("success", res?.responseMessage || "");
                    setOtpScreen(true);
                }
            })
            .catch((err: any) => {
                setLoader(false);
                NotificationWithIcon("error", err?.data?.responseMessage || "");
            });
    };

    // function to get the permissions for the user which he/she is able access
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

    // function for getting user roles
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

    // function to get the details of the user like his MSISDN list and all data related to that, etc
    const getUserDetailsHandler = async () => {
        try {
            const res: any = await AuthService.getUserDetails();
            let type = "";
            let role = "";
            let customerTypeSegment: any = null;
            try {
                const allMSISDNs: any = await ProfileService.getDashboardNumbers("");
                const resMSISDN: any = allMSISDNs?.responseData?.primaryMSISDN;
                const basePlanData: any = allMSISDNs?.responseData?.data.find((item: any) => item.number === resMSISDN);
                dispatch(
                    DashboardActions.setSelectMSISDNNumber({
                        selectedMSISDN: allMSISDNs?.responseData?.primaryMSISDN,
                    })
                );
                dispatch(
                    DashboardActions.setSelectedBasicPlan({
                        selectedBasicplan: basePlanData?.basicPlan?.name,
                    })
                );
                dispatch(
                    DashboardActions.setSelectedServiceType({
                        selectedServiceType: basePlanData?.serviceType,
                    })
                );
                if (allMSISDNs.responseData.data.length > 1) {
                    dispatch(
                        HomeActions.SetUserMSISDNConfig({
                            usermsisdnconfig: allMSISDNs?.responseData?.data,
                        })
                    );
                }
                const allServices = allMSISDNs?.responseData?.data?.map((item: any) =>
                    item?.serviceType?.toLowerCase()
                );
                customerTypeSegment = allMSISDNs?.responseData?.customerType;
                const isPostPaidThere = allServices?.includes("postpaid");
                type = isPostPaidThere ? "postpaid" : "prepaid";
                // eslint-disable-next-line no-nested-ternary
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
            if (res?.user) {
                await getUserRoles(res?.user);
            }
            return res?.user;
        } catch {
            NotificationWithIcon("error", t("formikError:SOMETHING_WENT_WRONG"));
            return null;
        }
    };

    // function to varify the OTP after entering the OTP
    const verifyOTP = (otp: any, reqUsername: any) => {
        setLoader(true);
        const reqData = {
            otp,
            username: reqUsername,
        };
        setLoader(true);
        AuthService.verifyRequestOTP(reqData)
            .then(async (res: any) => {
                setLoader(false);
                setResendAttempCount(0);
                if (res) {
                    setVarifiedMsg(t("forgotPassword:OTP_VERIFIED"));
                    Cookie.set(AUTH_TOKEN, res?.token);
                    const userData = await getUserDetailsHandler();
                    Cookie.remove("uuid");
                    dispatch(AnonymousUserCartActions.Reset());
                    const createCartResponse: any = await CartService.createTMFShoppingCart({
                        userId: userData?.id,
                        name: userData?.username,
                    });
                    dispatch(
                        CartActions.SetSubscriptionLimit({
                            checkSubscriptionLimitExceed: res?.checkSubscriptionLimitExceed,
                        })
                    );
                    dispatch(
                        CartActions.SetAmountOverDueForCustome({
                            isAmountOverDueForCustomer: res?.isAmountOverDueForCustomer,
                        })
                    );
                    dispatch(
                        CartActions.SetSpendingLimit({
                            isSpendingLimitExceeded: res?.isSpendingLimitExceeded,
                        })
                    );
                    dispatch(CartActions.SetIsRemainingSpendingLimitFound(res?.isRemainingSpendingLimitFound));
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
                    await router.push(redirectTo);
                    setLoader(false);
                }
            })
            .catch(() => {
                setLoader(false);
                setNotVarifiedMsg(t("forgotPassword:OTP_NOT_VERIFIED"));
            });
    };

    // function to change varify message
    const handleOtpChange = (data: any) => {
        if (!data) {
            setVarifiedMsg(null);
            setNotVarifiedMsg(null);
        }
    };

    return (
        <>
            <Head>
                <title>{metatag?.title} </title>
                <meta name="description" content={metatag?.description} />
            </Head>
            <Layout>
                <div className={i18n.language === "ar" ? `${style["arabic-body"]}` : ""}>
                {/* loader section */}
                    {loader && (
                        <Loader loaderClassName={loaderStyle.loaderClassName} divClassName={loaderStyle.devClassName} />
                    )}
                    <section className="full-banner login-banner">
                        <div className="container-fluid px-3">
                            <div className="row">
                                <div className="col-lg-12">
                                {/* Login component conditional rendering */}
                                    {!otpScreen && (
                                        <div className={`${style["login-block"]}`}>
                                            <Login
                                                handleRequestOTPLogin={handleRequestOTPLogin}
                                                getUserDetailsHandler={getUserDetailsHandler}
                                            />
                                        </div>
                                    )}

				    {/* login otp component conditional rendering  */}
                                    {otpScreen && (
                                        <div className={`${style["login-block"]}`}>
                                            <LoginOtp
                                                title="loginotp:PleaseEntertheOTP"
                                                subtitle="loginotp:PleaseEntertheOTPtoVerifyYourAccount"
                                                username={username}
                                                onResend={handleRequestOTPLogin}
                                                verifyOTP={verifyOTP}
                                                verifyOTPSuccess={verifyOTPSuccess}
                                                verifyOTPError={verifyOTPError}
                                                setOtpVerifyMsg={handleOtpChange}
                                                otpLengthConfig={otpLengthConfig}
                                                otpValidTime={otpValidTime}
                                                resendMaxAttemp={resendMaxAttemp}
                                                resendMaxAttempCount={resendMaxAttempCount}
                                            />
                                            <div
                                                className={`${style["login-bottom"]} text-center ${style["backto-login-link"]}`}
                                            >
                                                <p>
                                                    {t("login:BACK_TO")}
                                                    <p
                                                        className={style["backto-login-text"]}
                                                        onClick={() => {
                                                            setResendAttempCount(0);
                                                            setOtpScreen(false);
                                                        }}
                                                    >
                                                        {t("login:LOGIN_PAGE")}
                                                    </p>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
};

// code to server side rendering 
LoginPage.getInitialProps = async (ctx: any) => {
    let metatag: any = null;
    const path = ctx.pathname;
    const language: string = getCookieBasedOnProcess("next-i18next", ctx?.req) || "en";
    const { query } = ctx;
    let queryURL = "";
    Object.keys(query)?.forEach(item => {
        if (item !== "slug") {
            queryURL = `${queryURL}${queryURL?.length > 0 ? "&" : ""}${item}=${query[item]}`;
        }
    });
    await HomeService.getLandingPage(language, path, queryURL)
        .then((res: any) => {
            if (res) {
                if (res?.length) {
                    metatag = res[0]?.metatag?.value;
                }
            }
        })
        .catch(() => {});
    return {
        namespacesRequired: ["login"],
        metatag,
    };
};

export default withTranslation(["login", "forgotPassword"])(LoginPage);
