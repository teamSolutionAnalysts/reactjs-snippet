// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
// #endregion Global Imports

// #region Local Imports
import { withTranslation } from "@Server/i18n";
// #endregion Local Imports

// #region Interface Imports
import { IErrorPage } from "@Interfaces";
// #endregion Interface Imports

const Error: NextPage<IErrorPage.IProps, IErrorPage.InitialProps> = ({ t, statusCode, err }) => {
    return (
        <div>
            <>
                {t("common:Error")}
                {statusCode}
                {`Error : ${err}`}
            </>
        </div>
    );
};

Error.getInitialProps = async ({ res, err }) => {
    let statusCode;

    if (res) {
        ({ statusCode } = res);
    } else if (err) {
        ({ statusCode } = err);
    }

    return {
        namespacesRequired: ["common"],
        statusCode,
        err,
    };
};

export default withTranslation("common")(Error);
