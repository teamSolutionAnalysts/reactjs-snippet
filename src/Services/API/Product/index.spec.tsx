// #region Local Imports
import ProductService from ".";
// #endregion Local Imports

describe("Product Service tests", () => {
    test("Product", async () => {
        ProductService.getProducts(`page=1&limit=10`)
            .then((res: ApiPaginationType) => {
                expect(res.result.length).toBeGreaterThan(0);
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });

    test("Product for product details", async () => {
        // kamyab: we need some error from BE because if we are not passing any thing then also it gives 200
        ProductService.getProductDetail("2005")
            .then((res: any) => {
                expect(res.result.id).toBe("2005");
            })
            .catch(err => {
                expect(err.name).toBe(undefined);
            });
    });
});
