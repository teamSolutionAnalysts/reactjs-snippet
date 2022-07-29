type ApiDataType = {
    result: Array<Object>;
};

type ApiPaginationType = {
    result: Array<Object> | Array;
    pager: {
        totalRecords: number;
    };
};

type ApiResponse = {
    code: number;
    msg: string;
    status: boolean;
};
