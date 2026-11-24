"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._withConfig = exports.readConfig = void 0;
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
const async_hooks_1 = require("async_hooks");
const _configState = new async_hooks_1.AsyncLocalStorage();
/**
 * Reads in connector config
 */
const readConfig = async () => {
    const store = _configState.getStore();
    if (store) {
        return store.cfg;
    }
    const config = process.env['CONNECTOR_CONFIG'];
    if (!config) {
        throw new Error(`unexpected runtime error: missing connector config`);
    }
    try {
        return JSON.parse(Buffer.from(config, 'base64').toString());
    }
    catch (ignored) {
        throw new Error(`unexpected runtime error: failed to parse connector config`);
    }
};
exports.readConfig = readConfig;
/**
 * _withConfig executes callback and ensures that all readConfig calls in
 * callback return cfg
 */
const _withConfig = async (cfg, callback) => {
    const newState = { cfg: cfg };
    await _configState.run(newState, callback);
};
exports._withConfig = _withConfig;
//# sourceMappingURL=config.js.map