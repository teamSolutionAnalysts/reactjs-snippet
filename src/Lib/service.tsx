import request from "./request";
import requestDrupal from "./requestDrupal";
import requestUserManage from "./requestUserManage";
import requestShoppingCart from "./requestShoppingCart";
import requestConfiguration from "./requestConfiguration";
import requestIntegrator from "./requestIntegrator";
import requestBFF from "./requestBFF";
import requestDownloadBFF from "./requestDownloadBFF";
import requestPayment from "./requestPayment";

// ref:https://gist.github.com/sheharyarn/7f43ef98c5363a34652e60259370d2cb

function get(url: string) {
    return request({
        method: "GET",
        url,
    });
}

function post<T = any>({ url, data }: { url?: string; data: T }) {
    return request({
        method: "POST",
        url,
        data,
    });
}

function update(url: any, data: any) {
    return request({
        method: "PUT",
        url,
        data,
    });
}

function remove(url: any, data: any) {
    return request({
        method: "DELETE",
        url,
        data,
    });
}

// Start Drupal
function getDrupal(url: string) {
    return requestDrupal({
        method: "GET",
        url,
    });
}

function postDrupal<T = any>({ url, data }: { url?: string; data: T }) {
    return requestDrupal({
        method: "POST",
        url,
        data,
    });
}

function updateDrupal(url: any, data: any) {
    return requestDrupal({
        method: "PUT",
        url,
        data,
    });
}

function removeDrupal(url: any, data: any) {
    return requestDrupal({
        method: "DELETE",
        url,
        data,
    });
}

// END Drupal

function getUserManage(url: string) {
    return requestUserManage({
        method: "GET",
        url,
    });
}

function postUserManage<T = any>({ url, data }: { url?: string; data: T }) {
    return requestUserManage({
        method: "POST",
        url,
        data,
    });
}

function updateUserManage(url: any, data: any) {
    return requestUserManage({
        method: "PUT",
        url,
        data,
    });
}

function removeUserManage(url: any, data: any) {
    return requestUserManage({
        method: "DELETE",
        url,
        data,
    });
}
function getShoppingCart(url: string) {
    return requestShoppingCart({
        method: "GET",
        url,
    });
}

function postShoppingCart<T = any>({ url, data }: { url?: string; data: T }) {
    return requestShoppingCart({
        method: "POST",
        url,
        data,
    });
}

function patchShoppingCart<T = any>({ url, data }: { url?: string; data: T }) {
    return requestShoppingCart({
        method: "PATCH",
        url,
        data,
    });
}

function putShoppingCart<T = any>({ url, data }: { url?: string; data: T }) {
    return requestShoppingCart({
        method: "PUT",
        url,
        data,
    });
}

function updateShoppingCart(url: any, data: any) {
    return requestShoppingCart({
        method: "PUT",
        url,
        data,
    });
}

function removeShoppingCart(url: any, data: any) {
    return requestShoppingCart({
        method: "DELETE",
        url,
        data,
    });
}

// configuration

function getConfiguration(url: string) {
    return requestConfiguration({
        method: "GET",
        url,
    });
}
function postConfiguration<T = any>({ url, data }: { url?: string; data: T }) {
    return requestConfiguration({
        method: "POST",
        url,
        data,
    });
}

// integrator

function getIntegrator<T = any>(url?: string) {
    return requestIntegrator({
        method: "GET",
        url,
    });
}

function postIntegrator<T = any>({ url, data }: { url?: string; data: T }) {
    return requestIntegrator({
        method: "POST",
        url,
        data,
    });
}

function putIntegrator<T = any>({ url, data }: { url?: string; data: T }) {
    return requestIntegrator({
        method: "PUT",
        url,
        data,
    });
}

// BFF Calls
function uploadFileBFF({ url, data }: { url: string; data: any }) {
    return requestBFF({
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url,
        data,
    });
}

function postBFF<T = any>({ url, data }: { url?: string; data: T }) {
    return requestBFF({
        method: "POST",
        url,
        data,
    });
}

function getBFF(url: string) {
    return requestBFF({
        method: "GET",
        url,
    });
}

function postPayment<T = any>({ url, data }: { url?: string; data: T }) {
    return requestBFF({
        method: "POST",
        url,
        data,
    });
}

function getPayment(url: string) {
    return requestBFF({
        method: "GET",
        url,
    });
}

function putBFF(url: string, data: any) {
    return requestBFF({
        method: "PUT",
        url,
        data,
    });
}

function getDownloadBFF(url: string) {
    return requestDownloadBFF({
        method: "GET",
        url,
    });
}

function postPaymentService<T = any>({ url, data }: { url?: string; data: T }) {
    return requestPayment({
        method: "POST",
        url,
        data,
    });
}

const Service = {
    get,
    post,
    update,
    remove,
    getDrupal,
    postDrupal,
    postConfiguration,
    updateDrupal,
    removeDrupal,
    getUserManage,
    postUserManage,
    updateUserManage,
    removeUserManage,
    getShoppingCart,
    postShoppingCart,
    patchShoppingCart,
    putShoppingCart,
    updateShoppingCart,
    removeShoppingCart,
    getConfiguration,
    uploadFileBFF,
    postIntegrator,
    postBFF,
    getBFF,
    postPayment,
    getPayment,
    putBFF,
    getDownloadBFF,
    getIntegrator,
    putIntegrator,
    postPaymentService,
};
export default Service;
