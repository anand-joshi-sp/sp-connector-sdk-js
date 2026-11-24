/**
 * Input object of `std:source-data:discover` command
 */
export type StdSourceDataDiscoverInput = {
    queryInput?: QueryInput;
};
type QueryInput = {
    query?: string;
    limit?: number;
};
type SourceDataDiscover = {
    key: string;
    label: string;
    subLabel?: string;
};
/**
 * Output object of `std:source-data:discover` command
 */
export type StdSourceDataDiscoverOutput = SourceDataDiscover[];
export {};
//# sourceMappingURL=std-source-data-discover.d.ts.map