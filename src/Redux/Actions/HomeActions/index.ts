// #region Global Imports
import { Dispatch } from "redux";
// #endregion Global Imports

// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";

const HomeActions = {
    Map: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.SetReducer,
    }),

    Reset: () => ({
        type: ActionTypes.Home.ResetReducer,
    }),

    SetConfiguration: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.setConfiguration,
    }),

    SetUserMSISDNConfig: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.setUserMSISDNConfig,
    }),

    SetUserConfiguration: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.setUserConfiguration,
    }),

    ClearUserConfiguration: () => ({
        type: ActionTypes.Home.clearUserConfiguration,
    }),

    SetTicketCategories: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.setTicketCategories,
    }),

    SetTicketSubCategories: (payload: {}) => ({
        payload,
        type: ActionTypes.Home.setTicketSubCategories,
    }),

    GetApod: () => async (dispatch: Dispatch) => {
        const result = null;

        dispatch({
            payload: {
                image: result,
            },
            type: ActionTypes.Home.SetReducer,
        });
    },
};

export default HomeActions;
