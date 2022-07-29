// #region Local Imports
// #endregion Local Imports
import ActionTypes from "@Redux/ActionTypes";

const INITIAL_STATE: any = {
    planName: "",
    iccId: "",
    simOperatorType: "",
    effectDate: "",
    productId: "",
    paymentMode: "",
    isBundle: "",
};

const PlanReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Plan.SetPlanName:
            return {
                ...state,
                planName: action?.payload?.planName,
            };

        case ActionTypes.Plan.SetIccId:
            return {
                ...state,
                iccId: action?.payload?.iccId,
            };

        case ActionTypes.Plan.SetSimOperatorType:
            return {
                ...state,
                simOperatorType: action?.payload?.simOperatorType,
            };

        case ActionTypes.Plan.SetEffectDate:
            return {
                ...state,
                effectDate: action?.payload?.effectDate,
            };

        case ActionTypes.Plan.SetProductId:
            return {
                ...state,
                productId: action?.payload?.productId,
            };

        case ActionTypes.Plan.SetPaymentMode:
            return {
                ...state,
                paymentMode: action?.payload?.paymentMode,
            };

        case ActionTypes.Plan.SetBundleFlag:
            return {
                ...state,
                isBundle: action?.payload?.isBundle,
            };

        case ActionTypes.Plan.ClearCart:
            return {
                ...state,
                planName: "",
                effectDate: "",
            };

        case ActionTypes.Plan.ResetReducer:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default PlanReducer;
