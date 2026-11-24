"use strict";
/* Copyright (c) 2023. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizerType = exports.createConnectorCustomizer = exports.ConnectorCustomizer = void 0;
const commands_1 = require("./commands");
const async_context_1 = require("./async-context");
/**
 * Connector customizer to build by attaching handlers for supported commands.
 */
class ConnectorCustomizer {
    constructor() {
        this._handlers = new Map();
        this._customizedOperationHandlers = new Map();
    }
    /**
     * Get the map of command handlers
     */
    get handlers() {
        return this._handlers;
    }
    /**
     * Get the map of custom operation handlers
     */
    get customizedOperationHandlers() {
        return this._customizedOperationHandlers;
    }
    /**
     * Add a before handler for 'std:test-connection' command
     * @param handler handler
     */
    beforeStdTestConnection(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdTestConnection), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:test-connection' command
     * @param handler handler
     */
    afterStdTestConnection(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdTestConnection), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:create' command
     * @param handler handler
     */
    beforeStdAccountCreate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountCreate), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:create' command
     * @param handler handler
     */
    afterStdAccountCreate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountCreate), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:read' command
     * @param handler handler
     */
    beforeStdAccountRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountRead), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:read' command
     * @param handler handler
     */
    afterStdAccountRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountRead), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:update' command
     * @param handler handler
     */
    beforeStdAccountUpdate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountUpdate), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:update' command
     * @param handler handler
     */
    afterStdAccountUpdate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountUpdate), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:delete' command
     * @param handler handler
     */
    beforeStdAccountDelete(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountDelete), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:delete' command
     * @param handler handler
     */
    afterStdAccountDelete(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountDelete), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:enable' command
     * @param handler handler
     */
    beforeStdAccountEnable(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountEnable), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:enable' command
     * @param handler handler
     */
    afterStdAccountEnable(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountEnable), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:disable' command
     * @param handler handler
     */
    beforeStdAccountDisable(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountDisable), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:disable' command
     * @param handler handler
     */
    afterStdAccountDisable(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountDisable), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:unlock' command
     * @param handler handler
     */
    beforeStdAccountUnlock(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountUnlock), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:account:unlock' command
     * @param handler handler
     */
    afterStdAccountUnlock(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountUnlock), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:account:list' command
     * @param handler handler
     */
    beforeStdAccountList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAccountList), handler);
        return this;
    }
    /**
     * Add a after handler for 'std:account:list' command
     * @param handler handler
     */
    afterStdAccountList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAccountList), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:authenticate' command
     * @param handler handler
     */
    beforeStdAuthenticate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdAuthenticate), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:authenticate' command
     * @param handler handler
     */
    afterStdAuthenticate(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdAuthenticate), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:config-options:read' command
     * @param handler handler
     */
    beforeStdConfigOptions(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdConfigOptions), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:config-options:read' command
     * @param handler handler
     */
    afterStdConfigOptions(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdConfigOptions), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    beforeStdApplicationDiscoveryList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdApplicationDiscoveryList), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:application-discovery:list' command
     * @param handler handler
     */
    afterStdApplicationDiscoveryList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdApplicationDiscoveryList), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:entitlement:read' command
     * @param handler handler
     */
    beforeStdEntitlementRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdEntitlementRead), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:entitlement:read' command
     * @param handler handler
     */
    afterStdEntitlementRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdEntitlementRead), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:entitlement:list' command
     * @param handler handler
     */
    beforeStdEntitlementList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdEntitlementList), handler);
        return this;
    }
    /**
     * Add a after handler for 'std:entitlement:list' command
     * @param handler handler
     */
    afterStdEntitlementList(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdEntitlementList), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:change-password' command
     * @param handler handler
     */
    beforeStdChangePassword(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdChangePassword), handler);
        return this;
    }
    /**
     * Add an after handler for 'std:change-password' command
     * @param handler handler
     */
    afterStdChangePassword(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdChangePassword), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:source-data:discover' command
     * @param handler handler
     */
    beforeStdSourceDataDiscover(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdSourceDataDiscover), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:source-data:discover' command
     * @param handler handler
     */
    afterStdSourceDataDiscover(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdSourceDataDiscover), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:source-data:read' command
     * @param handler handler
     */
    beforeStdSourceDataRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.Before, commands_1.StandardCommand.StdSourceDataRead), handler);
        return this;
    }
    /**
     * Add a before handler for 'std:source-data:read' command
     * @param handler handler
     */
    afterStdSourceDataRead(handler) {
        this._handlers.set(this.handlerKey(CustomizerType.After, commands_1.StandardCommand.StdSourceDataRead), handler);
        return this;
    }
    /**
     * Add customized handler to be consumed by connector
     * @param handler handler
     */
    customizedOperation(operationIdentifier, handler) {
        this._customizedOperationHandlers.set(operationIdentifier, handler);
        return this;
    }
    /**
     * Generate handler key base on customizer type and command type
     *
     * @param customizerType customizer type
     * @param cmdType command type
     */
    handlerKey(customizerType, cmdType) {
        return `${customizerType}:${cmdType}`;
    }
    /**
     * Execute the handler for given type.
     * Type is a comibination of command type and customizer type, for example, before:std:account:read
     *
     * @param type handler type
     * @param context connector context
     * @param input input to the handler function
     */
    async _exec(type, context, input) {
        const handler = this._handlers.get(type);
        if (!handler) {
            throw new Error(`No handler found for type: ${type}`);
        }
        return await async_context_1.contextState.run(context, () => handler(context, input));
    }
}
exports.ConnectorCustomizer = ConnectorCustomizer;
/**
 * Creates a connector customizer instance with default options
 */
const createConnectorCustomizer = () => {
    return new ConnectorCustomizer();
};
exports.createConnectorCustomizer = createConnectorCustomizer;
/**
 * Type of handlers for the connector customizer
 */
var CustomizerType;
(function (CustomizerType) {
    CustomizerType["Before"] = "before";
    CustomizerType["After"] = "after";
})(CustomizerType = exports.CustomizerType || (exports.CustomizerType = {}));
//# sourceMappingURL=connector-customizer.js.map