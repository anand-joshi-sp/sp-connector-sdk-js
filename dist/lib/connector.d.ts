/// <reference types="node" />
import { CommandHandler, Context, StdAccountCreateHandler, StdAccountDeleteHandler, StdAccountDisableHandler, StdAccountDiscoverSchemaHandler, StdAccountEnableHandler, StdAccountListHandler, StdAccountReadHandler, StdAccountUnlockHandler, StdAccountUpdateHandler, StdAgentListHandler, StdAuthenticateHandler, StdEntitlementListHandler, StdEntitlementReadHandler, StdTestConnectionHandler, StdChangePasswordHandler, StdSourceDataDiscoverHandler, StdSourceDataReadHandler, StdConfigOptionsHandler, StdApplicationDiscoveryListHandler, StdApplicationDiscoveryDatasetListHandler, StdSsfStreamCreateHandler, StdSsfStreamDiscoverHandler, StdSsfStreamReadHandler, StdSsfStreamUpdateHandler, StdSsfStreamStatusUpdateHandler, StdSsfStreamDeleteHandler, StdSsfStreamVerifyHandler, StdSsfStreamReplaceHandler, StdMachineIdentityListHandler, StdResourceListHandler, StdResourceDeleteHandler, StdResourceDisableHandler, StdResourceEnableHandler } from './connector-handler';
import { Writable } from 'stream';
import { ConnectorCustomizer } from './connector-customizer';
/**
 * Connector to build by attaching handlers for supported commands.
 */
