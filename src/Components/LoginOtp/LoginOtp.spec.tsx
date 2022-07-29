// #region Global Imports
import * as React from "react";
// #endregion Global Imports

// #region Local Imports
import { render } from "@Test/utils";
import LoginOtp from ".";
// #endregion Local Imports

describe("LoginOtp", () => {
    it("should match snapshot", () => {
        const { container } = render(<LoginOtp />);
        expect(container).toMatchSnapshot();
    });
});
