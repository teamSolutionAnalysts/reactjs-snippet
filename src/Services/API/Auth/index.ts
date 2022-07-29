import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const AuthService = {
    postLoginDetail: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `/api/user-management/login`, data });
        } catch (error) {
            throw error;
        }
    },
    postRegister: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `api/user-management/signup`, data });
        } catch (error) {
            throw error;
        }
    },
    getOtp: async (url: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    numberStatus: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/user-management/numberStatus`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    checkIdBlacklist: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `api/customer/checkBlacklist`,
                data,
            });
        } catch (error) {
            return error as any;
        }
    },
    getUserDetails: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getUserManage(`/api/auth/profile`);
        } catch (error) {
            throw error;
        }
    },
    getUserBillingDetails: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `/api/customer/customer/get`,
                data: { requestFromSC: true },
            });
        } catch (error) {
            throw error;
        }
    },
    checkCivilRegistry: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.getBFF(`api/user-management/civil-registry-check/${data}`);
            return detail;
        } catch (error) {
            return error as any;
        }
    },
    forgotPassword: async (data: any, params?: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postBFF({
                url: `api/user-management/forgotPassword${params || ""}`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    verifyOTP: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postIntegrator({ url: `/api/customer/verifyOtp`, data });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    resetPassword: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postBFF({
                url: `api/user-management/resetPassword`,
                data,
            });
            return detail;
        } catch (error) {
            return error as any;
        }
    },
    verifyLink: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postIntegrator({
                url: `api/customer/verifyLink`,
                data,
            });
            return detail;
        } catch (error) {
            return error as any;
        }
    },
    changeUserPassword: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({ url: `/api/user-management/changePassword`, data });
        } catch (error) {
            throw error;
        }
    },
    acceptCookies: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postUserManage({ url: `/api/auth/accept-cookies`, data });
        } catch (error) {
            return error as any;
        }
    },
    getRoles: async (url: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getUserManage(`/api/role/list?${url}`);
        } catch (error) {
            return error as any;
        }
    },
    getUserPermissionsByRole: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postUserManage({ url: "api/permission/get-permissions-by-role", data });
        } catch (error) {
            return error as any;
        }
    },
    requestOTPForLogin: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postIntegrator({ url: `api/customer/sendOtpLogin`, data });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    verifyRequestOTP: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.postBFF({
                url: `api/user-management/login-with-otp`,
                data,
            });
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getRefreshToken: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postUserManage({ url: "api/auth/refreshToken", data });
        } catch (error) {
            throw error;
        }
    },
};

export default AuthService;
