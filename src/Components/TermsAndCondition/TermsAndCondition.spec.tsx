import React from "react";

import { setupServer } from "msw/node";
import { act, fireEvent, render } from "@Test/utils";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import { store } from "@Redux";

import "@testing-library/jest-dom/extend-expect";

import TermsAndCondition from ".";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const data = {
    body: "This is terms and condition for project",
};

describe("TermsAndCondition render Page", () => {
    const useSelectorMock = jest.spyOn(redux, "useSelector");

    beforeEach(() => {
        useSelectorMock.mockClear();
    });

    it("TermsAndCondition snapshot", () => {
        useSelectorMock.mockReturnValue({
            paymentMode: "prepaid",
        });
        const { container } = render(
            <Provider store={store}>
                <TermsAndCondition termsAndConditionsData={data} successMainDetailsHandle={() => jest.fn()} />
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it("TermsAndCondition text", () => {
        useSelectorMock.mockReturnValue({
            paymentMode: "prepaid",
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <TermsAndCondition termsAndConditionsData={data} successMainDetailsHandle={() => jest.fn()} />
            </Provider>
        );
        const termsText = getByTestId("termsConditionData");

        expect(data.body).not.toBe(undefined);
        act(() => {
            expect(termsText).toHaveTextContent(data.body);
        });
    });

    it("renders a submit button", () => {
        useSelectorMock.mockReturnValue({
            paymentMode: "prepaid",
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <TermsAndCondition termsAndConditionsData={data} successMainDetailsHandle={() => jest.fn()} />
            </Provider>
        );
        expect(getByTestId("termsButton")).toBeInTheDocument();
    });

    it("allows the user to allow terms and condition and save", async () => {
        useSelectorMock.mockReturnValue({
            paymentMode: "prepaid",
        });
        const { getByTestId } = render(
            <Provider store={store}>
                <TermsAndCondition termsAndConditionsData={data} successMainDetailsHandle={() => jest.fn()} />
            </Provider>
        );

        expect(getByTestId("termsButton")).toHaveAttribute("disabled");

        fireEvent.click(getByTestId("checkbox"));

        await act(async () => {
            expect(getByTestId("termsButton")).not.toHaveAttribute("disabled");
        });
    });
});
