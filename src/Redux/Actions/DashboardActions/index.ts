import ActionTypes from "@Redux/ActionTypes";

const DashboardActions = {
    setSelectMSISDNNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setSelectMSISDNNumber,
    }),
    setSelectedBasicPlan: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setSelectedBasicPlan,
    }),
    setSelectedServiceType: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.selectedServiceType,
    }),
    setUserAccountNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setUserAccountNumber,
    }),
    setSelectedAddonCategory: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setSelectedAddonCategory,
    }),
    setSelectedServiceAccount: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.selectedServiceAccount,
    }),
    setIsBasicPlanExpire: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setIsBasicPlanExpire,
    }),
    setGiftRecipientMSISDN: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.giftingRecipientMSIDN,
    }),
    setSubType: (payload: { subType: string | null }) => ({
        payload,
        type: ActionTypes.Dashboard.setSubType,
    }),
    setUserPermissions: (payload: {}) => ({
        payload,
        type: ActionTypes.Dashboard.setUserPermissions,
    }),
    Reset: () => ({
        type: ActionTypes.Dashboard.ResetReducer,
    }),
};

export default DashboardActions;
