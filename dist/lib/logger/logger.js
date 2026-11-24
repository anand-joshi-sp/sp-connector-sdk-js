"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logLevel = void 0;
const pino_1 = __importDefault(require("pino"));
const async_context_1 = require("../async-context");
// sets log-level based on env variable
const logLevel = () => {
    const config = process.env['CONNECTOR_CONFIG'];
    if (config != undefined) {
        const configDecoded = JSON.parse(Buffer.from(config, 'base64').toString());
        const debugLoggingEnabled = configDecoded['spConnDebugLoggingEnabled'];
        if (debugLoggingEnabled != undefined && debugLoggingEnabled === true) {
            return 'debug';
        }
        else {
            return 'info';
        }
    }
    return 'info';
};
exports.logLevel = logLevel;
exports.logger = (0, pino_1.default)({
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    messageKey: 'message',
    level: (0, exports.logLevel)(),
    base: undefined,
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
    mixin() {
        const ctx = async_context_1.contextState.getStore();
        if (ctx === undefined) {
            return {};
        }
        return {
            id: ctx.id,
            version: ctx.version,
            invocationId: ctx.invocationId,
            requestId: ctx.requestId,
            commandType: ctx.commandType,
        };
    },
    mixinMergeStrategy(mergeObject, mixinObject) {
        return { ...mergeObject, ...mixinObject };
    }
});
//# sourceMappingURL=logger.js.map