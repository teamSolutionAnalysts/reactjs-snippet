import ActionTypes from "@Redux/ActionTypes";

const INITIAL_STATE: any = {
    cartData: {
        showCartCount: false,
    },
    menuItems: [],
    languageItems: [],
    logoImage: "",
    footerItems: [],
    contactItems: "",
    categoryItems: [],
    firstLoad: false,
    checkoutData: null,
    isCustomerRegistrationExecuted: false,
    isLoading: false,
    planID: null,
};

// type IMapPayload = IHomePage.Actions.IMapPayload;

const CommonReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Common.SetReducer:
            return {
                ...state,
                ...action.payload,
            };

        case ActionTypes.Common.ResetReducer:
            return INITIAL_STATE;

        case ActionTypes.Common.SetCategoryItems:
            return {
                ...state,
                categoryItems: action.payload,
            };

        case ActionTypes.Common.SetInitialPageLoad:
            return {
                ...state,
                firstLoad: action.payload.firstLoad,
            };

        case ActionTypes.Common.SetCheckoutData:
            return {
                ...state,
                checkoutData: action.payload,
            };

        case ActionTypes.Common.SetIsCustomerRegistrationExecuted:
            return {
                ...state,
                isCustomerRegistrationExecuted: action.payload,
            };
        case ActionTypes.Common.StartLoading:
            return {
                ...state,
                isLoading: true,
            };
        case ActionTypes.Common.planID:
            return {
                ...state,
                planID: action.payload,
            };
        case ActionTypes.Common.StopLoading:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default CommonReducer;
