import { Context } from './connector-handler';
import { ConnectorCustomizerHandler, StdTestConnectionAfterHandler, StdTestConnectionBeforeHandler, StdAccountCreateAfterHandler, StdAccountCreateBeforeHandler, StdAccountReadAfterHandler, StdAccountReadBeforeHandler, StdAccountUpdateAfterHandler, StdAccountUpdateBeforeHandler, StdAccountDeleteAfterHandler, StdAccountDeleteBeforeHandler, StdAccountEnableAfterHandler, StdAccountEnableBeforeHandler, StdAccountDisableAfterHandler, StdAccountDisableBeforeHandler, StdAccountUnlockAfterHandler, StdAccountUnlockBeforeHandler, StdAccountListBeforeHandler, StdAuthenticateAfterHandler, StdAuthenticateBeforeHandler, StdEntitlementReadAfterHandler, StdEntitlementReadBeforeHandler, StdEntitlementListBeforeHandler, StdEntitlementListAfterHandler, StdChangePasswordAfterHandler, StdChangePasswordBeforeHandler, StdSourceDataDiscoverBeforeHandler, StdSourceDataDiscoverAfterHandler, StdSourceDataReadBeforeHandler, StdSourceDataReadAfterHandler, StdConfigOptionsAfterHandler, StdConfigOptionsBeforeHandler, StdApplicationDiscoveryListBeforeHandler, StdApplicationDiscoveryListAfterHandler, StdAccountListAfterHandler, CustomizedOperationHandler } from './connector-customizer-handler';
/**
 * Connector customizer to build by attaching handlers for supported commands.
 */
