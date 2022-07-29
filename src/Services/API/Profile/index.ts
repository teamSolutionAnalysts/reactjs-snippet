import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const ProfileService = {
    getDashboardNumbers: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postBFF({
                url: `api/dashboard/dashboardNumbers`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getDashboardDetail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postBFF({
                url: `api/dashboard/dashboardDetails`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getTopUpHistoryDetails: async (urlString: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getBFF(`api/integrator/topupHistory?${urlString}`);
        } catch (error) {
            throw error;
        }
    },
    getCustomerProfileDetails: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const details: AxiosResponse<any> = await Service.getBFF(`api/user-management/profile`);
            return details;
        } catch (error) {
            throw error;
        }
    },
    updateContactDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const response: AxiosResponse<any> = await Service.postBFF({
                url: "api/user-management/updateProfile",
                data,
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getBillingInfo: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const details: AxiosResponse<any> = await Service.postBFF({
                url: "api/integrator/getBillingAccount",
                data,
            });
            return details;
        } catch (error) {
            throw error;
        }
    },
    getInvoiceHistory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/integrator/invoiceHistory`, data });
        } catch (error) {
            throw error;
        }
    },
    getSpecialOffers: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `/api/product-catalog/campaignOffer`, data });
        } catch (error) {
            throw error;
        }
    },
    updateBillingInfo: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const response = await Service.postBFF({ url: "/api/integrator/update-billingAccount", data });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getTicketHistory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/integrator/supportTicketHistory`, data });
        } catch (error) {
            throw error;
        }
    },
    getPaymentHistory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/integrator/paymentHistory`, data });
        } catch (error) {
            throw error;
        }
    },
    getOTPForUpdateEmail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({ url: "api/customer/auth-sendOtp", data });
        } catch (error) {
            throw error;
        }
    },
    verifyOTPAndUpdateEmail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "api/user-management/verify-otp-and-update-profile", data });
        } catch (error) {
            throw error;
        }
    },
    downloadInvoice: async (url: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const details: AxiosResponse<any> = await Service.getDownloadBFF(`api/integrator/invoiceDownload?${url}`);
            return details;
        } catch (error) {
            throw error;
        }
    },
    getUsageHistory: async (url: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const details: AxiosResponse<any> = await Service.getBFF(`api/integrator/usageHistory?${url}`);
            return details;
        } catch (error) {
            throw error;
        }
    },
    getRewardHistory: async (url: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getBFF(`api/integrator/rewardHistory?${url}`);
        } catch (error) {
            throw error;
        }
    },
    getCompatibleAddons: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "/api/product-catalog/compatibleAddon", data });
        } catch (error) {
            throw error;
        }
    },
    getNotificationHistory: async (url: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getBFF(`api/integrator/notificationHistory?${url}`);
        } catch (error) {
            throw error;
        }
    },
    getAllowanceDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "api/dashboard/quota-allowance-detail", data });
        } catch (error) {
            throw error;
        }
    },
    getOrderHistory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/integrator/orderHistory`, data });
        } catch (error) {
            throw error;
        }
    },
    getActiveAddOnList: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "api/product-catalog/activeAddonList", data });
        } catch (error) {
            throw error;
        }
    },
    unSubscribeAddon: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({ url: "api/dashboard/unsubscribeAddon", data });
        } catch (error) {
            throw error;
        }
    },
    getTicketType: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getIntegrator("api/ticket/types");
        } catch (error) {
            throw error;
        }
    },
    getTicketCategory: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getIntegrator("api/ticket/categories");
        } catch (error) {
            throw error;
        }
    },
    getTicketSubcategoryByCategory: async (data?: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({ url: "api/ticket/subCategories", data });
        } catch (error) {
            throw error;
        }
    },
    createTicket: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.uploadFileBFF({ url: "api/ticket/create", data });
        } catch (error) {
            throw error;
        }
    },
    updateTicket: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.uploadFileBFF({ url: "api/ticket/update", data });
        } catch (error) {
            throw error;
        }
    },
    changeSim: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({ url: "api/dashboard/change-sim", data });
        } catch (error) {
            throw error;
        }
    },
    searchContent: async (url: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getBFF(`api/search/sitemap?${url}`);
        } catch (error) {
            throw error;
        }
    },
    ResetPin: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "api/integrator/resetPin", data });
        } catch (error) {
            throw error;
        }
    },
    getFnfMemberDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "api/dashboard/getFnFMemberDetail", data });
        } catch (error) {
            throw error;
        }
    },
    getConsent: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getIntegrator("api/customer/communication-consent");
        } catch (error) {
            throw error;
        }
    },
    updateFnfMemberDetails: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({ url: "api/dashboard/updateFnFMember", data });
        } catch (error) {
            throw error;
        }
    },
    updateConsent: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.putIntegrator({ url: "api/customer/communication-consent", data });
        } catch (error) {
            throw error;
        }
    },
    CreditTransfer: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: "api/dashboard/credit-transfer",
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    getAddOnHistory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/integrator/addonHistory`, data });
        } catch (error) {
            throw error;
        }
    },
    getGiftingAddons: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: "/api/product-catalog/giftAddons", data });
        } catch (error) {
            throw error;
        }
    },
};

export default ProfileService;
