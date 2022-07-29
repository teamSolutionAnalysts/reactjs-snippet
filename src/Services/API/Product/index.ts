import { AxiosResponse } from "axios";
import Service from "@Lib/service";

const ProductService = {
    getProducts: async (url: string): Promise<ApiPaginationType> => {
        try {
            return await Service.get(`api/product?${url}`);
        } catch (error) {
            return error as any;
        }
    },
    getProductDetail: async (productId: string | string[]): Promise<AxiosResponse<ApiDataType>> => {
        try {
            return await Service.get(`api/product/${productId}`);
        } catch (error) {
            return error as any;
        }
    },
};

export default ProductService;
