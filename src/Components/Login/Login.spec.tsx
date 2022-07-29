import React from "react";
import { render, fireEvent, act } from "@Test/utils";

import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { store } from "@Redux";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithRouter } from "@Test/mockTest";

import Login from ".";

const fakeUserResponse = { auth_token: "fake_user_token" };

const server = setupServer(
    rest.post(
        "/api/auth/signin",
        (req: any, res: (arg0: any) => any, ctx: { json: (arg0: { auth_token: string }) => any }) => {
            return res(ctx.json(fakeUserResponse));
        }
    )
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: "warn",
    })
);

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => server.close());

describe("Login render Page", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(container).toMatchSnapshot();
    });

    it("render 2 input components", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(getByTestId("username")).toBeInTheDocument();
        expect(getByTestId("password")).toBeInTheDocument();
    });

    it("renders a submit button", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );
        expect(getByTestId("submit-login")).toBeInTheDocument();
    });

    it("allows the user to login successfully", async () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        // fill out the form
        fireEvent.change(getByTestId("username"), {
            target: { value: "hiro@mailinator.com" },
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: "Test@361_879" },
        });

        await act(async () => {
            await fireEvent.click(getByTestId("submit-login"));
        });
    });

    it("handles server exceptions", async () => {
        // mock the server error response for this test suite only.
        server.use(
            rest.post("/api/auth/signin", (req, res, ctx) => {
                return res(ctx.status(401), ctx.json({ code: 401, error: "Invalid user credentials" }));
            })
        );

        const { getByTestId } = renderWithRouter(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        fireEvent.change(getByTestId("username"), {
            target: { value: "hiro@mailinator.com" },
        });
        fireEvent.change(getByTestId("password"), {
            target: { value: "Test@361_879" },
        });

        await act(async () => {
            await fireEvent.click(getByTestId("submit-login"));
        });

        await act(async () => {
            await expect(getByTestId("login-error"));
        });
    });
});