export declare class ConnectorCustomizer {
    private readonly _handlers;
    private readonly _customizedOperationHandlers;
    constructor();
    /**
     * Get the map of command handlers
     */
    get handlers(): Map<string, ConnectorCustomizerHandler>;
    /**
     * Get the map of custom operation handlers
     */
    get customizedOperationHandlers(): Map<string, ConnectorCustomizerHandler>;
    /**
     * Add a before handler for 'std:test-connection' command
     * @param handler handler
     */
    beforeStdTestConnection(handler: StdTestConnectionBeforeHandler): this;
    /**
     * Add an after handler for 'std:test-connection' command
     * @param handler handler
     */
    afterStdTestConnection(handler: StdTestConnectionAfterHandler): this;
    /**
     * Add a before handler for 'std:account:create' command
     * @param handler handler
     */
    beforeStdAccountCreate(handler: StdAccountCreateBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:create' command
     * @param handler handler
     */
    afterStdAccountCreate(handler: StdAccountCreateAfterHandler): this;
    /**
     * Add a before handler for 'std:account:read' command
     * @param handler handler
     */
    beforeStdAccountRead(handler: StdAccountReadBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:read' command
     * @param handler handler
     */
    afterStdAccountRead(handler: StdAccountReadAfterHandler): this;
    /**
     * Add a before handler for 'std:account:update' command
     * @param handler handler
     */
    beforeStdAccountUpdate(handler: StdAccountUpdateBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:update' command
     * @param handler handler
     */
    afterStdAccountUpdate(handler: StdAccountUpdateAfterHandler): this;
    /**
     * Add a before handler for 'std:account:delete' command
     * @param handler handler
     */
    beforeStdAccountDelete(handler: StdAccountDeleteBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:delete' command
     * @param handler handler
     */
    afterStdAccountDelete(handler: StdAccountDeleteAfterHandler): this;
    /**
     * Add a before handler for 'std:account:enable' command
     * @param handler handler
     */
    beforeStdAccountEnable(handler: StdAccountEnableBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:enable' command
     * @param handler handler
     */
    afterStdAccountEnable(handler: StdAccountEnableAfterHandler): this;
    /**
     * Add a before handler for 'std:account:disable' command
     * @param handler handler
     */
    beforeStdAccountDisable(handler: StdAccountDisableBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:disable' command
     * @param handler handler
     */
    afterStdAccountDisable(handler: StdAccountDisableAfterHandler): this;
    /**
     * Add a before handler for 'std:account:unlock' command
     * @param handler handler
     */
    beforeStdAccountUnlock(handler: StdAccountUnlockBeforeHandler): this;
    /**
     * Add an after handler for 'std:account:unlock' command
     * @param handler handler
     */
    afterStdAccountUnlock(handler: StdAccountUnlockAfterHandler): this;
    /**
     * Add a before handler for 'std:account:list' command
     * @param handler handler
     */
    beforeStdAccountList(handler: StdAccountListBeforeHandler): this;
    /**
     * Add a after handler for 'std:account:list' command
     * @param handler handler
     */
    afterStdAccountList(handler: StdAccountListAfterHandler): this;
    /**
     * Add a before handler for 'std:authenticate' command
     * @param handler handler
     */
    beforeStdAuthenticate(handler: StdAuthenticateBeforeHandler): this;
    /**
     * Add an after handler for 'std:authenticate' command
     * @param handler handler
     */
    afterStdAuthenticate(handler: StdAuthenticateAfterHandler): this;
    /**
     * Add a before handler for 'std:config-options:read' command
     * @param handler handler
     */
    beforeStdConfigOptions(handler: StdConfigOptionsBeforeHandler): this;
    /**
     * Add an after handler for 'std:config-options:read' command
     * @param handler handler
     */
    afterStdConfigOptions(handler: StdConfigOptionsAfterHandler): this;
    /**
     * Add a before handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    beforeStdApplicationDiscoveryList(handler: StdApplicationDiscoveryListBeforeHandler): this;
    /**
     * Add an after handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    afterStdApplicationDiscoveryList(handler: StdApplicationDiscoveryListAfterHandler): this;
    /**
     * Add a before handler for 'std:entitlement:read' command
     * @param handler handler
     */
    beforeStdEntitlementRead(handler: StdEntitlementReadBeforeHandler): this;
    /**
     * Add an after handler for 'std:entitlement:read' command
     * @param handler handler
     */
    afterStdEntitlementRead(handler: StdEntitlementReadAfterHandler): this;
    /**
     * Add a before handler for 'std:entitlement:list' command
     * @param handler handler
     */
    beforeStdEntitlementList(handler: StdEntitlementListBeforeHandler): this;
    /**
     * Add a after handler for 'std:entitlement:list' command
     * @param handler handler
     */
    afterStdEntitlementList(handler: StdEntitlementListAfterHandler): this;
    /**
     * Add a before handler for 'std:change-password' command
     * @param handler handler
     */
    beforeStdChangePassword(handler: StdChangePasswordBeforeHandler): this;
    /**
     * Add an after handler for 'std:change-password' command
     * @param handler handler
     */
    afterStdChangePassword(handler: StdChangePasswordAfterHandler): this;
    /**
     * Add a before handler for 'std:source-data:discover' command
     * @param handler handler
     */
    beforeStdSourceDataDiscover(handler: StdSourceDataDiscoverBeforeHandler): this;
    /**
     * Add a before handler for 'std:source-data:discover' command
     * @param handler handler
     */
    afterStdSourceDataDiscover(handler: StdSourceDataDiscoverAfterHandler): this;
    /**
     * Add a before handler for 'std:source-data:read' command
     * @param handler handler
     */
    beforeStdSourceDataRead(handler: StdSourceDataReadBeforeHandler): this;
    /**
     * Add a before handler for 'std:source-data:read' command
     * @param handler handler
     */
    afterStdSourceDataRead(handler: StdSourceDataReadAfterHandler): this;
    /**
     * Add customized handler to be consumed by connector
     * @param handler handler
     */
    customizedOperation(operationIdentifier: string, handler: CustomizedOperationHandler): this;
    /**
     * Generate handler key base on customizer type and command type
     *
     * @param customizerType customizer type
     * @param cmdType command type
     */
    handlerKey(customizerType: CustomizerType, cmdType: string): string;
    /**
     * Execute the handler for given type.
     * Type is a comibination of command type and customizer type, for example, before:std:account:read
     *
     * @param type handler type
     * @param context connector context
     * @param input input to the handler function
     */
    _exec(type: string, context: Context, input: any): Promise<any>;
}
/**
 * Creates a connector customizer instance with default options
 */
export declare const createConnectorCustomizer: () => ConnectorCustomizer;
/**
 * Type of handlers for the connector customizer
 */
export declare enum CustomizerType {
    Before = "before",
    After = "after"
}
//# sourceMappingURL=connector-customizer.d.ts.map