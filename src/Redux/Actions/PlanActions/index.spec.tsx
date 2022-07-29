// #region Global Imports
import ActionTypes from "@Redux/ActionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import HomeActions from ".";
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Plan action tests", () => {
    test("setPlanName test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    planName: "PREPAID",
                },
                type: ActionTypes.Plan.SetPlanName,
            },
        ];

        store.dispatch(
            HomeActions.setPlanName({
                planName: "PREPAID",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });
    test("SetSimOperatorType test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    simOperatorType: "PREPAID",
                },
                type: ActionTypes.Plan.SetSimOperatorType,
            },
        ];

        store.dispatch(
            HomeActions.SetSimOperatorType({
                simOperatorType: "PREPAID",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetIccId test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    iccId: "9879879879",
                },
                type: ActionTypes.Plan.SetIccId,
            },
        ];

        store.dispatch(
            HomeActions.SetIccId({
                iccId: "9879879879",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetEffectDate test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    effectDate: "16-05-2021T00:00:00",
                },
                type: ActionTypes.Plan.SetEffectDate,
            },
        ];

        store.dispatch(
            HomeActions.SetEffectDate({
                effectDate: "16-05-2021T00:00:00",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetProductId test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    productId: "1005",
                },
                type: ActionTypes.Plan.SetProductId,
            },
        ];

        store.dispatch(
            HomeActions.SetProductId({
                productId: "1005",
            })
        );

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetPaymentMode test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    paymentMode: "postpaid",
                },
                type: ActionTypes.Plan.SetPaymentMode,
            },
        ];

        store.dispatch(
            HomeActions.SetPaymentMode({
                paymentMode: "postpaid",
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
                type: ActionTypes.Plan.ResetReducer,
            },
        ];

        store.dispatch(HomeActions.Reset());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
