import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import { withTranslation } from "@Server/i18n";
import { PASSWORD_STRENGTH } from "@Utils/enums";
import { Loader, STLInput } from "@Components/Common";
import _ from "lodash";
import { resetPasswordSchema } from "@Utils/validationSchema";
import { useRouter } from "next/router";
import { NotificationWithIcon, PasswordValidationConfig } from "@Utils/helper";
import style from "./ResetPassword.module.scss";

interface Props {
    resetPassword?: any;
}

const ResetPasswordComponent: NextPage<Props> = ({ i18n, t, resetPassword }: any) => {
    const router = useRouter();
    const [loader, setLoader] = useState<boolean>(false);
    const [passwordPolicyConfig, setPasswordPolicyConfig] = useState<any>();
    const [passwordStatus, setPasswordStatus] = useState<any>({ status: null, value: null });
    const { token, username }: any = router.query;
    const [configuration, setConfiguration] = useState<any>();

    const handlePasswordChange = (e: any) => {
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

        const keys = Object.keys(passwordPolicyConfig);
        keys.forEach((key: string) => {
            const splittedKey = key.split("+").sort((a, b) => a.localeCompare(b));

            const result = splittedKey.every(val => checkedPolicies.includes(val));
            if (_.isEqual(sortedCheckedPolicies, splittedKey) || result) {
                score = passwordPolicyConfig[key];
            }
        });

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

    async function fetchConfig() {
        setLoader(true);
        try {
            // get configuration
            const validationConfig: any = await PasswordValidationConfig(i18n.language);
            setLoader(false);
            setConfiguration(validationConfig);
            setPasswordPolicyConfig(validationConfig?.passwordStrength);
        } catch {
            setLoader(false);
            NotificationWithIcon("error", t("formikError:SOMETHING_WENT_WRONG"));
        }
    }

    useEffect(() => {
        fetchConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <h2 className={`${style.h2}`}>{t("forgotPassword:ResetYourPassword")}</h2>
                <Formik
                    initialValues={{
                        username: username || "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={() => resetPasswordSchema(t, configuration)}
                    onSubmit={async values => {
                        const reqData = {
                            username,
                            newPassword: values.newPassword,
                            link: token,
                        };
                        if (!token) {
                            delete reqData.link;
                        }
                        resetPassword(reqData);
                    }}
                >
                    {({ values, handleBlur, setFieldValue, errors }) => (
                        <Form>
                            <div className="form-group">
                                <STLInput
                                    className={`${style["form-control"]}`}
                                    placeholder={t("***************************")}
                                    type="password"
                                    name="newPassword"
                                    label={t("changePassword:NEW_PASSWORD")}
                                    value={values.newPassword}
                                    dataTestId="newPassword"
                                    handleBlurChange={handleBlur}
                                    handleInputChange={(e: any) => {
                                        setFieldValue("newPassword", e.target.value);
                                        handlePasswordChange(e);
                                    }}
                                />
                                {!errors?.newPassword && (
                                    <div className={`${style[passwordStatus.className]}`}>{passwordStatus?.value}</div>
                                )}
                                {/* password hint */}
                                <div className={style["box-hint"]}>
                                    <>
                                        <p className="notice-txt mb-0 pl-0">
                                            <img src="images/blueinfo.svg" alt="" className="mr-2" />
                                            {t("register:PASSWORD_HINT", {
                                                passwordLength: configuration?.userPasswordLength,
                                            })}
                                        </p>
                                    </>
                                </div>{" "}
                            </div>
                            <div className="form-group">
                                <STLInput
                                    className={`${style["form-control"]}`}
                                    placeholder={t("***************************")}
                                    type="password"
                                    name="confirmPassword"
                                    label={t("changePassword:CONFIRM_PASSWORD")}
                                    value={values.confirmPassword}
                                    dataTestId="confirmPassword"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className={`${style.btn} ${style["btn-large"]}`}
                                    disabled={loader === true}
                                    data-testid="submit-login"
                                >
                                    {loader && <Loader divClassName={style.smallLoader} />}
                                    {t("changePassword:CONFIRM")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                
            </div>
        </>
    );
};

export default withTranslation("forgotPassword, changePassword, register")(ResetPasswordComponent);
