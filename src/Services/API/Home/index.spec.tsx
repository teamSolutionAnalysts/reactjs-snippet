import HomeService from ".";

describe("Home Service tests", () => {
    test("Home Top handpick", async () => {
        await HomeService.getTopHandPicked()
            .then((res: any) => {
                expect(res.result.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Home Top explore product", async () => {
        await HomeService.getTopExploreProducts()
            .then((res: any) => {
                expect(res.result.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Home menu items", async () => {
        await HomeService.getMenuItems("en")
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Home landing page", async () => {
        await HomeService.getLandingPage("en", "/home")
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Home logo", async () => {
        await HomeService.getLogoImage()
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
    test("Home slider", async () => {
        await HomeService.getSliderDetails("8cfe6989-df8d-49ef-befa-9ed3c5bcb1d6", "en")
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });

    test("Home Language list", async () => {
        await HomeService.getLanguageList()
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });

    test("Home Footer item", async () => {
        await HomeService.getFooterItems("en")
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });

    test("Home contact item", async () => {
        await HomeService.getContactItems()
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });

    test("Home banner image", async () => {
        await HomeService.getBannerImageDetails("8b3b13d8-08e4-406d-b4b3-3262b9e99959")
            .then((res: any) => {
                expect(res.length).toBeGreaterThan(0);
            })
            .catch((err: any) => {
                expect(err.name).toBe("Error");
            });
    });
});
