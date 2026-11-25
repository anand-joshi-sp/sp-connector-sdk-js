"use strict";
/* Copyright (c) 2026. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryBuildStdDiscoveredApplicationResourceOutput = exports.buildStdDiscoveredApplicationResourceOutput = exports.validateStdDiscoveredApplicationResourceOutput = exports.isDiscoveredApplicationResource = exports.STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES = exports.STD_APPLICATION_RESOURCE_TYPE = void 0;
const error_1 = require("../error");
const logger_1 = require("../logger");
/**
 * Discovered application resources returned through `std:resource:list`.
 *
 * Scope: everything in this module applies to **discovered applications only**, i.e. resources with
 * `resourceType: 'std:application'` AND `attributes.discovered: true`. `std:application` is also used by
 * connectors that are not discovery connectors; those resources must not be built or validated with this
 * module. Use {@link isDiscoveredApplicationResource} to gate any validation so that every other resource
 * passes through untouched.
 *
 * Nothing here is applied automatically by the SDK: it is opt-in, and `stdResourceList` and
 * `ResourceOutput` are unchanged.
 */
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
const otherValidatedAttributes = ['groups', 'riskLevel', 'discovered'];
const riskLevels = ['High', 'Medium', 'Low'];
/**
 * Canonical attribute names of a discovered application. Connector-specific attributes should not reuse
 * these names with different spelling or casing.
 */
exports.STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES = [
    ...stringAttributes,
    ...numberAttributes,
    ...booleanAttributes,
    ...stringArrayAttributes,
    ...otherValidatedAttributes,
];
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function requireNonEmptyString(value, path) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new error_1.ConnectorError(`${path} must be a non-empty string`);
    }
}
function normalizeAttributeName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/s$/, '');
}
const canonicalAttributeNames = new Set(exports.STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES);
const canonicalByNormalizedName = new Map(exports.STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES.map((name) => [normalizeAttributeName(name), name]));
const warnedLookalikeAttributes = new Set();
/**
 * Warns (once per attribute name per process) about attributes that look like a misspelled canonical
 * attribute, e.g. `appURL` or `applicationOwners`. Never throws: connector-specific attributes are allowed.
 */
