// #region Global Imports
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as redux from "react-redux";
import CommonActions from ".";
// #endregion Global Imports

// #region Local Imports
// #endregion Local Imports

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Common action tests", () => {
    const useDispatchMock = jest.spyOn(redux, "useDispatch");

    beforeEach(() => {
        useDispatchMock.mockClear();
    });

    test("GetMenuItems test", async () => {
        const dummyDispatch = jest.fn();
        const store = mockStore();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        store.dispatch(CommonActions.GetMenuItems("en") as any);
        useDispatchMock.mockReturnValue(dummyDispatch);

        const expectedActions: any = [];
        expect(store.getActions()).toEqual(expectedActions);
    });
});
