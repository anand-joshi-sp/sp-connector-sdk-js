"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultMessageLevel = exports.ResultStatus = exports.CompoundKey = exports.SimpleKey = exports.KeyUniqueID = exports.KeyLookupID = exports.KeyID = exports.StandardCommand = void 0;
/**
 * SailPoint Standard Commands
 */
var StandardCommand;
(function (StandardCommand) {
    StandardCommand["StdAccountCreate"] = "std:account:create";
    StandardCommand["StdAccountDelete"] = "std:account:delete";
    StandardCommand["StdAccountDisable"] = "std:account:disable";
    StandardCommand["StdAccountDiscoverSchema"] = "std:account:discover-schema";
    StandardCommand["StdAccountEnable"] = "std:account:enable";
    StandardCommand["StdAccountList"] = "std:account:list";
    StandardCommand["StdAccountRead"] = "std:account:read";
    StandardCommand["StdAccountUnlock"] = "std:account:unlock";
    StandardCommand["StdAccountUpdate"] = "std:account:update";
    StandardCommand["StdAgentList"] = "std:agent:list";
    StandardCommand["StdMachineIdentityList"] = "std:machine-identity:list";
    StandardCommand["StdResourceList"] = "std:resource:list";
    StandardCommand["StdResourceDelete"] = "std:resource:delete";
    StandardCommand["StdResourceDisable"] = "std:resource:disable";
    StandardCommand["StdResourceEnable"] = "std:resource:enable";
    StandardCommand["StdAuthenticate"] = "std:authenticate";
    StandardCommand["StdEntitlementList"] = "std:entitlement:list";
    StandardCommand["StdEntitlementRead"] = "std:entitlement:read";
    StandardCommand["StdSpecRead"] = "std:spec:read";
    StandardCommand["StdTestConnection"] = "std:test-connection";
    StandardCommand["StdChangePassword"] = "std:change-password";
    StandardCommand["StdSourceDataDiscover"] = "std:source-data:discover";
    StandardCommand["StdSourceDataRead"] = "std:source-data:read";
    StandardCommand["StdConfigOptions"] = "std:config-options:read";
    StandardCommand["StdApplicationDiscoveryList"] = "std:application-discovery:list";
    StandardCommand["StdSsfStreamDiscover"] = "std:ssf-stream:discover";
    StandardCommand["StdSsfStreamRead"] = "std:ssf-stream:read";
    StandardCommand["StdSsfStreamCreate"] = "std:ssf-stream:create";
    StandardCommand["StdSsfStreamUpdate"] = "std:ssf-stream:update";
    StandardCommand["StdSsfStreamStatusUpdate"] = "std:ssf-stream:status-update";
    StandardCommand["StdSsfStreamDelete"] = "std:ssf-stream:delete";
    StandardCommand["StdSsfStreamVerify"] = "std:ssf-stream:verify";
    StandardCommand["StdSsfStreamReplace"] = "std:ssf-stream:replace";
})(StandardCommand = exports.StandardCommand || (exports.StandardCommand = {}));
/*
 * Extract ID for simple key
 */
function KeyID(input) {
    if ("simple" in input.key) {
        return input.key.simple.id;
    }
    else {
        throw new Error("expected simple key type");
    }
}
exports.KeyID = KeyID;
/*
 * Extract Lookup ID for compound key
 */
function KeyLookupID(input) {
    if ("compound" in input.key) {
        return input.key.compound.lookupId;
    }
    else {
        throw new Error("expected compound key type");
    }
}
exports.KeyLookupID = KeyLookupID;
/*
 * Extract Unique ID for compound key
 */
function KeyUniqueID(input) {
    if ("compound" in input.key) {
        return input.key.compound.uniqueId;
    }
    else {
        throw new Error("expected compound key type");
    }
}
exports.KeyUniqueID = KeyUniqueID;
/*
 * Build SimpleKey
 */
function SimpleKey(id) {
    return {
        simple: { id: id }
    };
}
exports.SimpleKey = SimpleKey;
/*
 * Build CompoundKey
 */
function CompoundKey(lookupId, uniqueId) {
    return {
        compound: { lookupId: lookupId, uniqueId: uniqueId }
    };
}
exports.CompoundKey = CompoundKey;
/**
 * Status for result
 */
var ResultStatus;
(function (ResultStatus) {
    ResultStatus["Error"] = "error";
})(ResultStatus = exports.ResultStatus || (exports.ResultStatus = {}));
/**
 * Level for result message
 */
var ResultMessageLevel;
(function (ResultMessageLevel) {
    ResultMessageLevel["WARN"] = "WARN";
    ResultMessageLevel["ERROR"] = "ERROR";
})(ResultMessageLevel = exports.ResultMessageLevel || (exports.ResultMessageLevel = {}));
//# sourceMappingURL=command.js.map