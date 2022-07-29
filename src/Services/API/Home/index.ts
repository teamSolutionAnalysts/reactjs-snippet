import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const HomeService = {
    getTopHandPicked: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.get(`api/product/top`);
        } catch (error) {
            throw error;
        }
    },
    getTopExploreProducts: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.get(`api/product/plan/top`);
        } catch (error) {
            throw error;
        }
    },
    getMenuItems: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/menu/main/tree?_format=json`);
        } catch (error) {
            throw error;
        }
    },
    getLandingPage: async (language: string, pagename: string, query?: string): Promise<any> => {
        try {
            return await Service.getDrupal(
                `${language}/jsonapi/landingpage?_format=json&alias=${pagename}${query?.length ? `&${query}` : ""}`
            );
        } catch (error) {
            throw error;
        }
    },
    getLogoImage: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/components/image_blocks/logo?_format=json");
        } catch (error) {
            throw error;
        }
    },
    getSiteSettings: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/site-settings?_format=json");
        } catch (error) {
            throw error;
        }
    },
    getSliderDetails: async (uuid: string, language: string): Promise<any> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/components/slider_block/${uuid}?_format=json`);
        } catch (error) {
            throw error;
        }
    },
    getLanguageList: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/language/list");
        } catch (error) {
            throw error;
        }
    },
    getFooterItems: async (language: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(`${language}/jsonapi/menu/footer/tree?_format=json`);
        } catch (error) {
            throw error;
        }
    },
    getContactItems: async (): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal("jsonapi/components/basic/social?_format=json");
        } catch (error) {
            throw error;
        }
    },
    getBannerImageDetails: async (uuid: string): Promise<any> => {
        try {
            return await Service.getDrupal(`jsonapi/components/image_blocks/${uuid}?_format=json`);
        } catch (error) {
            throw error;
        }
    },
    getTopOfferingsData: async (url: string): Promise<any> => {
        try {
            return await Service.getBFF(`api/product-catalog/topOffering?${url}`);
        } catch (error) {
            throw error;
        }
    },
};

export default HomeService;
