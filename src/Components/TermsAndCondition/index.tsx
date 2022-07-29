/* eslint-disable react-hooks/exhaustive-deps */
// #region Global Imports
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Formik } from "formik";
import { WithTranslation } from "next-i18next";
import { Button } from "antd";
import { withTranslation } from "@Server/i18n";
import { STLCol, STLRow, CustomCheckbox, Loader } from "@Components/Common";
import { CheckOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { PLAN_DETAILS } from "@Utils/enums";
import { NotificationWithIcon } from "@Utils/helper";
import CheckoutService from "@Services/API/Checkout";
import CheckoutActions from "@Redux/Actions/CheckoutActions";
import CartService from "@Services/API/Cart";
import styles from "./TermsAndCondition.module.scss";

interface TermsAndConditionProps extends WithTranslation {
    successMainDetailsHandle?: any;
    termsAndConditionsData?: any;
    getUserDetailsForBillingHandler?: any;
}

const TermsAndCondition: NextPage<TermsAndConditionProps> = ({
    i18n,
    successMainDetailsHandle,
    t,
    termsAndConditionsData,
}: any) => {
    const dispatch = useDispatch();
    const planState = useSelector((state: any) => state.plan);
    const cartState = useSelector((state: any) => state.cart);
    const { relatedPartyId, shoppingCartId } = cartState;
    const { paymentMode } = planState;
    const [loader, setLoader] = useState(false);
    const [termsCheck, setTermsCheck] = useState<boolean | null>(null);
    const commonState = useSelector((state: any) => state.common);
    const { checkoutData } = commonState;

    useEffect(() => {
        if (checkoutData) {
            setTermsCheck(checkoutData?.termsAndCondition || false);
        } else {
            setTermsCheck(false);
        }
    }, []);

    const callAcceptTNC = async () => {
        setLoader(true);
        try {
            await CartService.acceptTNC({ termsAndCondition: true });
            return true;
        } catch (error) {
            const err: any = error;
            NotificationWithIcon("error", err?.data?.responseMessage);
            return false;
        }
    };

    if (termsCheck === null) return null;

    return (
        <div className={i18n.language === "ar" ? `${styles["arabic-body"]}` : ""}>
            {typeof termsAndConditionsData?.body !== "undefined" ? (
                <div className={styles.termsAndConditionContainer}>
                    <div
                        data-testid="termsConditionData"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: termsAndConditionsData?.body }}
                    />
                    <Formik
                        initialValues={{
                            termsCheck,
                        }}
                        enableReinitialize
                        onSubmit={() => {
                            callAcceptTNC()
                                .then(() => {
                                    if (paymentMode === PLAN_DETAILS.Prepaid) {
                                        const data = {
                                            relatedPartyId,
                                            shoppingCartId,
                                        };
                                        CheckoutService.billingAccountPrepaidUpdate(data)
                                            .then((res: any) => {
                                                dispatch(
                                                    CheckoutActions.SetbaNumber({
                                                        baNumber: res?.result?.baNumber,
                                                    })
                                                );
                                                dispatch(
                                                    CheckoutActions.SetsaNumber({
                                                        saNumber: res?.data?.saNumber,
                                                    })
                                                );
                                                successMainDetailsHandle(["orderSummery"], "termsAndConditions");
                                                // getUserDetailsForBillingHandler().then(() => {
                                                //     setLoader(false);
                                                // });
                                            })
                                            .catch((err: any) => {
                                                setLoader(false);
                                                NotificationWithIcon(
                                                    "error",
                                                    err?.data?.error || "Something went wrong"
                                                );
                                            });
                                    } else {
                                        successMainDetailsHandle(["orderSummery"], "termsAndConditions");
                                    }
                                })
                                .catch(err => {
                                    console.log("Error", err);
                                });
                        }}
                        render={({ values, handleSubmit, handleChange, setFieldValue }) => {
                            return (
                                <>
                                    <STLRow gutter={[16, 16]}>
                                        <STLCol lg={12} md={12}>
                                            <div className={styles.checkboxContainer}>
                                                <CustomCheckbox
                                                    checked={values?.termsCheck}
                                                    icon={
                                                        <div className={styles.checkboxIconContainer}>
                                                            <CheckOutlined color="#fff" />
                                                        </div>
                                                    }
                                                    borderColor="#8c8c8c80"
                                                    containerStyle={{ marginBottom: 0 }}
                                                    borderRadius={2}
                                                    size={20}
                                                    setFieldValue={setFieldValue}
                                                    filedName="termsCheck"
                                                    onChange={handleChange}
                                                />

                                                <span className={styles.checkboxLabelText}>
                                                    {termsAndConditionsData?.nothing}
                                                </span>
                                            </div>
                                        </STLCol>
                                    </STLRow>
                                    <STLRow gutter={[16, 16]}>
                                        <STLCol span={24} className={styles.buttonColEnd}>
                                            <Button
                                                type="primary"
                                                shape="round"
                                                className={`${styles.customBtn} ${
                                                    !values?.termsCheck || loader
                                                        ? styles.disableButton
                                                        : styles.yellowBtn
                                                }`}
                                                disabled={!values?.termsCheck || loader}
                                                onClick={(e: any) => handleSubmit(e)}
                                                data-testid="termsButton"
                                            >
                                                {loader && <Loader divClassName={styles.smallLoader} />}
                                                {t("common:SAVE")}
                                            </Button>
                                        </STLCol>
                                    </STLRow>
                                </>
                            );
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default withTranslation(["common", "termsAndConditions"])(TermsAndCondition);
