import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const CMSPageService = {
    getPageData: async (alias: string, language: string, query: string): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getDrupal(
                `/${language}/jsonapi/basicpage?_format=json&alias=${alias}${query?.length ? `&${query}` : ""}`
            );
        } catch (error) {
            return error as any;
        }
    },
};

export default CMSPageService;
