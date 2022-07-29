import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const ConfigService = {
    getConfiguration: async (url: string | string[]): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.getConfiguration(`api/configuration?${url}`);
        } catch (error) {
            return error as any;
        }
    },
};

export default ConfigService;
