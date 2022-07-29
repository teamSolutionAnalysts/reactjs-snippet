// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";
import HomeService from "@Services/API/Home";

const CommonActions = {
    GetMenuItems: (language: string) => async (dispatch: Dispatch) => {
        const setMenuItems = (res: any) => {
            dispatch({
                payload: {
                    menuItems: res,
                },
                type: ActionTypes.Common.SetReducer,
            });
        };

        const setLanguageList = (res: any) => {
            dispatch({
                payload: {
                    languageItems: res,
                },
                type: ActionTypes.Common.SetReducer,
            });
        };

        const setFooterItems = (res: any) => {
            dispatch({
                payload: {
                    footerItems: res,
                },
                type: ActionTypes.Common.SetReducer,
            });
        };

        const setContactItems = (res: any) => {
            dispatch({
                payload: {
                    contactItems: res[0]?.body,
                },
                type: ActionTypes.Common.SetReducer,
            });
        };

        const setLogoImage = (res: any) => {
            dispatch({
                payload: {
                    logoImage: res[0]?.field_website_logo,
                },
                type: ActionTypes.Common.SetReducer,
            });
        };

        try {
            await Promise.all([
                HomeService.getMenuItems(language).then(setMenuItems),
                HomeService.getLanguageList().then(setLanguageList),
                HomeService.getFooterItems(language).then(setFooterItems),
                HomeService.getContactItems().then(setContactItems),
                HomeService.getSiteSettings().then(setLogoImage),
            ]);
        } catch {
            // console.error("Error", err);
        }
    },

    SaveCategoryItems: (categories: any) => ({
        type: ActionTypes.Common.SetCategoryItems,
        payload: categories,
    }),

    SetInitialPageLoad: (payload: any) => ({
        type: ActionTypes.Common.SetInitialPageLoad,
        payload,
    }),

    SetCheckoutData: (payload: any) => ({
        type: ActionTypes.Common.SetCheckoutData,
        payload,
    }),

    SetIsCustomerRegistrationExecuted: (payload: boolean) => ({
        type: ActionTypes.Common.SetIsCustomerRegistrationExecuted,
        payload,
    }),

    StartLoading: () => ({
        type: ActionTypes.Common.StartLoading,
    }),
    StopLoading: () => ({
        type: ActionTypes.Common.StopLoading,
    }),
    Reset: () => ({
        type: ActionTypes.Common.ResetReducer,
    }),
    setPlanID: (payload: any) => ({
        type: ActionTypes.Common.planID,
        payload,
    }),
};

export default CommonActions;
