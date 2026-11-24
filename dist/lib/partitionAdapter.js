"use strict";
/* Copyright (c) 2024. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartitionHandler = void 0;
const _1 = require(".");
class PartitionHandler {
    constructor(partitionAdapter) {
        this.childLogger = _1.logger.child({ Component: 'Partition Handler', timestamp: `${new Date(Date.now()).toISOString()}` });
        this.partitionAdapter = partitionAdapter;
    }
    /**
     * Handles partitioning operation for the connector which supports the partitioning.
     *
     * @param context Context
     * @param input StdAccountListInput
     * @param res Response<StdAccountListOutput>
     */
    async handler(context, input, res) {
        const config = await (0, _1.readConfig)();
        const isPatitionEnabled = config.partitionAggregationEnabled;
        this.childLogger.info(`Partition aggregation enabled -  ${isPatitionEnabled}`);
        var partitionList;
        // Get the partitions from the connector if partitining is enabled
        if (isPatitionEnabled) {
            let startTime = new Date().getTime();
            partitionList = await this.partitionAdapter.getPartitions(context, input);
            let endTime = new Date().getTime();
            this.childLogger.info(`Time taken to return partitions - ${endTime - startTime} milliseconds`);
        }
        if (partitionList != undefined && partitionList.length > 0) {
            let partitionCount = partitionList.length;
            this.childLogger.info(`Number of partitons returned - ${partitionCount}`);
            let promises = [];
            let partitionsDone = 0;
            for (const partition of partitionList) {
                promises.push((async () => {
                    let startTime = new Date().getTime();
                    await this.partitionAdapter.list(context, input, res, partition);
                    let endTime = new Date().getTime();
                    partitionsDone += 1;
                    this.childLogger.info(`Partition ${partitionsDone} of ${partitionCount} done after ${endTime - startTime} milliseconds`);
                })());
            }
            await Promise.all(promises);
        }
        else {
            return await this.partitionAdapter.list(context, input, res, undefined);
        }
    }
}
exports.PartitionHandler = PartitionHandler;
//# sourceMappingURL=partitionAdapter.js.map