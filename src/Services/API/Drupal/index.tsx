import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const DrupalService = {
    getCategories: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/category/treelist/category?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    getConfiguration: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`jsonapi/configurations?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    getFiltersConfig: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/productfilter/tree");
        } catch (error) {
            return error as any;
        }
    },
    getAddonCategories: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/category/treelist/add_ons_categories?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    getPriceFilters: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/category/treelist/price_filter?_format=json");
        } catch (error) {
            throw error;
        }
    },
    getSiteConfiguration: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/site-settings?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
    getMediaCategories: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/category/treelist/multimedia_metatags?_format=json`);
        } catch (error) {
            return error as any;
        }
    },
};

export default DrupalService;
