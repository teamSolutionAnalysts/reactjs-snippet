// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";
import CartReducer from ".";
// #endregion Local Imports

describe("Cart reducer", () => {
    it("should return the initial state", () => {
        expect(CartReducer(undefined, {})).toEqual({
            shoppingCartId: null,
            cartLineItemId: null,
            shoppingCartProductId: null,
            reserveInventoryResponse: null,
            relatedPartyId: null,
            showBadge: false,
            totalItems: 0,
        });
    });

    it("should handle SetShoppingCartId", () => {
        expect(
            CartReducer(
                {},
                {
                    type: ActionTypes.Cart.SetShoppingCartId,
                    payload: {
                        shoppingCartId: "683787hi3",
                    },
                }
            )
        ).toEqual({
            shoppingCartId: "683787hi3",
        });
    });

    it("should handle SetCartLineItemId", () => {
        expect(
            CartReducer(
                {},
                {
                    type: ActionTypes.Cart.SetCartLineItemId,
                    payload: {
                        cartLineItemId: "61",
                    },
                }
            )
        ).toEqual({
            cartLineItemId: "61",
        });
    });

    it("should handle SetReserveInventoryRes", () => {
        expect(
            CartReducer(
                {},
                {
                    type: ActionTypes.Cart.SetReserveInventoryRes,
                    payload: {
                        reserveInventoryResponse: {
                            invoiceNumber: "INV100001430",
                            subOrderIdNumber: "SUBORD1005480",
                            productCode: "NEW_YALLA_PREPAID",
                            serviceInstanceNumber: "SIA00000834",
                            cartLineItemId: "TENXKS1",
                        },
                    },
                }
            )
        ).toEqual({
            reserveInventoryResponse: {
                invoiceNumber: "INV100001430",
                subOrderIdNumber: "SUBORD1005480",
                productCode: "NEW_YALLA_PREPAID",
                serviceInstanceNumber: "SIA00000834",
                cartLineItemId: "TENXKS1",
            },
        });
    });

    it("should handle SetShoppingCartProductId", () => {
        expect(
            CartReducer(
                {},
                {
                    type: ActionTypes.Cart.SetShoppingCartProductId,
                    payload: {
                        shoppingCartProductId: "683787hi3",
                    },
                }
            )
        ).toEqual({
            shoppingCartProductId: "683787hi3",
        });
    });

    it("should handle SetRelatedPartyId", () => {
        expect(
            CartReducer(
                {},
                {
                    type: ActionTypes.Cart.SetRelatedPartyId,
                    payload: {
                        relatedPartyId: "683787hi3",
                    },
                }
            )
        ).toEqual({
            relatedPartyId: {
                relatedPartyId: "683787hi3",
            },
        });
    });

    it("should handle ResetReducer", () => {
        expect(
            CartReducer(undefined, {
                type: ActionTypes.Cart.ResetReducer,
            })
        ).toEqual({
            shoppingCartId: null,
            cartLineItemId: null,
            shoppingCartProductId: null,
            reserveInventoryResponse: null,
            relatedPartyId: null,
            showBadge: false,
            totalItems: 0,
        });
    });
});
