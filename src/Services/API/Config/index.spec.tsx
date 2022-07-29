import ConfigService from ".";

describe("Configure Service tests", () => {
    test("Configure", async () => {
        await ConfigService.getConfiguration("")
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
});
