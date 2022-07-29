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

describe("Home action tests", () => {
    test("Map test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: {
                    version: 2,
                },
                type: ActionTypes.Home.SetReducer,
            },
        ];

        store.dispatch(
            HomeActions.Map({
                version: 2,
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
                type: ActionTypes.Home.ResetReducer,
            },
        ];

        store.dispatch(HomeActions.Reset());

        expect(store.getActions()).toEqual(expectedActions);
    });
    test("SetConfiguration ", async () => {
        const configureData = {
            minAge: "21",
            otpBlockAfterMaxAttempt: {
                configurableKey: "user.otp.blockAfterMaxAttempt",
                configurableValue: "1",
                configurableUnit: "min",
            },
            otpResendTime: {
                configurableKey: "user.otp.resendTime",
                configurableValue: "1",
                configurableUnit: "min",
            },
        };
        const store = mockStore();

        const expectedActions = [
            {
                payload: { config: configureData },
                type: ActionTypes.Home.setConfiguration,
            },
        ];

        store.dispatch(HomeActions.SetConfiguration({ config: configureData }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("SetUserConfiguration ", async () => {
        const configData = {
            userFirstName: "mtnFirstName",
            userLastName: "mtnLastName",
        };
        const store = mockStore();

        const expectedActions = [
            {
                payload: { userConfig: configData },
                type: ActionTypes.Home.setUserConfiguration,
            },
        ];

        store.dispatch(HomeActions.SetUserConfiguration({ userConfig: configData }));

        expect(store.getActions()).toEqual(expectedActions);
    });
});
