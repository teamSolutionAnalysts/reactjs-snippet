import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const PaymentService = {
    getPaymentDetails: async (queryParams: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getPayment(`api/payment/get?${queryParams}`);
        } catch (error) {
            return error as any;
        }
    },
    checkPaymentStatus: async (queryParams: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getPayment(`/api/payment/check-payment-status?${queryParams}`);
        } catch (error) {
            return error as any;
        }
    },
    paymentCreate: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postPayment({
                url: `api/payment/create`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    addonPaymentCreateOld: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/payment/create-old`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    addonPaymentCreate: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/payment/create`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    prepaidTopupRecharge: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postPayment({
                url: `api/integrator/recharge`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    payBill: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postPayment({
                url: `api/integrator/paybill`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    payByScratchCard: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postPayment({
                url: `api/payment/scratch-card`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    checkMobilePaymentStatus: async (queryParams: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getPayment(`api/payment/get-mobile-payment-status?${queryParams}`);
        } catch (error) {
            return error as any;
        }
    },
    mobileMoneyNotify: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postPaymentService({ url: `api/payment/mobile-money-notify`, data });
        } catch (error) {
            throw error;
        }
    },
    finalStatusCheck: async (queryParams: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getPayment(`api/payment/momo-final-status-check?${queryParams}`);
        } catch (error) {
            throw error;
        }
    },
};

export default PaymentService;
