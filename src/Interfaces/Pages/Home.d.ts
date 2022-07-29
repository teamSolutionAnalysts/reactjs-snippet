// #region Global Imports
import { WithTranslation } from "next-i18next";
// #endregion Global Imports

declare namespace IHomePage {
    export interface IProps extends WithTranslation {}

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {
        home?: {
            version: number;
        };
        image?: {
            url: string;
        };
        config: {
            minAge: string;
            otpResendTime: any;
            otpBlockAfterMaxAttempt: any;
            userPasswordUsernameLength: any;
            userPasswordsequenceLength: any;
            userPasswordUppercase: any;
            userPasswordLowercase: any;
            userPasswordLength: any;
            userPasswordDigits: any;
            userPasswordUnicode: any;
            userEmailLength: any;
            userMobileLength: any;
            emptyCart: any;
        };
        userConfig?: object;
        showBadge: any;
    }

    namespace Actions {
        export interface IMapPayload {}

        export interface IMapResponse {}

        export interface IGetApodPayload extends PlanetaryModel.GetApodPayload {
            params: {};
        }

        export interface IGetApodResponse extends PlanetaryModel.GetApodResponse {}
    }
}

export { IHomePage };
