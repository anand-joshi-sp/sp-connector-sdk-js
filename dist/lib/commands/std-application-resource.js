"use strict";
/* Copyright (c) 2026. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildStdApplicationResourceOutput = exports.validateStdApplicationResourceOutput = exports.STD_APPLICATION_RESOURCE_TYPE = void 0;
const error_1 = require("../error");
exports.STD_APPLICATION_RESOURCE_TYPE = 'std:application';
const stringAttributes = [
    'applicationName',
    'primaryAppName',
    'description',
    'secondaryAppName',
    'status',
    'connectorCategory',
    'logo',
    'appUrl',
    'createdAt',
    'updatedAt',
    'usersCount',
    'businessCriticality',
    'dataClassification',
    'businessUnit',
    'installType',
    'environment',
    'warrantyExpiration',
    'operationalStatus',
];
const numberAttributes = ['licenseCount', 'riskScore', 'totalSigninsCount'];
const booleanAttributes = ['isSanctioned', 'isBusiness', 'isPrivileged'];
const stringArrayAttributes = ['applicationOwner', 'itApplicationOwner'];
const riskLevels = ['High', 'Medium', 'Low'];
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function requireNonEmptyString(value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new error_1.ConnectorError(`${path} must be a non-empty string`);
    }
}
function validateOptionalAttributeTypes(attributes) {
    for (const name of stringAttributes) {
        if (attributes[name] !== undefined && typeof attributes[name] !== 'string') {
            throw new error_1.ConnectorError(`attributes.${name} must be a string`);
        }
    }
    for (const name of numberAttributes) {
        if (attributes[name] !== undefined && typeof attributes[name] !== 'number') {
            throw new error_1.ConnectorError(`attributes.${name} must be a number`);
        }
    }
    for (const name of booleanAttributes) {
        if (attributes[name] !== undefined && typeof attributes[name] !== 'boolean') {
            throw new error_1.ConnectorError(`attributes.${name} must be a boolean`);
        }
    }
    for (const name of stringArrayAttributes) {
        if (attributes[name] !== undefined &&
            (!Array.isArray(attributes[name]) || attributes[name].some((value) => typeof value !== 'string'))) {
            throw new error_1.ConnectorError(`attributes.${name} must be an array of strings`);
        }
    }
    if (attributes.groups !== undefined &&
        (!Array.isArray(attributes.groups) || attributes.groups.some((value) => !isRecord(value)))) {
        throw new error_1.ConnectorError('attributes.groups must be an array of objects');
    }
    if (attributes.riskLevel !== undefined && !riskLevels.includes(attributes.riskLevel)) {
        throw new error_1.ConnectorError('attributes.riskLevel must be High, Medium, or Low');
    }
}
function validateLinkEndpoint(value, path, requireId) {
    if (!isRecord(value)) {
        throw new error_1.ConnectorError(`${path} must be an object`);
    }
    if (requireId) {
        requireNonEmptyString(value.id, `${path}.id`);
    }
    else if (typeof value.id !== 'string') {
        // The target of a link may be resolved by the platform later, so an empty id is allowed.
        throw new error_1.ConnectorError(`${path}.id must be a string`);
    }
    requireNonEmptyString(value.resourceType, `${path}.resourceType`);
    if (value.attributes !== undefined && !isRecord(value.attributes)) {
        throw new error_1.ConnectorError(`${path}.attributes must be an object`);
    }
}
function validateResourceLinks(value) {
    if (!Array.isArray(value)) {
        throw new error_1.ConnectorError('resourceLinks must be an array');
    }
    value.forEach((link, index) => {
        if (!isRecord(link)) {
            throw new error_1.ConnectorError(`resourceLinks[${index}] must be an object`);
        }
        requireNonEmptyString(link.type, `resourceLinks[${index}].type`);
        validateLinkEndpoint(link.from, `resourceLinks[${index}].from`, true);
        validateLinkEndpoint(link.to, `resourceLinks[${index}].to`, false);
        if (link.attributes !== undefined && !isRecord(link.attributes)) {
            throw new error_1.ConnectorError(`resourceLinks[${index}].attributes must be an object`);
        }
    });
}
/**
 * Runtime validator for a discovered application returned by `std:resource:list`.
 *
 * Returns the same object after validation so it can be used at command boundaries.
 */
function validateStdApplicationResourceOutput(value) {
    if (!isRecord(value)) {
        throw new error_1.ConnectorError('application resource must be an object');
    }
    requireNonEmptyString(value.identity, 'identity');
    requireNonEmptyString(value.datasetId, 'datasetId');
    requireNonEmptyString(value.resourceId, 'resourceId');
    if (value.uuid !== undefined && typeof value.uuid !== 'string') {
        throw new error_1.ConnectorError('uuid must be a string');
    }
    if (value.resourceType !== exports.STD_APPLICATION_RESOURCE_TYPE) {
        throw new error_1.ConnectorError(`resourceType must be ${exports.STD_APPLICATION_RESOURCE_TYPE}`);
    }
    if (!isRecord(value.attributes)) {
        throw new error_1.ConnectorError('attributes must be an object');
    }
    if (value.attributes.discovered !== true) {
        throw new error_1.ConnectorError('attributes.discovered must be true');
    }
    requireNonEmptyString(value.attributes.applicationName, 'attributes.applicationName');
    requireNonEmptyString(value.attributes.primaryAppName, 'attributes.primaryAppName');
    if (typeof value.attributes.description !== 'string') {
        throw new error_1.ConnectorError('attributes.description must be a string');
    }
    validateOptionalAttributeTypes(value.attributes);
    validateResourceLinks(value.resourceLinks);
    return value;
}
exports.validateStdApplicationResourceOutput = validateStdApplicationResourceOutput;
/**
 * Builds and validates a discovered application resource with the required discriminator.
 */
function buildStdApplicationResourceOutput(input) {
    return validateStdApplicationResourceOutput({
        ...input,
        resourceType: exports.STD_APPLICATION_RESOURCE_TYPE,
        attributes: {
            ...input.attributes,
            discovered: true,
        },
        resourceLinks: input.resourceLinks ?? [],
    });
}
exports.buildStdApplicationResourceOutput = buildStdApplicationResourceOutput;
//# sourceMappingURL=std-application-resource.js.map