"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorError = exports.ConnectorErrorType = void 0;
/**
 * Connector error types
 */
var ConnectorErrorType;
(function (ConnectorErrorType) {
    ConnectorErrorType["Generic"] = "generic";
    ConnectorErrorType["NotFound"] = "notFound";
})(ConnectorErrorType = exports.ConnectorErrorType || (exports.ConnectorErrorType = {}));
/**
 * Connector error types
 */
class ConnectorError extends Error {
    constructor(message, type = ConnectorErrorType.Generic) {
        super(message);
        this.type = type;
    }
}
exports.ConnectorError = ConnectorError;
//# sourceMappingURL=error.js.map