/**
 * Input object of `std:source-data:read` command
 */
export type StdSourceDataReadInput = {
    sourceDataKey: string;
    queryInput?: QueryInput;
};
type QueryInput = {
    query?: string;
    excludeItems?: [string];
    limit?: number;
};
type SourceDataRead = {
    key: string;
    label: string;
    subLabel?: string;
};
/**
 * Output object of `std:source-data:read` command
 */
export type StdSourceDataReadOutput = SourceDataRead[];
export {};
//# sourceMappingURL=std-source-data-read.d.ts.map