export declare class Connector {
    static readonly SDK_VERSION = 1;
    private readonly _sdkVersion;
    private readonly _handlers;
    constructor();
    /**
     * Get this Connector SDK's major version
     */
    get sdkVersion(): number;
    /**
     * Get the map of command handlers
     */
    get handlers(): Map<string, CommandHandler>;
    /**
     * Add a handler for 'std:account:create' command
     * @param handler handler
     */
    stdAccountCreate(handler: StdAccountCreateHandler): this;
    /**
     * Add a handler for 'std:account:delete' command
     * @param handler handler
     */
    stdAccountDelete(handler: StdAccountDeleteHandler): this;
    /**
     * Add a handler for 'std:account:delete' command
     * @param handler handler
     */
    stdAccountDisable(handler: StdAccountDisableHandler): this;
    /**
     * Add a handler for 'std:account:discover-schema' command
     * @param handler handler
     */
    stdAccountDiscoverSchema(handler: StdAccountDiscoverSchemaHandler): this;
    /**
     * Add a handler for 'std:account:enable' command
     * @param handler handler
     */
    stdAccountEnable(handler: StdAccountEnableHandler): this;
    /**
     * Add a handler for 'std:account:list' command
     * @param handler handler
     */
    stdAccountList(handler: StdAccountListHandler): this;
    /**
     * Add a handler for 'std:account:read' command
     * @param handler handler
     */
    stdAccountRead(handler: StdAccountReadHandler): this;
    /**
     * Add a handler for 'std:account:unlock' command
     * @param handler handler
     */
    stdAccountUnlock(handler: StdAccountUnlockHandler): this;
    /**
     * Add a handler for 'std:account:update' command
     * @param handler handler
     */
    stdAccountUpdate(handler: StdAccountUpdateHandler): this;
    /**
     * Add a handler for 'std:authenticate' command
     * @param handler handler
     */
    stdAuthenticate(handler: StdAuthenticateHandler): this;
    /**
     * Add a handler for 'std:config-options:read' command
     * @param handler handler
     */
    stdConfigOptions(handler: StdConfigOptionsHandler): this;
    /**
     * Add a handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    stdApplicationDiscoveryList(handler: StdApplicationDiscoveryListHandler): this;
    /**
     * Add a handler for 'std:application-discovery:list' command with dataset context
     * @param handler Standard handler for dataset-aware discovery list
     * If datasetIds are provided in the input, the datasetHandler will be called for each unique datasetId
     * If datasetIds are not provided, the standard handler will be called
     */
    stdApplicationDiscoveryListWithDataset(handler: StdApplicationDiscoveryDatasetListHandler): this;
    /**
     * Add a handler for 'std:entitlement:list' command
     * @param handler handler
     */
    stdEntitlementList(handler: StdEntitlementListHandler): this;
    /**
     * Add a handler for 'std:entitlement:read' command
     * @param handler handler
     */
    stdEntitlementRead(handler: StdEntitlementReadHandler): this;
    /**
     * Add a handler for 'std:test-connection' command
     * @param handler handler
     */
    stdTestConnection(handler: StdTestConnectionHandler): this;
    /**
     * Add a handler for 'std:change-password' command
     * @param handler handler
     */
    stdChangePassword(handler: StdChangePasswordHandler): this;
    /**
     * Add a handler for 'std:source-data:discover' command
     * @param handler handler
     */
    stdSourceDataDiscover(handler: StdSourceDataDiscoverHandler): this;
    /**
     * Add a handler for 'std:source-data:read' command
     * @param handler handler
     */
    stdSourceDataRead(handler: StdSourceDataReadHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:discover' command
     * @param handler handler
     */
    stdSsfStreamDiscover(handler: StdSsfStreamDiscoverHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:read' command
     * @param handler handler
     */
    stdSsfStreamRead(handler: StdSsfStreamReadHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:create' command
     * @param handler handler
     */
    stdSsfStreamCreate(handler: StdSsfStreamCreateHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:update' command
     * @param handler handler
     */
    stdSsfStreamUpdate(handler: StdSsfStreamUpdateHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:status-update' command
     * @param handler handler
     */
    stdSsfStreamStatusUpdate(handler: StdSsfStreamStatusUpdateHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:delete' command
     * @param handler handler
     */
    stdSsfStreamDelete(handler: StdSsfStreamDeleteHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:verify' command
     * @param handler handler
     */
    stdSsfStreamVerify(handler: StdSsfStreamVerifyHandler): this;
    /**
     * Add a handler for 'std:ssf-stream:replace' command
     * @param handler handler
     */
    stdSsfStreamReplace(handler: StdSsfStreamReplaceHandler): this;
    /**
     * @deprecated The 'std:agent:list' command is deprecated, please use 'std:machine-identity:list'
     * Add a handler for 'std:agent:list' command
     * @param handler handler
     */
    stdAgentList(handler: StdAgentListHandler): this;
    /**
     * Add a handler for 'std:machine-identityt:list' command
     * @param handler handler
     */
    stdMachineIdentityList(handler: StdMachineIdentityListHandler): this;
    /**
     * Add a handler for 'std:resource:list' command
     * @param handler handler
     */
    stdResourceList(handler: StdResourceListHandler): this;
    /**
     * Add a handler for 'std:resource:delete' command
     * @param handler handler
     */
    stdResourceDelete(handler: StdResourceDeleteHandler): this;
    /**
     * Add a handler for 'std:resource:disable' command
     * @param handler handler
     */
    stdResourceDisable(handler: StdResourceDisableHandler): this;
    /**
     * Add a handler for 'std:resource:enable' command
     * @param handler handler
     */
    stdResourceEnable(handler: StdResourceEnableHandler): this;
    /**
     * Wrap a std:resource:* handler so the SDK stamps datasetId from the command input
     * onto every emitted output object. datasetId is a required input for these commands,
     * so this guarantees each resource is attributed to its dataset without requiring
     * connector authors to set it explicitly on every output.
     * @param handler handler
     */
    private injectDatasetId;
    /**
     * Add a handler for a command of specified type
     * @param type command type
     * @param handler handler
     */
    command(type: string, handler: CommandHandler): this;
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
    _exec(type: string, context: Context, input: any, res: Writable, customizer?: ConnectorCustomizer): Promise<void>;
}
/**
 * Creates a connector instance with default options
 */
export declare const createConnector: () => Connector;
//# sourceMappingURL=connector.d.ts.map