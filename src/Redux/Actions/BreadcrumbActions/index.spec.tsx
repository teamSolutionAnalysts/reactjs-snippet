// #region Global Imports
import ActionTypes from "@Redux/ActionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import BreadcrumbActions from ".";
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Breadcrumb action tests", () => {
    test("SaveBreadCrumbsData test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: { title: "Cart", href: "/cart", active: true },
                type: ActionTypes.Breadcrumbs.SaveBreadcrumbData,
            },
        ];

        store.dispatch(BreadcrumbActions.SaveBreadCrumbsData({ title: "Cart", href: "/cart", active: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });

    test("ReplaceBreadcrumb test", async () => {
        const store = mockStore();

        const expectedActions = [
            {
                payload: { title: "Cart", href: "/cart", active: true },
                type: ActionTypes.Breadcrumbs.ReplaceBreadcrumb,
            },
        ];

        store.dispatch(BreadcrumbActions.ReplaceBreadcrumb({ title: "Cart", href: "/cart", active: true }));

        expect(store.getActions()).toEqual(expectedActions);
    });
});