function warnOnLookalikeAttributes(attributes) {
    for (const name of Object.keys(attributes)) {
        if (canonicalAttributeNames.has(name) || warnedLookalikeAttributes.has(name)) {
            continue;
        }
        const canonical = canonicalByNormalizedName.get(normalizeAttributeName(name));
        if (canonical !== undefined) {
            warnedLookalikeAttributes.add(name);
            logger_1.logger.warn({ component: 'std-discovered-application-resource', attribute: name, canonical }, `Discovered application attribute '${name}' looks like canonical attribute '${canonical}'`);
        }
    }
}
function validateOptionalAttributeTypes(attributes) {
    for (const name of stringAttributes) {
        if (attributes[name] !== undefined && typeof attributes[name] !== 'string') {
            throw new error_1.ConnectorError(`attributes.${name} must be a string`);
        }
    }
    for (const name of numberAttributes) {
        // Number.isFinite rejects NaN and Infinity, which would otherwise serialize to null.
        if (attributes[name] !== undefined && !Number.isFinite(attributes[name])) {
            throw new error_1.ConnectorError(`attributes.${name} must be a finite number`);
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
function validateResourceLinks(value, identity) {
    if (!Array.isArray(value)) {
        throw new error_1.ConnectorError('resourceLinks must be an array');
    }
    value.forEach((link, index) => {
        if (!isRecord(link)) {
            throw new error_1.ConnectorError(`resourceLinks[${index}] must be an object`);
        }
        requireNonEmptyString(link.type, `resourceLinks[${index}].type`);
        validateLinkEndpoint(link.from, `resourceLinks[${index}].from`, true);
        if (link.from.id !== identity) {
            throw new error_1.ConnectorError(`resourceLinks[${index}].from.id must equal the resource identity`);
        }
        validateLinkEndpoint(link.to, `resourceLinks[${index}].to`, false);
        if (link.attributes !== undefined && !isRecord(link.attributes)) {
            throw new error_1.ConnectorError(`resourceLinks[${index}].attributes must be an object`);
        }
    });
}
/**
 * Returns true only for a discovered application: `resourceType === 'std:application'` and
 * `attributes.discovered === true`.
 *
 * This is a gate, not a validation: it checks only the two discriminators, so the narrowed type
 * promises nothing about `identity`, `datasetId` or `resourceId`. Follow it with
 * {@link validateStdDiscoveredApplicationResourceOutput} for a full check.
 *
 * Use this as the gate before any validation, so resources that are not discovered applications
 * (non-discovery `std:application` resources, `discovered: false`, accounts, agents, ...) are left alone.
 */
function isDiscoveredApplicationResource(value) {
    return (isRecord(value) &&
        value.resourceType === exports.STD_APPLICATION_RESOURCE_TYPE &&
        isRecord(value.attributes) &&
        value.attributes.discovered === true);
}
exports.isDiscoveredApplicationResource = isDiscoveredApplicationResource;
/**
 * Runtime validator for a discovered application returned by `std:resource:list`.
 *
 * Applies to discovered applications only and throws for any other value, including a `std:application`
 * without `attributes.discovered: true`. Gate calls with {@link isDiscoveredApplicationResource}.
 *
 * Returns the same object after validation so it can be used at command boundaries.
 */
function validateStdDiscoveredApplicationResourceOutput(value) {
    if (!isRecord(value)) {
        throw new error_1.ConnectorError('application resource must be an object');
    }
    requireNonEmptyString(value.identity, 'identity');
    requireNonEmptyString(value.datasetId, 'datasetId');
    requireNonEmptyString(value.resourceId, 'resourceId');
    if (value.uuid !== undefined && typeof value.uuid !== 'string') {
        throw new error_1.ConnectorError('uuid must be a string');
    }
    for (const flag of ['deleted', 'disabled']) {
        if (value[flag] !== undefined && typeof value[flag] !== 'boolean') {
            throw new error_1.ConnectorError(`${flag} must be a boolean`);
        }
    }
    if (value.classification !== undefined) {
        throw new error_1.ConnectorError('classification is not supported for discovered applications; use attributes.dataClassification');
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
    validateResourceLinks(value.resourceLinks, value.identity);
    warnOnLookalikeAttributes(value.attributes);
    return value;
}
exports.validateStdDiscoveredApplicationResourceOutput = validateStdDiscoveredApplicationResourceOutput;
/**
 * Builds and validates a discovered application resource with the required discriminator.
 *
 * Throws a `ConnectorError` on the first invalid field. Inside a `std:resource:list` loop that fails the
 * whole command; to skip an invalid record instead, use `tryBuildStdDiscoveredApplicationResourceOutput`
 * or catch per record.
 *
 * The input is not mutated, and the returned `attributes` and `resourceLinks` are shallow copies: the
 * array and the attribute map are new objects, but the individual link objects (and any nested values)
 * are still shared with the caller.
 */
function buildStdDiscoveredApplicationResourceOutput(input) {
    return validateStdDiscoveredApplicationResourceOutput({
        ...input,
        resourceType: exports.STD_APPLICATION_RESOURCE_TYPE,
        attributes: {
            ...input.attributes,
            discovered: true,
        },
        resourceLinks: [...(input.resourceLinks ?? [])],
    });
}
exports.buildStdDiscoveredApplicationResourceOutput = buildStdDiscoveredApplicationResourceOutput;
/**
 * Non-throwing variant of `buildStdDiscoveredApplicationResourceOutput` for connectors that prefer to log
 * and skip an invalid source record rather than fail the whole `std:resource:list` command.
 */
function tryBuildStdDiscoveredApplicationResourceOutput(input) {
    try {
        return { success: true, value: buildStdDiscoveredApplicationResourceOutput(input) };
    }
    catch (error) {
        if (error instanceof error_1.ConnectorError) {
            return { success: false, error };
        }
        throw error;
    }
}
exports.tryBuildStdDiscoveredApplicationResourceOutput = tryBuildStdDiscoveredApplicationResourceOutput;
//# sourceMappingURL=std-discovered-application-resource.js.map