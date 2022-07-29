// #region Local Imports
// #endregion Local Imports
import ActionTypes from "@Redux/ActionTypes";

const INITIAL_STATE: any = {
    shoppingCartId: null,
    cartLineItemId: null,
    shoppingCartProductId: null,
    reserveInventoryResponse: null,
    relatedPartyId: null,
    showBadge: false,
    totalItems: 0,
    totalCartAmtForChangePlan: 0,
    checkSubscriptionLimitExceed: false,
    isAmountOverDueForCustomer: false,
    isSpendingLimitExceeded: false,
    isRemainingSpendingLimitFound: false,
    changeBasePlanStatus: false,
    UnSubAddOnList: null,
};

const CartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Cart.SetShoppingCartId:
            return {
                ...state,
                shoppingCartId: action?.payload?.shoppingCartId,
            };
        case ActionTypes.Cart.SetCartLineItemId:
            return {
                ...state,
                cartLineItemId: action?.payload?.cartLineItemId,
            };
        case ActionTypes.Cart.SetShoppingCartProductId:
            return {
                ...state,
                shoppingCartProductId: action?.payload?.shoppingCartProductId,
            };
        case ActionTypes.Cart.SetReserveInventoryRes:
            return {
                ...state,
                reserveInventoryResponse: action?.payload?.reserveInventoryResponse,
            };
        case ActionTypes.Cart.SetRelatedPartyId:
            return {
                ...state,
                relatedPartyId: action?.payload,
            };
        case ActionTypes.Cart.SetSubscriptionLimit:
            return {
                ...state,
                checkSubscriptionLimitExceed: action?.payload?.checkSubscriptionLimitExceed,
            };
        case ActionTypes.Cart.SetAmountOverDueForCustome:
            return {
                ...state,
                isAmountOverDueForCustomer: action?.payload?.isAmountOverDueForCustomer,
            };
        case ActionTypes.Cart.SetSpendingLimit:
            return {
                ...state,
                isSpendingLimitExceeded: action?.payload?.isSpendingLimitExceeded,
            };
        case ActionTypes.Cart.ResetReducer:
            return INITIAL_STATE;

        case ActionTypes.Cart.setCartBadge:
            return {
                ...state,
                showBadge: JSON.parse(JSON.stringify(action?.payload?.showBadge)),
                totalItems: action?.payload?.totalItems,
            };

        case ActionTypes.Cart.SetIsRemainingSpendingLimitFound:
            return {
                ...state,
                isRemainingSpendingLimitFound: action.payload,
            };
        case ActionTypes.Cart.ChangeBasePlan:
            return {
                ...state,
                changeBasePlanStatus: action.payload,
            };
        case ActionTypes.Cart.SetUnSubAddOnListForChangePlan:
            return {
                ...state,
                UnSubAddOnList: action.payload,
            };
        case ActionTypes.Cart.SetCartAmountForChangePlan:
            return {
                ...state,
                totalCartAmtForChangePlan: action.payload?.split(" SDG")[0] || 0,
            };
        default:
            return state;
    }
};

export default CartReducer;
