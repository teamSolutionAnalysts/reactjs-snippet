// #region Global Imports
import ActionTypes from "@Redux/ActionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import CartActions from ".";
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Cart action tests", () => {
    test("SetShoppingCartId test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    shoppingCartId: "gr878rt45r",
                },
                type: ActionTypes.Cart.SetShoppingCartId,
            },
        ];

        store.dispatch(
            CartActions.SetShoppingCartId({
                shoppingCartId: "gr878rt45r",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetCartLineItemId test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    cartLineItemId: "61",
                },
                type: ActionTypes.Cart.SetCartLineItemId,
            },
        ];

        store.dispatch(
            CartActions.SetCartLineItemId({
                cartLineItemId: "61",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetReserveInventoryRes test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    reserveInventoryResponse: {
                        invoiceNumber: "INV100001430",
                        subOrderIdNumber: "SUBORD1005480",
                        productCode: "NEW_YALLA_PREPAID",
                        serviceInstanceNumber: "SIA00000834",
                        cartLineItemId: "TENXKS1",
                    },
                },
                type: ActionTypes.Cart.SetReserveInventoryRes,
            },
        ];

        store.dispatch(
            CartActions.SetReserveInventoryRes({
                reserveInventoryResponse: {
                    invoiceNumber: "INV100001430",
                    subOrderIdNumber: "SUBORD1005480",
                    productCode: "NEW_YALLA_PREPAID",
                    serviceInstanceNumber: "SIA00000834",
                    cartLineItemId: "TENXKS1",
                },
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("Reset test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                type: ActionTypes.Cart.ResetReducer,
            },
        ];

        store.dispatch(CartActions.Reset());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
