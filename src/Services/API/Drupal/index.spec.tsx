import DrupalService from ".";

describe("Drupal Service tests", () => {
    test("getCategories", async () => {
        await DrupalService.getCategories("en")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
    test("getConfiguration", async () => {
        await DrupalService.getConfiguration()
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
});
