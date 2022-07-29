import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const CheckoutService = {
    basicDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/basicDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    addressDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/addressDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    contactDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/contactDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    getGeography: async (language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/category/treelist/geography?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    getCustomerCategory: async (language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/category/treelist/personal_id_types?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    billingAccountUpdate: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/integrator/billingAccount`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    saveOrderSummery: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/integrator/updateOrder`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    getTermsAndConditionText: async (language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/components/basic/terms?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    checkDuplicateEmail: async (email: string): Promise<AxiosResponse<ApiDataType>> => {
        const data = { email };
        try {
            return await Service.postIntegrator({
                url: `api/customer/checkDuplicateMail`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    uploadDocument: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const response: AxiosResponse<any> = await Service.uploadFileBFF({
                url: "api/user-management/Upload-file",
                data,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    searchNumber: async (body: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const data: AxiosResponse<any> = await Service.postIntegrator({
                url: `api/productOrdering/searchInventoryByNumber`,
                data: body,
            });
            return data;
        } catch (error) {
            throw error;
        }
    },
    billingAccountPrepaidUpdate: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/integrator/createPrepaidBillingAccount`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    getDashboardDetail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postIntegrator({
                url: `integrator/getDashboardDetail`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getCustomerData: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.getIntegrator(`/api/customer/user-for-customer`);
            return detail;
        } catch (error) {
            throw error;
        }
    },
    updateCustomerData: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.putIntegrator({
                url: `/api/customer/update-customer`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    b2BBasicDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/b2b/basicDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    b2BContactDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/b2b/contactDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    b2BCompanyDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/b2b/companyDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    b2BAddressDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/b2b/addressDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    b2BDelegatorDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/b2b/delegatorDetails`, data });
        } catch (error) {
            throw error;
        }
    },
    b2BUpdateCustomerData: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.putIntegrator({
                url: `/api/customer/b2b/update-customer`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getB2BTermsAndConditionText: async (language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/components/basic/termsb2b?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    // getCity: async (): Promise<AxiosResponse<ApiDataType>> => {
    //     try {
    //         return await Service.postConfiguration(`/api/location/list?location=city`);
    //     } catch (error) {
    //         return error as any;
    //     }
    getCity: async (data: any, language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postConfiguration({
                url: `/api/location/list?location=city&language=${language}&storefront=1`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
};

export default CheckoutService;
