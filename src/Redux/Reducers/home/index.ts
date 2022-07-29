// #region Local Imports
// #endregion Local Imports
import ActionTypes from "@Redux/ActionTypes";

// #region Interface Imports
import { IHomePage } from "@Interfaces";
// #endregion Interface Imports

const INITIAL_STATE: any = {
    home: {
        version: 1,
    },
    image: {
        url: "",
    },
    config: {
        minAge: "",
        otpResendTime: "",
        otpBlockAfterMaxAttempt: "",
        userPasswordLength: "",
        userEmailLength: "",
        userMobileLength: "",
        emptyCart: "",
    },
    userConfig: {
        userFirstName: "",
        userLastName: "",
    },
    categories: null,
    subCategories: null,
    usermsisdnconfig: null,
};

type IMapPayload = IHomePage.Actions.IMapPayload;

const HomeReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Home.SetReducer:
            return {
                ...state,
                ...action.payload,
            };

        case ActionTypes.Home.setConfiguration:
            // console.log({ ...state, config: action?.payload?.config });
            return {
                ...state,
                config: JSON.parse(JSON.stringify(action?.payload?.config)),
            };

        case ActionTypes.Home.setUserConfiguration:
            return {
                ...state,
                userConfig: JSON.parse(JSON.stringify(action?.payload?.userConfig)),
            };

        case ActionTypes.Home.clearUserConfiguration:
            return {
                ...state,
                userConfig: {
                    userFirstName: "",
                    userLastName: "",
                },
            };
        case ActionTypes.Home.setTicketCategories:
            return {
                ...state,
                categories: action?.payload?.categories,
            };

        case ActionTypes.Home.setTicketSubCategories:
            return {
                ...state,
                subCategories: action?.payload?.subCategories,
            };

        case ActionTypes.Home.setUserMSISDNConfig:
            return {
                ...state,
                usermsisdnconfig: action?.payload?.usermsisdnconfig,
            };

        case ActionTypes.Home.ResetReducer:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default HomeReducer;
