// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";
import BreadcrumbsReducer from ".";
// #endregion Local Imports

describe("Breadcrumbs reducer", () => {
    it("should return the initial state", () => {
        expect(BreadcrumbsReducer(undefined, {})).toEqual({
            breadCrumbsData: [{ title: "Home", href: "/", active: false }],
        });
    });

    it("should handle SaveBreadcrumbData", () => {
        expect(
            BreadcrumbsReducer(
                { breadCrumbsData: [{ title: "Home", href: `/`, active: true }] },
                {
                    type: ActionTypes.Breadcrumbs.SaveBreadcrumbData,
                    payload: { title: "Cart", href: "/cart", active: true },
                }
            )
        ).toEqual({
            breadCrumbsData: [
                { title: "Home", href: "/", active: false },
                { title: "Cart", href: `/cart`, active: true },
            ],
        });
    });

    it("should handle ReplaceBreadcrumb", () => {
        expect(
            BreadcrumbsReducer(
                { breadCrumbsData: [{ title: "Home", href: `/`, active: true }] },
                {
                    type: ActionTypes.Breadcrumbs.ReplaceBreadcrumb,
                    payload: { title: "Checkout", href: "/checkout", active: true },
                }
            )
        ).toEqual({
            breadCrumbsData: [{ title: "Checkout", href: "/checkout", active: true }],
        });
    });
});
