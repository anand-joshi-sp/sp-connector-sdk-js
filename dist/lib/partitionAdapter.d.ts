import { Context, Response, StdAccountListInput, StdAccountListOutput } from ".";
import { Partition } from "./partition";
export interface PartitionAdapter {
    getPartitions(context: Context, input: StdAccountListInput): Promise<Array<Partition>>;
    list(context: Context, input: StdAccountListInput, res: Response<StdAccountListOutput>, partition?: Partition): Promise<void>;
}
export declare class PartitionHandler {
    partitionAdapter: PartitionAdapter;
    childLogger: import("pino").default.Logger<{
        timestamp: () => string;
        messageKey: string;
        level: string;
        base: undefined; /**
         * Handles partitioning operation for the connector which supports the partitioning.
         *
         * @param context Context
         * @param input StdAccountListInput
         * @param res Response<StdAccountListOutput>
         */
        formatters: {
            level: (label: string) => {
                level: string;
            };
        };
        mixin(): {
            id?: undefined;
            version?: undefined;
            invocationId?: undefined;
            requestId?: undefined;
            commandType?: undefined;
        } | {
            id: string | undefined;
            version: number | undefined;
            invocationId: string | undefined;
            requestId: string | undefined;
            commandType: string | undefined;
        };
        mixinMergeStrategy(mergeObject: any, mixinObject: any): any;
    }>;
    constructor(partitionAdapter: PartitionAdapter);
    /**
     * Handles partitioning operation for the connector which supports the partitioning.
     *
     * @param context Context
     * @param input StdAccountListInput
     * @param res Response<StdAccountListOutput>
     */
    handler(context: Context, input: StdAccountListInput, res: Response<StdAccountListOutput>): Promise<void>;
}
//# sourceMappingURL=partitionAdapter.d.ts.map