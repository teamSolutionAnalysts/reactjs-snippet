// #region Local Imports
import { IAction, IHomePage } from "@Interfaces";
import ActionTypes from "@Redux/ActionTypes";
import HomeReducer from ".";
// #endregion Local Imports

describe("home reducer", () => {
    it("should return the initial state", () => {
        expect(HomeReducer(undefined, {} as IAction<IHomePage.Actions.IMapPayload>)).toEqual({
            home: {
                version: 1,
            },
            image: {
                url: "",
            },
            config: {
                minAge: "",
                otpResendTime: "",
                otpBlockAfterMaxAttempt: "",
                userPasswordLength: "",
                userEmailLength: "",
                userMobileLength: "",
                emptyCart: "",
            },
            userConfig: {
                userFirstName: "",
                userLastName: "",
            },
        });
    });

    it("should handle SetReducer", () => {
        expect(
            HomeReducer(
                {},
                {
                    type: ActionTypes.Home.SetReducer,
                    payload: {
                        home: {
                            version: 2,
                        },
                    },
                }
            )
        ).toEqual({
            home: {
                version: 2,
            },
        });
    });

    it("should handle setConfiguration", () => {
        expect(
            HomeReducer(
                {},
                {
                    type: ActionTypes.Home.setConfiguration,
                    payload: {
                        config: {
                            minAge: "18",
                            otpResendTime: "1",
                            otpBlockAfterMaxAttempt: "1",
                            userPasswordLength: "",
                            userEmailLength: "",
                            userMobileLength: "",
                            emptyCart: "",
                        },
                    },
                }
            )
        ).toEqual({
            config: {
                minAge: "18",
                otpResendTime: "1",
                otpBlockAfterMaxAttempt: "1",
                userPasswordLength: "",
                userEmailLength: "",
                userMobileLength: "",
                emptyCart: "",
            },
        });
    });

    it("should handle setUserConfiguration", () => {
        expect(
            HomeReducer(
                {},
                {
                    type: ActionTypes.Home.setUserConfiguration,
                    payload: {
                        userConfig: {
                            userFirstName: "test",
                            userLastName: "user",
                        },
                    },
                }
            )
        ).toEqual({
            userConfig: {
                userFirstName: "test",
                userLastName: "user",
            },
        });
    });

    it("should handle clearUserConfiguration", () => {
        expect(
            HomeReducer(
                {},
                {
                    type: ActionTypes.Home.clearUserConfiguration,
                }
            )
        ).toEqual({
            userConfig: {
                userFirstName: "",
                userLastName: "",
            },
        });
    });

    it("should handle ResetReducer", () => {
        expect(
            HomeReducer(undefined, {
                type: ActionTypes.Home.ResetReducer,
            })
        ).toEqual({
            home: {
                version: 1,
            },
            image: {
                url: "",
            },
            config: {
                minAge: "",
                otpResendTime: "",
                otpBlockAfterMaxAttempt: "",
                userPasswordLength: "",
                userEmailLength: "",
                userMobileLength: "",
                emptyCart: "",
            },
            userConfig: {
                userFirstName: "",
                userLastName: "",
            },
        });
    });
});
