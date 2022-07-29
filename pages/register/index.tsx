import React from "react";
import Head from "next/head";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next";
import { WithTranslation } from "next-i18next";
import { Layout, Registration } from "@Components";
import { LOCAL_HOST_KEY } from "@Utils/enums";
import HomeService from "@Services/API/Home";
import { getCookieBasedOnProcess } from "@Utils/helper";
import RoutPath from "@Utils/routes";
interface InitialProps {
    namespacesRequired: string[];
}

interface Props extends WithTranslation {
    metatag: any;
    pageTitle: any;
}

const Register: NextPage<Props, InitialProps> = ({ metatag, pageTitle }: Props) => {
    const router = useRouter();
    const { AUTH_TOKEN } = LOCAL_HOST_KEY;
    const token = Cookie.get(AUTH_TOKEN);

    if (token) {
        router.push(RoutPath.RootRoute);
        return <></>;
    }

    return (
        <>
            <Head>
                <title>{metatag?.title} </title>
                <meta name="description" content={metatag?.description} />
            </Head>
            {/* registration component loading */}
            <Layout>
                <Registration pageTitle={pageTitle} />
            </Layout>
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// code for server side rendering
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    let metatag: any = null;
    const language: string = getCookieBasedOnProcess("next-i18next", ctx?.req) || "en";
    const path = "/registration";
    let pageTitle: any = null;
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
                    pageTitle = res[0]?.title[0]?.value;
                }
            }
        })
        .catch(() => {
            pageTitle = "";
            metatag = "";
        });
    return {
        props: {
            namespacesRequired: [""],
            metatag,
            pageTitle,
        },
    };
}

export default Register;
