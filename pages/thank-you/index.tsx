/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import HomeService from "@Services/API/Home";
import { ThankYou, Layout } from "@Components";
import { getCookieBasedOnProcess } from "@Utils/helper";
import { CMS_CONFIGURATION } from "@Utils/enums";

interface InitialProps {
    namespacesRequired: string[];
}

interface Props extends WithTranslation {
    metatag?: any;
    imageUuid?: any;
}

const ThankYouPage: NextPage<Props, InitialProps> = ({ metatag, i18n, imageUuid }) => {
    const [imageBanner, setImageBanner] = useState(null);
    const [metatagInfo, setMetatag] = useState<any>(metatag);

    const getImageInfo = async (uuid: string) => {
        await HomeService.getBannerImageDetails(uuid)
            .then((res: any) => {
                if (res?.length) {
                    setImageBanner(res[0]);
                }
            })
            .catch(() => {
            });
    };

    // useEffect gets called whenever page renders
    useEffect(() => {
        async function call() {
            if (!metatag) {
                await HomeService.getLandingPage(i18n.language, "/thank-you").then(async (res: any) => {
                    if (res) {
                        if (res?.length) {
                            setMetatag(res[0]?.metatag?.value);
                            const layoutElement = res[0]?.layout_builder__layout;
                            layoutElement.map(async (obj: any) => {
                                const element = obj?.section?.components;
                                switch (element[0].configuration.type) {
                                    case CMS_CONFIGURATION.IMAGE_BLOCK:
                                        await getImageInfo(element[0].configuration.uuid);
                                        break;
                                    default:
                                        break;
                                }
                                return 0;
                            });
                        }
                    }
                });
            } else if (imageUuid) {
                await getImageInfo(imageUuid);
            }
        }
        call();
    }, []);

    return (
        <>
            <Head>
                <title>{metatagInfo?.title} </title>
                <meta name="description" content={metatagInfo?.description} />
            </Head>
            {*/ Thnak you component rendering */}
            <Layout>
                <ThankYou imageBanner={imageBanner} />
            </Layout>
        </>
    );
};

// code for server side rendering
ThankYouPage.getInitialProps = async (ctx: any) => {
    let metatag: any = null;
    const language: string = getCookieBasedOnProcess("next-i18next", ctx?.req) || "en";
    const path = "/thank-you";
    const { query } = ctx;
    let queryURL = "";
    let imageUuid: any = "";

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
                    const layoutElement = res[0]?.layout_builder__layout;
                    layoutElement.map((obj: any) => {
                        const element = obj?.section?.components;
                        switch (element[0].configuration.type) {
                            case CMS_CONFIGURATION.IMAGE_BLOCK:
                                imageUuid = element[0]?.configuration?.uuid;
                                break;
                            default:
                                break;
                        }
                        return 0;
                    });
                }
            }
        })
        .catch(() => {});
    return {
        namespacesRequired: [""],
        metatag,
        imageUuid,
    };
};

export default withTranslation("")(ThankYouPage);
