"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssumeAwsRoleResponse = exports.AssumeAwsRoleRequest = void 0;
class AssumeAwsRoleRequest {
    constructor(roleArn, externalId, roleSessionName) {
        this.roleArn = roleArn;
        this.externalId = externalId;
        this.roleSessionName = roleSessionName;
    }
}
exports.AssumeAwsRoleRequest = AssumeAwsRoleRequest;
class AssumeAwsRoleResponse {
    constructor(accessKeyId, secretAccessKey, sessionToken, expiration) {
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
        this.sessionToken = sessionToken;
        this.expiration = expiration;
    }
}
exports.AssumeAwsRoleResponse = AssumeAwsRoleResponse;
//# sourceMappingURL=connector-handler.js.map