/* eslint-disable no-underscore-dangle */
import Cookie from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { LOCAL_HOST_KEY } from "@Utils/enums";
import { getCookie, handleLogout } from "@Utils/helper";
import NextI18NextInstance from "@Server/i18n";
import router from "next/router";
import AuthService from "@Services/API/Auth";

const { AUTH_TOKEN } = LOCAL_HOST_KEY;
/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_BFF_URL,
});

// Set the auth token for any request
client.interceptors.request.use(
    async config => {
        const token = await Cookie.get(AUTH_TOKEN);

        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;
        if (
            originalConfig.url !== "/api/user-management/login" &&
            originalConfig.url !== "/api/auth/refreshToken" &&
            err.response
        ) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs: any = await AuthService.getRefreshToken({ refreshToken: getCookie("refreshToken") });
                    Cookie.set(AUTH_TOKEN, rs?.token);
                    return client(originalConfig);
                } catch (_error) {
                    handleLogout(
                        NextI18NextInstance.i18n.t,
                        router,
                        NextI18NextInstance.i18n.t("sidebar:LOGOUT_SUCCESS")
                    );
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

/**
 * Request Wrapper with default success/error actions
 */
const requestBff = (options: AxiosRequestConfig) => {
    const onSuccess = (response: { headers: any; data: any }) => {
        // console.debug("Request Successful!", response);
        // console.log(response.headers, "response");

        return response.data;
    };

    const onError = (error: { config: any; response: { status: any; data: any; headers: any }; message: any }) => {
        // console.error("Request Failed:", error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            // console.error("Status:", error.response.status);
            // console.error("Data:", error.response.data);
            // console.error("Headers:", error.response.headers);
        } else {
            // Something else happened while setting up the request
            // triggered the error
            // console.error("Error Message:", error.message);
        }

        return Promise.reject(error.response || error.message);
    };

    return client(options)
        .then(onSuccess)
        .catch(onError);
};

export default requestBff;
