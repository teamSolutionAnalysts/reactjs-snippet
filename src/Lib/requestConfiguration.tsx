import NextI18NextInstance from "@Server/i18n";
import { handleLogout } from "@Utils/helper";
import axios, { AxiosRequestConfig } from "axios";
import router from "next/router";

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_CONFIGURATION_URL,
});

// // Set the auth token for any request
// client.interceptors.request.use(
//     async config => {
//         const token = await Cookie.get(AUTH_TOKEN);

//         if (token) {
//             // eslint-disable-next-line no-param-reassign
//             config.headers.authorization = token;
//         }
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

/**
 * Request Wrapper with default success/error actions
 */
const requestConfiguration = (options: AxiosRequestConfig) => {
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
            if (error.response.status === 401) {
                handleLogout(NextI18NextInstance.i18n.t, router, NextI18NextInstance.i18n.t("sidebar:LOGOUT_SUCCESS"));
                // console.log("here the status ", error.response.status);
                // Router.push(redirectTo);
            }
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

export default requestConfiguration;
