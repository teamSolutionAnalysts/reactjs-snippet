import React from "react";
import { render } from "@Test/utils";

import "@testing-library/jest-dom/extend-expect";
import Timer from "./timer";

describe("Timer render Page", () => {
    let useEffect: any;
    let props: any = {};
    let component: any;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce((f: any) => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        props = {
            initialSeconds: 0,
            initialMinute: 1,
            handleFinishTimer: () => {},
        };
        mockUseEffect();
        component = render(<Timer {...props} />);
    });

    it("Timer match snapshot", () => {
        expect(component).toMatchSnapshot();
    });
});
