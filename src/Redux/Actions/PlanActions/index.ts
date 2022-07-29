import ActionTypes from "@Redux/ActionTypes";

const PlanActions = {
    setPlanName: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetPlanName,
    }),

    SetIccId: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetIccId,
    }),

    SetSimOperatorType: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetSimOperatorType,
    }),

    SetEffectDate: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetEffectDate,
    }),

    SetProductId: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetProductId,
    }),

    SetBundleFlag: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetBundleFlag,
    }),

    SetPaymentMode: (payload: {}) => ({
        payload,
        type: ActionTypes.Plan.SetPaymentMode,
    }),

    ClearCart: () => ({
        type: ActionTypes.Plan.ClearCart,
    }),

    Reset: () => ({
        type: ActionTypes.Plan.ResetReducer,
    }),
};

export default PlanActions;
