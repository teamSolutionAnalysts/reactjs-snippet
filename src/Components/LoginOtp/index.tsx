import React from "react";
import { Formik, Form } from "formik";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import { STLInput } from "@Components/Common";
import OTPInput from "@Components/Common/OtpInput";
import style from "../Login/Login.module.scss";

interface Props {
    title?: string;
    subtitle?: string;
    username?: any;
    verifyOTP?: any;
    isVarified?: boolean;
    onNext?: any;
    onResend?: any;
    verifyOTPSuccess?: any;
    verifyOTPError?: any;
    setOtpVerifyMsg?: any;
    otpLengthConfig?: string;
    otpValidTime?: string;
    resendMaxAttemp?: string;
    resendMaxAttempCount?: any;
}

const LoginOtp: NextPage<Props> = ({
    t,
    title,
    subtitle,
    username,
    verifyOTP,
    isVarified,
    onNext,
    onResend,
    verifyOTPSuccess,
    verifyOTPError,
    setOtpVerifyMsg,
    otpLengthConfig,
    otpValidTime,
    resendMaxAttemp,
    resendMaxAttempCount,
}: any) => {
    const [otpFieldData, setOTPData] = React.useState<any>();
    const [otpError, setOTPError] = React.useState(false);
    const [isResend, setIsResend] = React.useState(false);

    // function to change the input of the otp on change
    const changeOtp = (otpData: any) => {
        if (!otpData) {
            setOtpVerifyMsg("");
        } else {
            setOTPError(false);
        }
        setOTPData(otpData);
    };

    return (
        <>
            <h2 className={`${style.h2}`}>{t(title)}</h2>
            <h3 className={`${style.h3}`}>{t(subtitle)}</h3>
            {/* formik form for the username and OTP value */}
            <Formik
                initialValues={{
                    username: username || "",
                }}
                onSubmit={() => {
                    if (otpFieldData) {
                        verifyOTP(otpFieldData, username);
                    } else {
                        setOTPError(true);
                    }
                }}
            >
                {({ values }) => (
                    <Form className={`${style["login-from"]}`}>
                        <div className="form-group">
                            <label>{t("loginotp:Username")}*</label>
                            {/* customised input for username */}
                            <STLInput
                                className={`${style["form-control"]}`}
                                placeholder={t("loginotp:Username")}
                                type="text"
                                name="username"
                                value={values.username}
                            />
                        </div>
                        <div className={`${style["otp-section"]}`}>
                            {/* customised input for OTP */}
                            <OTPInput
                                autoFocus
                                isNumberInput
                                length={Number(otpLengthConfig)}
                                className={style.optContainer}
                                inputClassName={style.otpInput}
                                onChangeOTP={(otpData: any) => changeOtp(otpData)}
                                isResend={isResend}
                                setIsResend={setIsResend}
                            />
                            {/* Error messages */}
                            {otpError && (
                                <div className={`${style["invalid-username-txt"]}`}>
                                    {t("formikError:OTP_REQUIRED")}
                                </div>
                            )}
                            {isVarified && verifyOTPSuccess && (
                                <div className={`${style["valid-username-txt"]}`}>{verifyOTPSuccess}</div>
                            )}
                            {!isVarified && verifyOTPError && (
                                <div className={`${style["invalid-username-txt"]}`}>{verifyOTPError}</div>
                            )}
                        </div>
                        <div className={`${style.expiretxt} mt-2`}>
                            {t(`loginotp:YOUR_OTP_WILL_EXPIRE_IN_60_SECONDS`, { otpValidTime })}
                        </div>
                        <div className={style["resend-otp-section"]}>
                            <p>
                                {t("loginotp:NotReceivedYourCode?")}
                                <span
                                    className={
                                        resendMaxAttempCount > resendMaxAttemp
                                            ? `${style.disabled} ml-1 mr-1`
                                            : "ml-1 mr-1"
                                    }
                                >
                                    <a
                                        onClick={() => {
                                            setIsResend(true);
                                            onResend(values.username);
                                        }}
                                    >
                                        {t("loginotp:ResendCode")}
                                    </a>
                                </span>
                            </p>
                        </div>

                        <div className="text-center mb-4">
                            {!isVarified ? (
                                <button type="submit" className={`${style.btn} ${style["btn-large"]}`}>
                                    Verify{" "}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className={`${style.btn} ${style["btn-large"]}`}
                                    onClick={() => onNext()}
                                >
                                    Next{" "}
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default withTranslation(["login", "formikError", "loginotp"])(LoginOtp);
