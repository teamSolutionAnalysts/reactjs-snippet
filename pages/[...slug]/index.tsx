/* eslint-disable react/no-danger */
import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { WithTranslation } from "next-i18next";
import _ from "lodash";
import Layout from "@Components/Layout";
import CMSPageService from "@Services/API/CMSPage";
import { withTranslation } from "@Server/i18n";
import { useDispatch } from "react-redux";
import BreadcrumbAction from "@Redux/Actions/BreadcrumbActions";
import { Breadcrumb } from "@Components/Common";
import RoutPath from "@Utils/routes";

import style from "./slug.module.scss";

interface InitialProps extends WithTranslation {
    page: { [key: string]: any };
}

interface Props {
    page: { [key: string]: any };
    namespacesRequired: string[];
}

const SlugPage: NextPage<InitialProps, Props> = ({ page }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    React.useEffect(() => {
        const newBreadcrumb = { title: page?.title, href: `/${router.asPath}`, active: true };
        dispatch(BreadcrumbAction.SaveBreadCrumbsData(newBreadcrumb));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!page?.status) {
        router.push(RoutPath.RootRoute);
        return null;
    }

    return (
        <>
            <Head>
                <title>{page?.title}</title>
                <meta name="description" content="MTN::Slug" />
            </Head>
            <Layout>
                <>
                    <section className={style.titleSection}>
                        <div
                            className={style.textContainer}
                            style={
                                page.image
                                    ? {
                                          background: `url(${page?.image}) center center no-repeat`,
                                          backgroundSize: "100%",
                                      }
                                    : {}
                            }
                        >
                            <h1 style={page?.language === "ar" ? { textAlign: "right" } : {}}>{page?.title}</h1>
                        </div>
                    </section>
                    <Breadcrumb />
                    <div className={style.container} style={page?.language === "ar" ? { textAlign: "right" } : {}}>
                        {page?.content?.map(([body]: any) => (
                            <div dangerouslySetInnerHTML={{ __html: body?.processed }} />
                        ))}
                    </div>
                </>
            </Layout>
        </>
    );
};

SlugPage.getInitialProps = async (ctx: any) => {
    let page: object = {};
    const content: any = [];
    const { asPath: path } = ctx;
    const asPath = path?.split("?")[0];
    const { query } = ctx;
    let queryURL = "";
    Object.keys(query)?.forEach(item => {
        if (item !== "slug") {
            queryURL = `${queryURL}${queryURL?.length > 0 ? "&" : ""}${item}=${query[item]}`;
        }
    });
    const language = ctx?.req?.i18n?.language || "en";
    if (asPath !== undefined) {
        try {
            const [pageData]: any = await CMSPageService.getPageData(asPath, language, queryURL);
            pageData?.layout_builder__layout?.forEach((item: any) => {
                const { components } = item?.section;
                if (components) {
                    components?.forEach((component: any) => {
                        const { configuration } = component;
                        if (configuration) {
                            const { id } = configuration;
                            const propertyName: string = _.last(id?.split(":")) || "";
                            const dataToDisplay = _.get(pageData, propertyName);
                            if (dataToDisplay) {
                                content.push(dataToDisplay);
                            }
                        }
                    });
                }
            });
            page = {
                status: pageData?.status[0]?.value || "",
                content,
                title: pageData?.title[0]?.value || "",
                image: pageData?.field_page_header_image[0]?.url || null,
                language,
            };
        } catch (error) {
            // console.log("We hit a 404 route");
        }
    }

    return {
        page,
        namespacesRequired: [""],
    };
};

export default withTranslation(["common"])(SlugPage);
