import CommonService from ".";

describe("Common Service tests", () => {
    test("getProductCatalog", async () => {
        const url = `category.id=301&page=1&limit=5`;
        await CommonService.getProductCatalog(url)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("getProductCatalogWithId", async () => {
        await CommonService.getProductCatalogWithId("MTNPRD00004003")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
});
