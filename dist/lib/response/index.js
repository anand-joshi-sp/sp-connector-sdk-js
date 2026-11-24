"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStreamTransform = exports.PatchOp = exports.RawResponse = exports.ResponseType = exports.ResponseStream = void 0;
/**
 * Response implementation for sending command output in chunks
 */
class ResponseStream {
    constructor(writable) {
        this._writable = writable;
    }
    /**
     * Send command output
     * @param chunk output chunk
     */
    send(chunk) {
        this._writable.write(new RawResponse(chunk));
    }
    /**
     * Save state for stateful command
     * @param state the end state of running the stateful command
     */
    saveState(state) {
        this._writable.write(new RawResponse(state, ResponseType.State));
    }
    /**
     * Indicates that the commands is still running.
     *
     * Can be used to avoid a timeout error in the case when a command
     * is unable to return responses in a timely manner but is still
     * actively processing the command.
     */
    keepAlive() {
        this._writable.write(new RawResponse({}, ResponseType.KeepAlive));
    }
    patchConfig(patches) {
        this._writable.write(new RawResponse(patches, ResponseType.Config));
    }
}
exports.ResponseStream = ResponseStream;
/**
 * Enum representing different types of responses
 */
var ResponseType;
(function (ResponseType) {
    ResponseType["Output"] = "output";
    ResponseType["State"] = "state";
    ResponseType["KeepAlive"] = "keepAlive";
    ResponseType["Config"] = "config";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
/**
 * RawResponse is the response that sdk sends out as command output
 */
class RawResponse {
    constructor(data, type = ResponseType.Output) {
        this.data = data;
        this.type = type;
    }
}
exports.RawResponse = RawResponse;
/**
 * Enum PatchOp is the config patch operations
 */
var PatchOp;
(function (PatchOp) {
    PatchOp["Add"] = "add";
    PatchOp["Replace"] = "replace";
    PatchOp["Remove"] = "remove";
})(PatchOp = exports.PatchOp || (exports.PatchOp = {}));
/**
 * Response implementation which transforms output from I to O.
 */
class ResponseStreamTransform {
    constructor(inner, transform) {
        this._inner = inner;
        this._transform = transform;
    }
    /**
     * Send command output
     * @param chunk output chunk
     */
    send(chunk) {
        this._inner.send(this._transform(chunk));
    }
    /**
     * Save state for stateful command
     * @param state the end state of running the stateful command
     */
    saveState(state) {
        this._inner.saveState(state);
    }
    /**
     * Indicates that the commands is still running.
     *
     * Can be used to avoid a timeout error in the case when a command
     * is unable to return responses in a timely manner but is still
     * actively processing the command.
     */
    keepAlive() {
        this._inner.keepAlive();
    }
    patchConfig(patches) {
        this._inner.patchConfig(patches);
    }
}
exports.ResponseStreamTransform = ResponseStreamTransform;
//# sourceMappingURL=index.js.map