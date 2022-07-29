import ActionTypes from "../../ActionTypes";

const INITIAL_STATE: any = {
    selectedMSISDN: null,
    basicPlan: null,
    serviceType: null,
    accountNumber: null,
    selectedAddonCategory: null,
    selectedServiceAccount: null,
    isBasicPlanExpire: null,
    giftingRecipientMSIDN: null,
    currentSubType: null,
    userPermissions: null,
    userPermissionAlias: null,
};

const DashboardReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Dashboard.setSelectMSISDNNumber:
            return {
                ...state,
                selectedMSISDN: action?.payload?.selectedMSISDN,
            };
        case ActionTypes.Dashboard.setSelectedBasicPlan:
            return {
                ...state,
                basicPlan: action?.payload?.selectedBasicplan,
            };
        case ActionTypes.Dashboard.selectedServiceType:
            return {
                ...state,
                serviceType: action?.payload?.selectedServiceType,
            };
        case ActionTypes.Dashboard.setUserAccountNumber:
            return {
                ...state,
                accountNumber: action?.payload?.accountNumber,
            };
        case ActionTypes.Dashboard.setSelectedAddonCategory:
            return {
                ...state,
                selectedAddonCategory: action?.payload?.selectedAddonCategory,
            };
        case ActionTypes.Dashboard.selectedServiceAccount:
            return {
                ...state,
                selectedServiceAccount: action?.payload?.selectedServiceAccount,
            };
        case ActionTypes.Dashboard.setIsBasicPlanExpire:
            return {
                ...state,
                isBasicPlanExpire: action?.payload?.isBasicPlanExpire,
            };
        case ActionTypes.Dashboard.giftingRecipientMSIDN:
            return {
                ...state,
                giftingRecipientMSIDN: action?.payload?.giftingRecipientMSIDN,
            };
        case ActionTypes.Dashboard.setSubType:
            return {
                ...state,
                currentSubType: action.payload.subType,
            };
        case ActionTypes.Dashboard.setUserPermissions:
            return {
                ...state,
                userPermissions: action?.payload?.userPermissions,
                userPermissionAlias: action?.payload?.userPermissionAlias,
            };
        case ActionTypes.Dashboard.ResetReducer:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default DashboardReducer;
