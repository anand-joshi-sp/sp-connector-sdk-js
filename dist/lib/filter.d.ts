type data = {
    [key: string]: boolean | string | string[] | number | number[] | any;
};
export declare class Filter {
    private data;
    constructor(data: data);
    matcher(filterString: string): boolean;
    private applyBinaryExpressionFilter;
    private isNullorEmpty;
    private applyCallExpressionFilter;
    private applyFilter;
}
export {};
//# sourceMappingURL=filter.d.ts.map