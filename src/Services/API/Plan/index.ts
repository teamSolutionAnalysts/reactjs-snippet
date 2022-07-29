import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const PlanService = {
    getPlans: async (url: string): Promise<ApiPaginationType> => {
        try {
            return await Service.get(`tmf-api/productCatalogManagement/productOffering?${url}`);
        } catch (error) {
            return error as any;
        }
    },
    getPlanDetail: async (planId: string | string[]): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.get(`api/product/plan/${planId}`);
        } catch (error) {
            return error as any;
        }
    },
    getPlanValidityDetail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `api/productOffering/quotationDetail`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    checkUserSpendingLimit: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<ApiDataType> = await Service.postBFF({
                url: `api/shopping-cart/checkout`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getFilterByCategories: async (categories: any): Promise<AxiosResponse<ApiDataType>> => {
        let url = `tmf-api/productCatalogManagement/productOffering/filterByCategory`;
        if (categories) {
            url = `${url}?category.id=${categories}`;
        }

        try {
            return await Service.get(url);
        } catch (error) {
            throw error;
        }
    },
    getBasePlansList: async (data: {
        currentBasePlan: string;
        currentBasePlanId: string;
        serviceType: string;
        page_index: number;
        page_size: number;
    }): Promise<AxiosResponse<ApiDataType>> => {
        const url = `/api/product-catalog/compatibleBasePlan`;

        try {
            return await Service.postBFF({ url, data });
        } catch (error) {
            throw error;
        }
    },
    checkCompatibilityForChangePlan: async (newBasePlan: {
        newBasePlan: any;
        newBasePlanId: any;
        msisdn: any;
    }): Promise<any> => {
        try {
            return await Service.postBFF({
                url: `api/product-catalog/compatibleAddonForChangePlan`,
                data: newBasePlan,
            });
        } catch (error) {
            throw error;
        }
    },
    changePlanCreateOrder: async (newBasePlan: {
        orderDetails: {
            msisdn: string;
            customerAccountNumber: string;
            serviceType: string;
            cartId: string;
            isPaymentRequired: boolean;
            serviceInstAccountNo: string;
            unsubAddonList: { packageHistoryId: number }[];
        };
    }): Promise<any> => {
        try {
            return await Service.postBFF({
                url: `/api/integrator/changePlanCreateOrder`,
                data: newBasePlan,
            });
        } catch (error) {
            throw error;
        }
    },
    submitCaptureExpression: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `/api/customer/captureExpression`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    getProductCatalogAddons: async (url: string): Promise<ApiPaginationType> => {
        try {
            return await Service.getBFF(`/api/product-catalog/getAddons?${url}`);
        } catch (error) {
            return error as any;
        }
    },
};

export default PlanService;
