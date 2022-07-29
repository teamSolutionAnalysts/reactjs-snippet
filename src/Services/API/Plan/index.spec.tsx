// #region Local Imports
import { ConstantsFreeze } from "@Utils/enums";
import PlanService from ".";
// #endregion Local Imports

describe("Plan Service tests", () => {
    test("Plan", async () => {
        await PlanService.getPlans(`page=1&limit=${ConstantsFreeze.LIMIT}`)
            .then((res: ApiPaginationType) => {
                expect(res.result.length).toBeGreaterThan(0);
            })
            .catch(err => {
                expect(err.name).toBe("Error");
            });
    });

    test("Plan for plan details", async () => {
        PlanService.getPlanDetail("MTNPRD00004003")
            .then((res: any) => {
                expect(res.result.id).toBe("MTNPRD00004003");
            })
            .catch(err => {
                expect(err.name).toBe("Error");
            });
    });

    test("Plan for plan validity", async () => {
        const data = {
            packageName: "SilverGPPRecurringCharge400",
        };
        PlanService.getPlanValidityDetail(data)
            .then((res: any) => {
                expect(res.result.billingFrequency).toBe("Monthly");
            })
            .catch(err => {
                expect(err.name).toBe("Error");
            });
    });
});
