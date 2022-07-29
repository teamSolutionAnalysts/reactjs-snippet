import CartService from ".";

describe("Cart Service tests", () => {
    test("Cart getIntialCart", async () => {
        await CartService.getInitialCart("planName", "effectDate", "ferere323")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Cart iccIdValidation", async () => {
        const data = {
            iccId: "values.simNumber",
        };
        await CartService.iccIdValidation(data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Cart searchInventory", async () => {
        await CartService.searchInventory("Free")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Cart vanityCategories", async () => {
        await CartService.vanityCategories({ tenantIdLst: "number", inventorySubTypeId: "string" })
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Cart inventoryStatus", async () => {
        const data = {
            inventorySubType: "MSISDN",
        };
        await CartService.inventoryStatus(data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Cart createTMFShoppingCart", async () => {
        const data = {
            userId: 1,
            name: "user",
        };
        await CartService.createTMFShoppingCart(data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Cart createCartWithICC_TMFShoppingCart", async () => {
        const data = {
            cartItem: [
                {
                    product: {
                        isBundle: false,
                        name: "prepaidPlan",
                        type: "Prepaid",
                        productCharacteristic: [
                            {
                                name: "ICCID",
                                value: "883484949398",
                            },
                        ],
                    },
                },
            ],
        };
        await CartService.createCartWithICC_TMFShoppingCart("34243434", data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Cart removeShoppingCart", async () => {
        const data = [
            {
                op: "remove",
                cartItemId: "8478737934",
            },
        ];
        await CartService.removeShoppingCart("hifieir554", data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Cart checkoutCartItem", async () => {
        const data = {
            op: "checkout",
            cartItemId: "87897834",
            product: {
                name: "PrepaidPlan",
                effectDate: "16-05-2021T00:00:00",
            },
        };
        await CartService.checkoutCartItem("hifieir554", data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Cart vanityCategoriesFromCMS", async () => {
        await CartService.vanityCategoriesFromCMS("en")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
});
