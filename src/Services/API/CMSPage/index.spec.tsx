import CMSService from ".";

describe("CMS page Service tests", () => {
    test("getPageData", async () => {
        await CMSService.getPageData("home", "en")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe("Error");
            });
    });
});
