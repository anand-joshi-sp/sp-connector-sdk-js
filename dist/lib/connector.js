"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnector = exports.Connector = void 0;
const connector_spec_1 = require("./connector-spec");
const commands_1 = require("./commands");
const response_1 = require("./response");
const stream_1 = require("stream");
const async_context_1 = require("./async-context");
const connector_customizer_1 = require("./connector-customizer");
const dataset_ids_1 = require("./dataset-ids");
const SDK_VERSION = 1;
/**
 * Connector to build by attaching handlers for supported commands.
 */
class Connector {
    constructor() {
        this._sdkVersion = Connector.SDK_VERSION;
        this._handlers = new Map();
        this.command(commands_1.StandardCommand.StdSpecRead, connector_spec_1.StdSpecReadDefaultHandler);
    }
    /**
     * Get this Connector SDK's major version
     */
    get sdkVersion() {
        return this._sdkVersion;
    }
    /**
     * Get the map of command handlers
     */
    get handlers() {
        return this._handlers;
    }
    /**
     * Add a handler for 'std:account:create' command
     * @param handler handler
     */
    stdAccountCreate(handler) {
        return this.command(commands_1.StandardCommand.StdAccountCreate, handler);
    }
    /**
     * Add a handler for 'std:account:delete' command
     * @param handler handler
     */
    stdAccountDelete(handler) {
        return this.command(commands_1.StandardCommand.StdAccountDelete, handler);
    }
    /**
     * Add a handler for 'std:account:delete' command
     * @param handler handler
     */
    stdAccountDisable(handler) {
        return this.command(commands_1.StandardCommand.StdAccountDisable, handler);
    }
    /**
     * Add a handler for 'std:account:discover-schema' command
     * @param handler handler
     */
    stdAccountDiscoverSchema(handler) {
        return this.command(commands_1.StandardCommand.StdAccountDiscoverSchema, handler);
    }
    /**
     * Add a handler for 'std:account:enable' command
     * @param handler handler
     */
    stdAccountEnable(handler) {
        return this.command(commands_1.StandardCommand.StdAccountEnable, handler);
    }
    /**
     * Add a handler for 'std:account:list' command
     * @param handler handler
     */
    stdAccountList(handler) {
        return this.command(commands_1.StandardCommand.StdAccountList, handler);
    }
    /**
     * Add a handler for 'std:account:read' command
     * @param handler handler
     */
    stdAccountRead(handler) {
        return this.command(commands_1.StandardCommand.StdAccountRead, handler);
    }
    /**
     * Add a handler for 'std:account:unlock' command
     * @param handler handler
     */
    stdAccountUnlock(handler) {
        return this.command(commands_1.StandardCommand.StdAccountUnlock, handler);
    }
    /**
     * Add a handler for 'std:account:update' command
     * @param handler handler
     */
    stdAccountUpdate(handler) {
        return this.command(commands_1.StandardCommand.StdAccountUpdate, handler);
    }
    /**
     * Add a handler for 'std:authenticate' command
     * @param handler handler
     */
    stdAuthenticate(handler) {
        return this.command(commands_1.StandardCommand.StdAuthenticate, handler);
    }
    /**
     * Add a handler for 'std:config-options:read' command
     * @param handler handler
     */
    stdConfigOptions(handler) {
        return this.command(commands_1.StandardCommand.StdConfigOptions, handler);
    }
    /**
     * Add a handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    stdApplicationDiscoveryList(handler) {
        return this.command(commands_1.StandardCommand.StdApplicationDiscoveryList, handler);
    }
    /**
     * Add a handler for 'std:application-discovery:list' command with dataset context
     * @param handler Standard handler for dataset-aware discovery list
     * If datasetIds are provided in the input, the datasetHandler will be called for each unique datasetId
     * If datasetIds are not provided, the standard handler will be called
     */
    stdApplicationDiscoveryListWithDataset(handler) {
        return this.command(commands_1.StandardCommand.StdApplicationDiscoveryList, async (context, input, res) => {
            // Helper function to build handler input
            const buildHandlerInput = (datasetId, additionalParams) => {
                const handlerInput = { datasetId };
                if (additionalParams) {
                    handlerInput.additionalParameters = additionalParams;
                }
                return handlerInput;
            };
            // Fallback (to be deprecated after migration)
            if (!input || !Array.isArray(input.datasetIds) || input.datasetIds.length === 0) {
                const datasetId = input?.datasetId || '';
                const additionalParams = input?.additionalParameters;
                console.log(`Received input - datasetId: ${datasetId}, additionalParameters: ${JSON.stringify(additionalParams || {})}`);
                await handler(context, buildHandlerInput(datasetId, additionalParams), res);
                return;
            }
            // Dataset-aware handling
            for (const datasetId of (0, dataset_ids_1.uniqueDatasetIds)(input.datasetIds)) {
                const datasetRes = new response_1.ResponseStreamTransform(res, (v) => {
                    return {
                        ...v,
                        datasetId,
                    };
                });
                const additionalParams = input?.additionalParameters;
                console.log(`Processing dataset ${datasetId} with additionalParameters: ${JSON.stringify(additionalParams || {})}`);
                await handler(context, buildHandlerInput(datasetId, additionalParams), datasetRes);
            }
        });
    }
    /**
     * Add a handler for 'std:entitlement:list' command
     * @param handler handler
     */
    stdEntitlementList(handler) {
        return this.command(commands_1.StandardCommand.StdEntitlementList, handler);
    }
    /**
     * Add a handler for 'std:entitlement:read' command
     * @param handler handler
     */
    stdEntitlementRead(handler) {
        return this.command(commands_1.StandardCommand.StdEntitlementRead, handler);
    }
    /**
     * Add a handler for 'std:test-connection' command
     * @param handler handler
     */
    stdTestConnection(handler) {
        return this.command(commands_1.StandardCommand.StdTestConnection, handler);
    }
    /**
     * Add a handler for 'std:change-password' command
     * @param handler handler
     */
    stdChangePassword(handler) {
        return this.command(commands_1.StandardCommand.StdChangePassword, handler);
    }
    /**
     * Add a handler for 'std:source-data:discover' command
     * @param handler handler
     */
    stdSourceDataDiscover(handler) {
        return this.command(commands_1.StandardCommand.StdSourceDataDiscover, handler);
    }
    /**
     * Add a handler for 'std:source-data:read' command
     * @param handler handler
     */
    stdSourceDataRead(handler) {
        return this.command(commands_1.StandardCommand.StdSourceDataRead, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:discover' command
     * @param handler handler
     */
    stdSsfStreamDiscover(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamDiscover, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:read' command
     * @param handler handler
     */
    stdSsfStreamRead(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamRead, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:create' command
     * @param handler handler
     */
    stdSsfStreamCreate(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamCreate, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:update' command
     * @param handler handler
     */
    stdSsfStreamUpdate(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamUpdate, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:status-update' command
     * @param handler handler
     */
    stdSsfStreamStatusUpdate(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamStatusUpdate, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:delete' command
     * @param handler handler
     */
    stdSsfStreamDelete(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamDelete, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:verify' command
     * @param handler handler
     */
    stdSsfStreamVerify(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamVerify, handler);
    }
    /**
     * Add a handler for 'std:ssf-stream:replace' command
     * @param handler handler
     */
    stdSsfStreamReplace(handler) {
        return this.command(commands_1.StandardCommand.StdSsfStreamReplace, handler);
    }
    /**
     * @deprecated The 'std:agent:list' command is deprecated, please use 'std:machine-identity:list'
     * Add a handler for 'std:agent:list' command
     * @param handler handler
     */
    stdAgentList(handler) {
        return this.command(commands_1.StandardCommand.StdAgentList, async (context, input, res) => {
            for (const datasetId of (0, dataset_ids_1.uniqueDatasetIds)(input.datasetIds)) {
                const datasetRes = new response_1.ResponseStreamTransform(res, (v) => {
                    return {
                        ...v,
                        datasetId,
                    };
                });
                const datasetSchema = input.datasetSchemas?.[datasetId];
                const handlerInput = datasetSchema ? { datasetId, datasetSchema } : { datasetId };
                await handler(context, handlerInput, datasetRes);
            }
        });
    }
    /**
     * Add a handler for 'std:machine-identityt:list' command
     * @param handler handler
     */
    stdMachineIdentityList(handler) {
        return this.command(commands_1.StandardCommand.StdMachineIdentityList, async (context, input, res) => {
            for (const datasetId of (0, dataset_ids_1.uniqueDatasetIds)(input.datasetIds)) {
                const datasetRes = new response_1.ResponseStreamTransform(res, (v) => {
                    return {
                        ...v,
                        datasetId,
                    };
                });
                const datasetSchema = input.datasetSchemas?.[datasetId];
                const handlerInput = datasetSchema
                    ? { datasetId, datasetSchema }
                    : { datasetId };
                await handler(context, handlerInput, datasetRes);
            }
        });
    }
    /**
     * Add a handler for 'std:resource:list' command
     * @param handler handler
     */
    stdResourceList(handler) {
        const singleDatasetHandler = this.injectDatasetId(handler);
        return this.command(commands_1.StandardCommand.StdResourceList, async (context, input, res) => {
            if (!input ||
                !('datasetIds' in input) ||
                !Array.isArray(input.datasetIds) ||
                input.datasetIds.length === 0) {
                await singleDatasetHandler(context, input, res);
                return;
            }
            const { datasetIds, ...sharedInput } = input;
            for (const datasetId of (0, dataset_ids_1.uniqueDatasetIds)(datasetIds)) {
                await singleDatasetHandler(context, { ...sharedInput, datasetId }, res);
            }
        });
    }
    /**
     * Add a handler for 'std:resource:delete' command
     * @param handler handler
     */
    stdResourceDelete(handler) {
        return this.command(commands_1.StandardCommand.StdResourceDelete, this.injectDatasetId(handler));
    }
    /**
     * Add a handler for 'std:resource:disable' command
     * @param handler handler
     */
    stdResourceDisable(handler) {
        return this.command(commands_1.StandardCommand.StdResourceDisable, this.injectDatasetId(handler));
    }
    /**
     * Add a handler for 'std:resource:enable' command
     * @param handler handler
     */
    stdResourceEnable(handler) {
        return this.command(commands_1.StandardCommand.StdResourceEnable, this.injectDatasetId(handler));
    }
    /**
     * Wrap a std:resource:* handler so the SDK stamps datasetId from the command input
     * onto every emitted output object. datasetId is a required input for these commands,
     * so this guarantees each resource is attributed to its dataset without requiring
     * connector authors to set it explicitly on every output.
     * @param handler handler
     */
    injectDatasetId(handler) {
        return async (context, input, res) => {
            const datasetRes = new response_1.ResponseStreamTransform(res, (v) => {
                return {
                    ...v,
                    datasetId: input.datasetId,
                };
            });
            await handler(context, input, datasetRes);
        };
    }
    /**
     * Add a handler for a command of specified type
     * @param type command type
     * @param handler handler
     */
    command(type, handler) {
        this._handlers.set(type, handler);
        return this;
    }
    /**
     * Execute the handler for given command type
     *
     * Note: This function MUST NOT be called by the connector directly
     *
     * @param type command type
     * @param context connector context
     * @param input command input
     * @param res writable
     */
    async _exec(type, context, input, res, customizer) {
        let totalTime = 0;
        let roCount = 0;
        const handler = this._handlers.get(type);
        if (!handler) {
            throw new Error(`unsupported command: ${type}`);
        }
        await async_context_1.contextState.run(context, async () => {
            // If customizer does not exist, we just run the command handler itself.
            if (!customizer) {
                return handler(context, input, new response_1.ResponseStream(res));
            }
            // If before handler exists, run the before handler and updates the command input
            let beforeHandler = customizer.handlers.get(customizer.handlerKey(connector_customizer_1.CustomizerType.Before, type));
            if (beforeHandler) {
                input = await beforeHandler(context, input);
            }
            // If after handler does not exist, run the command handler with updated input
            let afterHandler = customizer.handlers.get(customizer.handlerKey(connector_customizer_1.CustomizerType.After, type));
            if (!afterHandler) {
                return handler(context, input, new response_1.ResponseStream(res));
            }
            // If after handler exists, run the after handler with an interceptor. Because we pass in writable to the command handlder,
            // we need an interceptor to capture the result from the command handler, run that though the after handler and then write
            // the final result to the original writable stream
            let resInterceptor = new stream_1.Transform({
                writableObjectMode: true,
                async transform(rawResponse, encoding, callback) {
                    if (rawResponse.type == response_1.ResponseType.Output) {
                        try {
                            const start = performance.now();
                            rawResponse.data = await afterHandler(context, rawResponse.data);
                            const end = performance.now();
                            res.write(rawResponse);
                            // Accumulate the total time
                            totalTime += end - start;
                            roCount++;
                            callback();
                        }
                        catch (e) {
                            callback(e);
                        }
                    }
                    else {
                        res.write(rawResponse);
                        callback();
                    }
                },
            });
            // We need to wait on the interceptor to be done writting and flushing before we resolve the promise. If we don't wait,
            // the interceptor could be ended but is still flushing while this _exec method is resolved. That would cause the writable
            // stream that get passed into this _exec method to end as well, and then receive another write call, causing that stream to fail.
            let interceptorComplete = new Promise((resolve, reject) => {
                resInterceptor.on('finish', function () {
                    // Calculate the average time once all chunks are processed. Here roCount should never be 0
                    const averageTime = totalTime / roCount;
                    console.log(`After customizer time total execution time: ${totalTime} ms`);
                    console.log(`Average time per output: ${averageTime.toFixed(2)} ms`);
                    resolve();
                });
                resInterceptor.on('error', function (e) {
                    // Calculate the average time once all chunks are processed
                    const averageTime = roCount > 0 ? totalTime / roCount : 0;
                    console.log(`After customizer time total execution time: ${totalTime} ms`);
                    console.log(`Average time per output: ${averageTime.toFixed(2)} ms`);
                    reject(e);
                });
            });
            await handler(context, input, new response_1.ResponseStream(resInterceptor));
            resInterceptor.end();
            await interceptorComplete;
        });
    }
}
exports.Connector = Connector;
Connector.SDK_VERSION = SDK_VERSION;
/**
 * Creates a connector instance with default options
 */
const createConnector = () => {
    return new Connector();
};
exports.createConnector = createConnector;
//# sourceMappingURL=connector.js.map