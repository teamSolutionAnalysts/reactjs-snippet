/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Layout, ResetPasswordComponent } from "@Components";
import { withTranslation } from "@Server/i18n";
import { WithTranslation } from "next-i18next";
import AuthService from "@Services/API/Auth";
import { NotificationWithIcon } from "@Utils/helper";
import { useRouter } from "next/router";
import styles from "./resetPassword.module.scss";

const ResetPassword: NextPage<WithTranslation> = ({ i18n, t }: WithTranslation) => {
    const router = useRouter();
    const { token, username }: any = router.query;
    const [isLinkVerified, setVerifyLink] = useState<boolean>(true);

    // function to reset password check 
    const resetPassword = (data: any) => {
        AuthService.resetPassword(data)
            .then((res: any) => {
                if (res) {
                    NotificationWithIcon("success", res?.responseMessage);
                    router.push("/login");
                }
            })
            .catch((err: any) => {
                NotificationWithIcon("error", err?.data?.responseMessage || t("formikError:SOMETHING_WENT_WRONG"));
            });
    };

    // function to check weather the link is varified or not
    const getLinkVerified = () => {
        const reqData = {
            username,
            link: token,
        };
        AuthService.verifyLink(reqData)
            .then((res: any) => {
                if (res) {
                    setVerifyLink(true);
                    NotificationWithIcon("success", res?.responseMessage);
                }
            })
            .catch(() => {
                setVerifyLink(false);
            });
    };

    // useEffect get called whenever page renders
    useEffect(() => {
        if (token && username) {
            getLinkVerified();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>MTN :: Reset Password</title>
                <meta name="description" content="Reset Password Page" />
            </Head>
            {/* conditional rendering of the reset password component */}
            {isLinkVerified ? (
                <Layout>
                    <div className={i18n.language === "ar" ? `${styles["arabic-body"]}` : ""}>
                        <section className="full-banner login-banner">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={`${styles["forgot-block"]}`}>
                                            <ResetPasswordComponent resetPassword={resetPassword} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Layout>
            ) : (
                <div className="text-center">
                    <div>
                        <h1>The Link you are trying to access is expired</h1>
                    </div>
                </div>
            )}
        </>
    );
};

export default withTranslation("common")(ResetPassword);
