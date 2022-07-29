// #region Global Imports
import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { store } from "@Redux";

// #endregion Global Imports

class WebAppDocument extends Document {
    static async getInitialProps(ctx: any) {
        // static async getInitialProps(ctx: DocumentContext | any) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps: any = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                defaultLanguage: ctx?.req?.i18n?.language as any,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        const { defaultLanguage } = this.props as any;
        const { logoImage } = store.getState().common;

        return (
            <Html dir={defaultLanguage === "ar" ? "rtl" : "ltr"}>
                <Head>
                    {/* <link rel="icon" href="static/images/favicon.ico" /> */}
                    <link rel="icon" href={logoImage} />
                </Head>{" "}
                <body className={defaultLanguage === "ar" ? "arabic-body" : ""}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;
