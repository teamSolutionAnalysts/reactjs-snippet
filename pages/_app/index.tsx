// #region Global Imports
import * as React from "react";
import App, { AppInitialProps, AppContext } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
// #endregion Global Imports

// #region Local Imports
import theme from "@Definitions/Styled/theme";
import { appWithTranslation } from "@Server/i18n";
import { AppWithStore } from "@Interfaces";
import { store, persistor } from "@Redux";
import { PersistGate } from "redux-persist/integration/react";

// import "@Static/css/main.scss";
// import "@Static/css/style.css";
import "@Static/css/custom.css";
import "@Static/css/responsive.css";
import "antd/dist/antd.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@Static/css/styles.scss";

class WebApp extends App<AppWithStore> {
    static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        const { logoImage } = store.getState().common;

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Head>
                        {/* <link rel="icon" href="static/images/favicon.ico" /> */}
                        <link rel="icon" href={logoImage} />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        );
    }
}

export default appWithTranslation(WebApp);
