import CheckoutService from ".";

describe("Checkout Service tests", () => {
    test("Checkout basicDetails", async () => {
        await CheckoutService.basicDetails({ firstName: "mtnUser" })
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout addressDetails", async () => {
        await CheckoutService.addressDetails({ street: "mtnStreet" })
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout contactDetails", async () => {
        await CheckoutService.contactDetails({ alternateEmail: "mtnStreet@mailinator.com" })
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout getGeography", async () => {
        await CheckoutService.getGeography("en")
            .then((res: any) => {
                expect(res).toBeGreaterThan(0);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout getCustomerCategory", async () => {
        await CheckoutService.getCustomerCategory("en")
            .then((res: any) => {
                expect(res).toBeGreaterThan(0);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout billingAccountUpdate", async () => {
        await CheckoutService.billingAccountUpdate({ billingAccount: { baName: "mtnUser" } })
            .then((res: any) => {
                expect(res.result.baNumber).toBe("BA00000524");
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout saveOrderSummery", async () => {
        await CheckoutService.saveOrderSummery({ serviceType: "Postpaid" })
            .then((res: any) => {
                expect(res.result.baNumber).toBe("BA00000524");
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout getTermsAndConditionText", async () => {
        await CheckoutService.getTermsAndConditionText("en")
            .then((res: any) => {
                expect(res).toBeGreaterThan(0);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout checkDuplicateEmail", async () => {
        await CheckoutService.checkDuplicateEmail("mtnStreet@mailinator.com")
            .then((res: any) => {
                expect(res?.isValid).toBe(true);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout billingAccountPrepaidUpdate", async () => {
        const reqData = {
            shoppingCartId: 1,
            relatedPartyId: 1,
        };
        await CheckoutService.billingAccountPrepaidUpdate(reqData)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout uploadDocument", async () => {
        const formData = new FormData();
        formData.append("file", "");
        formData.append("documentType", "Personal Id back2142");
        await CheckoutService.uploadDocument(formData)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Checkout searchNumber", async () => {
        const reqData = {
            inventoryNumber: "745600001",
        };
        await CheckoutService.searchNumber(reqData)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
});
