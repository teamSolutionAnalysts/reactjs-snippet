import ActionTypes from "@Redux/ActionTypes";

const CartActions = {
    SetShoppingCartId: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetShoppingCartId,
    }),
    SetSubscriptionLimit: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetSubscriptionLimit,
    }),
    SetAmountOverDueForCustome: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetAmountOverDueForCustome,
    }),
    SetSpendingLimit: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetSpendingLimit,
    }),
    SetCartLineItemId: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetCartLineItemId,
    }),
    SetShoppingCartProductId: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetShoppingCartProductId,
    }),
    SetReserveInventoryRes: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.SetReserveInventoryRes,
    }),
    SetRelatedPartyId: (payload: any) => ({
        payload,
        type: ActionTypes.Cart.SetRelatedPartyId,
    }),
    Reset: () => ({
        type: ActionTypes.Cart.ResetReducer,
    }),
    setCartBadge: (payload: {}) => ({
        payload,
        type: ActionTypes.Cart.setCartBadge,
    }),
    SetIsRemainingSpendingLimitFound: (payload: boolean) => ({
        payload,
        type: ActionTypes.Cart.SetIsRemainingSpendingLimitFound,
    }),
    SetCartPlanChangeStatus: (payload: boolean) => ({
        payload,
        type: ActionTypes.Cart.ChangeBasePlan,
    }),
    SetUnSubAddOnListForChangePlan: (payload: any) => ({
        payload,
        type: ActionTypes.Cart.SetUnSubAddOnListForChangePlan,
    }),
    SetCartAmtForChangePlan: (payload: number | string) => ({
        payload,
        type: ActionTypes.Cart.SetCartAmountForChangePlan,
    }),
};

export default CartActions;
