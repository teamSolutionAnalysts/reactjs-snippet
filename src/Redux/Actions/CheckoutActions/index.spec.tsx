// #region Global Imports
import ActionTypes from "@Redux/ActionTypes";
import { checkoutScreenData } from "@Utils/dummyData";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import CheckoutActions from ".";
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Checkout action tests", () => {
    test("CheckoutMainAccordionSelectedItem test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    selectedMainAccordion: ["basicDetails"],
                },
                type: ActionTypes.Checkout.CheckoutMainAccordionSelectedItem,
            },
        ];

        store.dispatch(
            CheckoutActions.CheckoutMainAccordionSelectedItem({
                selectedMainAccordion: ["basicDetails"],
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("CheckoutRegisterAccordionSelectedItem test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    selectedRegisterAccordion: ["basicDetails"],
                },
                type: ActionTypes.Checkout.CheckoutRegisterAccordionSelectedItem,
            },
        ];

        store.dispatch(
            CheckoutActions.CheckoutRegisterAccordionSelectedItem({
                selectedRegisterAccordion: ["basicDetails"],
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("CheckoutRegister test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    checkoutRegisterAccordionData: checkoutScreenData.checkoutRegisterAccordionData,
                },
                type: ActionTypes.Checkout.SetCheckoutRegister,
            },
        ];

        store.dispatch(
            CheckoutActions.CheckoutRegister({
                checkoutRegisterAccordionData: checkoutScreenData.checkoutRegisterAccordionData,
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
    test("CheckoutMainAccordion test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    mainAccordion: checkoutScreenData.mainAccordion,
                },
                type: ActionTypes.Checkout.SetMainAccordion,
            },
        ];

        store.dispatch(
            CheckoutActions.CheckoutMainAccordion({
                mainAccordion: checkoutScreenData.mainAccordion,
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetInventoryNumber test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    inventoryNumber: "9565845658245",
                },
                type: ActionTypes.Checkout.SetInventoryNumber,
            },
        ];

        store.dispatch(
            CheckoutActions.SetInventoryNumber({
                inventoryNumber: "9565845658245",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
    test("SetInvoiceNumber test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    invoiceNumber: "9565845658245",
                },
                type: ActionTypes.Checkout.SetInvoiceNumber,
            },
        ];

        store.dispatch(
            CheckoutActions.SetInvoiceNumber({
                invoiceNumber: "9565845658245",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetbaNumber test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    baNumber: "9565845658245",
                },
                type: ActionTypes.Checkout.SetbaNumber,
            },
        ];

        store.dispatch(
            CheckoutActions.SetbaNumber({
                baNumber: "9565845658245",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetsaNumber test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    saNumber: "9565845658245",
                },
                type: ActionTypes.Checkout.SetsaNumber,
            },
        ];

        store.dispatch(
            CheckoutActions.SetsaNumber({
                saNumber: "9565845658245",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("Reset test", async () => {
        const store = mockStore({
            home: {
                version: 1,
            },
        });

        const expectedActions = [
            {
                type: ActionTypes.Checkout.ResetReducer,
            },
        ];

        store.dispatch(CheckoutActions.Reset());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
