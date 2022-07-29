import Service from "@Lib/service";

const CommonService = {
    getProductCatalog: async (url: string): Promise<ApiPaginationType> => {
        try {
            return await Service.get(`/tmf-api/productCatalogManagement/productOffering?${url}`);
        } catch (error) {
            throw error;
        }
    },
    getProductCatalogWithId: async (url: string): Promise<ApiPaginationType> => {
        try {
            return await Service.get(`/tmf-api/productCatalogManagement/productOffering/${url}`);
        } catch (error) {
            throw error;
        }
    },
    getProductCatalogWithFilterKey: async (key: any, value: string): Promise<ApiPaginationType> => {
        try {
            return await Service.get(
                `/tmf-api/productCatalogManagement/productOffering/filterByKey?field=${key}&value=${value}`
            );
        } catch (error) {
            throw error;
        }
    },
};

export default CommonService;
