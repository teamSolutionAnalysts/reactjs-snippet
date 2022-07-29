// #region Global Imports
import NextI18Next from "next-i18next";
// #endregion Global Imports

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: "ar",
    otherLanguages: ["en", "es", "tr"],
    detection: {
        lookupCookie: "next-i18next",
        order: ["cookie", "querystring", "localStorage", "path", "subdomain"],
        caches: ["cookie"],
    },
});

export const { appWithTranslation, withTranslation } = NextI18NextInstance;

export default NextI18NextInstance;
