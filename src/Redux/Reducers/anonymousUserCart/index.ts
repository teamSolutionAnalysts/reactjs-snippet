// #region Local Imports
// #endregion Local Imports
import ActionTypes from "@Redux/ActionTypes";

const INITIAL_STATE: any = {
    shoppingCartId: null,
    relatedPartyId: null,
    showBadge: false,
    totalItems: 0,
    uuid: null,
};

const AnonymousUserCartReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.AnonymousUserCart.SetShoppingCartId:
            return {
                ...state,
                shoppingCartId: action?.payload?.shoppingCartId,
            };
        case ActionTypes.AnonymousUserCart.SetRelatedPartyId:
            return {
                ...state,
                relatedPartyId: action?.payload,
            };
        case ActionTypes.AnonymousUserCart.ResetReducer:
            return INITIAL_STATE;

        case ActionTypes.AnonymousUserCart.setCartBadge:
            return {
                ...state,
                showBadge: JSON.parse(JSON.stringify(action?.payload?.showBadge)),
                totalItems: action?.payload?.totalItems,
            };

        case ActionTypes.AnonymousUserCart.SetUUID:
            return {
                ...state,
                uuid: action?.payload,
            };

        default:
            return state;
    }
};

export default AnonymousUserCartReducer;
