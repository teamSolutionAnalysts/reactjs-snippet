// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";
import PlanReducer from ".";
// #endregion Local Imports

describe("Plan reducer", () => {
    it("should return the initial state", () => {
        expect(PlanReducer(undefined, {})).toEqual({
            planName: "",
            iccId: "",
            simOperatorType: "",
            effectDate: "",
            productId: "",
            paymentMode: "",
        });
    });

    it("should handle SetPlanName", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetPlanName,
                    payload: {
                        planName: "SilverGPPRecurringCharge400",
                    },
                }
            )
        ).toEqual({
            planName: "SilverGPPRecurringCharge400",
        });
    });

    it("should handle SetIccId", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetIccId,
                    payload: {
                        iccId: "00000000901",
                    },
                }
            )
        ).toEqual({
            iccId: "00000000901",
        });
    });

    it("should handle SetSimOperatorType", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetSimOperatorType,
                    payload: {
                        simOperatorType: "POSTPAID",
                    },
                }
            )
        ).toEqual({
            simOperatorType: "POSTPAID",
        });
    });

    it("should handle SetEffectDate", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetEffectDate,
                    payload: {
                        effectDate: "16-05-2021T00:00:00",
                    },
                }
            )
        ).toEqual({
            effectDate: "16-05-2021T00:00:00",
        });
    });

    it("should handle SetProductId", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetProductId,
                    payload: {
                        productId: "MTNPRD00004003",
                    },
                }
            )
        ).toEqual({
            productId: "MTNPRD00004003",
        });
    });

    it("should handle SetPaymentMode", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.SetPaymentMode,
                    payload: {
                        paymentMode: "postpaid",
                    },
                }
            )
        ).toEqual({
            paymentMode: "postpaid",
        });
    });

    it("should handle ResetReducer", () => {
        expect(
            PlanReducer(undefined, {
                type: ActionTypes.Plan.ResetReducer,
            })
        ).toEqual({
            planName: "",
            iccId: "",
            simOperatorType: "",
            effectDate: "",
            productId: "",
            paymentMode: "",
        });
    });

    it("should handle ClearCart", () => {
        expect(
            PlanReducer(
                {},
                {
                    type: ActionTypes.Plan.ClearCart,
                }
            )
        ).toEqual({
            planName: "",
            effectDate: "",
        });
    });
});
