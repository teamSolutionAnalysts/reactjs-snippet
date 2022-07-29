import ActionTypes from "@Redux/ActionTypes";

const AnonymousUserCartActions = {
    SetShoppingCartId: (payload: {}) => ({
        payload,
        type: ActionTypes.AnonymousUserCart.SetShoppingCartId,
    }),
    SetRelatedPartyId: (payload: any) => ({
        payload,
        type: ActionTypes.AnonymousUserCart.SetRelatedPartyId,
    }),
    Reset: () => ({
        type: ActionTypes.AnonymousUserCart.ResetReducer,
    }),
    setCartBadge: (payload: {}) => ({
        payload,
        type: ActionTypes.AnonymousUserCart.setCartBadge,
    }),
    SetUUID: (uuid: string) => ({
        payload: uuid,
        type: ActionTypes.AnonymousUserCart.SetUUID,
    }),
};

export default AnonymousUserCartActions;
