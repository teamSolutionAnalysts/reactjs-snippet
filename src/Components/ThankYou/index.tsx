import React, { useEffect } from "react";
import { withTranslation } from "@Server/i18n";
import { WithTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CheckoutActions from "@Redux/Actions/CheckoutActions";
import { ConstantsFreeze } from "@Utils/enums";
import { localStorageRemoveItem } from "@Utils/helper";
import style from "./thankYou.module.scss";

interface Props extends WithTranslation {
    imageBanner?: any;
}

const ThankYou: NextPage<Props> = ({ i18n, t, imageBanner }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const orderId = router?.query?.orderId || "-";
    const { paymentId } = router?.query;

    // useEffect will get called every time page renders
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(CheckoutActions.Reset());

        const docType = ConstantsFreeze.UPLOAD_DOCUMENT_TYPES;
        docType.map((item: string) => {
            localStorageRemoveItem(item);
            return 0;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={i18n.language === "ar" ? `${style["arabic-body"]}` : ""}>
                <section className={style["thank-banner"]}>
                    <img src={imageBanner?.uri} alt="home-banner" className="w-100" height="685px" />
                    {/* thank you page HTML code */}
                    <div className={style["banner-txt"]}>
                        <h2>{t("thankyou:ThankYou")}</h2>
                        <label>{t("thankyou:ForYourOrder")}</label>
                        <div className={style.card}>
                            <p className={style.orderNumber}>
                                {t("thankyou:YourOrderNumber")} <a>{orderId} </a>
                            </p>
                            {paymentId && (
                                <p className={style.paymentID}>
                                    {t("thankyou:PaymentID")} <a>{paymentId || "-"} </a>
                                </p>
                            )}
                        </div>
                        <p>{imageBanner?.info}</p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default withTranslation("thankyou")(ThankYou);
