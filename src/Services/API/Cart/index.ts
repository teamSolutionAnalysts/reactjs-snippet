import { AxiosResponse } from "axios";
import Service from "@Lib/service";
import { store } from "@Redux";

const CartService = {
    getInitialCart: async (shoppingCartId: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/shopping-cart/checkout-summery`,
                data: { shoppingCartId },
            });
        } catch (error) {
            throw error;
        }
    },
    iccIdValidation: async (data: any): Promise<ApiResponse> => {
        try {
            return await Service.postIntegrator({
                url: `api/productOrdering/ICCIDValidation`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    vanityCategories: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postShoppingCart({
                url: `api/productCatalogManagement/vanity-categories`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    searchInventory: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `api/productOrdering/searchInventory`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    inventoryStatus: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `api/integrator/createOrder`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },

    // TMF Shoping Cart
    createTMFShoppingCart: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postShoppingCart({
                url: `tmf-api/shoppingCart/cart/create`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    createCartWithICC_TMFShoppingCart: async (cartId: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.putShoppingCart({
                url: `tmf-api/shoppingCart/cart/${cartId}`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    removeShoppingCart: async (cartId: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.putShoppingCart({
                url: `tmf-api/shoppingCart/cart/${cartId}`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    checkoutCartItem: async (cartId: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.putBFF(`/api/shopping-cart/${cartId}`, data);
        } catch (error) {
            throw error;
        }
    },
    vanityCategoriesFromCMS: async (language: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const detail: AxiosResponse<any> = await Service.getDrupal(
                `${language}/jsonapi/category/treelist/vanity_category?_format=json`
            );
            return detail;
        } catch (error) {
            throw error;
        }
    },
    getUserCartDetails: async (urlStr: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postShoppingCart({
                url: `/tmf-api/shoppingCart/cart/list?${urlStr}`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    createAddonShoppingCart: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/shopping-cart/createAddonCart`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    AddOfferInShoppingCart: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/shopping-cart/checkout`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    createAddonOrder: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/integrator/addonCreateOrder`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    getShoppingCartDetailsById: async (): Promise<AxiosResponse<ApiDataType>> => {
        const { shoppingCartId } = store.getState().cart;
        try {
            return await Service.getShoppingCart(`/tmf-api/shoppingCart/cart/${shoppingCartId}`);
        } catch (error) {
            throw error;
        }
    },
    acceptTNC: async (data: { termsAndCondition: boolean }): Promise<AxiosResponse<ApiDataType>> => {
        const { shoppingCartId } = store.getState().cart;
        try {
            return await Service.putShoppingCart({
                url: `tmf-api/shoppingCart/cart/${shoppingCartId}`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    getDataFromMSISDN: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postIntegrator({
                url: `/api/billing/getSIandContractDetails/msisdn`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    placeOrder: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/integrator/placeOrder`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    checkAddonCompatibility: async (data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.postBFF({
                url: `/api/shopping-cart/checkAddonCompatibilityByMsisdn`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
    expiredShoppingCart: async (cartId: string, data: any): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.patchShoppingCart({
                url: `tmf-api/shoppingCart/cart/${cartId}`,
                data,
            });
        } catch (error) {
            throw error;
        }
    },
};

export default CartService;
