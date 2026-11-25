import { ConnectorError } from '../error';
import { ResourceOutput } from './command';
import { StdApplicationDiscoveryListOutput } from './std-application-discovery-list';
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
export declare const STD_APPLICATION_RESOURCE_TYPE: "std:application";
/**
 * Well-known attributes of a discovered application.
 *
 * Derived from `StdApplicationDiscoveryListOutput` so that the field names and types cannot drift from
 * `std:application-discovery:list`. `id` becomes the resource `identity`, and the discovery-only
 * `attributes` bag is replaced by the resource `attributes` themselves.
 *
 * This type intentionally has no index signature so that `Omit`/`Pick` keep working on it
 * (TypeScript collapses `Omit<T, K>` to `{ [x: string]: any }` when `T` has an index signature).
 */
type StdDiscoveredApplicationKnownAttributes = Omit<StdApplicationDiscoveryListOutput, 'id' | 'attributes'> & {
    applicationName: string;
    discovered: true;
};
/**
 * Attributes of a discovered application returned through `std:resource:list`.
 *
 * Connector-specific attributes are allowed, while the common application fields retain the same types
 * used by `std:application-discovery:list`. Use the canonical names listed in
 * {@link STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES}; look-alike names (for example `appURL` instead of
 * `appUrl`) are accepted but logged as a warning by the validator.
 */
export type StdDiscoveredApplicationResourceAttributes = StdDiscoveredApplicationKnownAttributes & {
    [attribute: string]: any;
};
export type StdDiscoveredApplicationResourceLinkEndpoint = {
    id: string;
    resourceType: string;
    attributes?: Record<string, any>;
};
/**
 * A link embedded in a discovered application resource.
 *
 * `from.id` must equal the resource `identity`. `to.id` may be empty when the target is resolved later by
 * the platform. The `resourceType` values of both endpoints are not constrained by the SDK.
 */
export type StdDiscoveredApplicationResourceLink = {
    type: string;
    from: StdDiscoveredApplicationResourceLinkEndpoint;
    to: StdDiscoveredApplicationResourceLinkEndpoint;
    attributes?: Record<string, any>;
};
/**
 * Typed Dataset 2.0 output for discovered applications (`attributes.discovered: true`).
 *
 * The top-level `classification` of `ResourceOutput` applies to accounts and is not supported here; use
 * `attributes.dataClassification` for applications.
 */
export type StdDiscoveredApplicationResourceOutput = Omit<ResourceOutput, 'classification'> & {
    resourceType: typeof STD_APPLICATION_RESOURCE_TYPE;
    attributes: StdDiscoveredApplicationResourceAttributes;
    resourceLinks: StdDiscoveredApplicationResourceLink[];
};
/**
 * Input accepted by `buildStdDiscoveredApplicationResourceOutput`. `resourceType` and `discovered`
 * are set by the builder; `resourceLinks` defaults to an empty array.
 */
export type StdDiscoveredApplicationResourceBuilderInput = Omit<ResourceOutput, 'attributes' | 'classification'> & {
    attributes: Omit<StdDiscoveredApplicationKnownAttributes, 'discovered'> & {
        discovered?: true;
        [attribute: string]: any;
    };
    resourceLinks?: StdDiscoveredApplicationResourceLink[];
};
/**
 * Result of `tryBuildStdDiscoveredApplicationResourceOutput`.
 */
export type StdDiscoveredApplicationResourceBuildResult = {
    success: true;
    value: StdDiscoveredApplicationResourceOutput;
} | {
    success: false;
    error: ConnectorError;
};
declare const stringAttributes: readonly ["applicationName", "primaryAppName", "description", "secondaryAppName", "status", "connectorCategory", "logo", "appUrl", "createdAt", "updatedAt", "usersCount", "businessCriticality", "dataClassification", "businessUnit", "installType", "environment", "warrantyExpiration", "operationalStatus"];
declare const numberAttributes: readonly ["licenseCount", "riskScore", "totalSigninsCount"];
declare const booleanAttributes: readonly ["isSanctioned", "isBusiness", "isPrivileged"];
declare const stringArrayAttributes: readonly ["applicationOwner", "itApplicationOwner"];
declare const otherValidatedAttributes: readonly ["groups", "riskLevel", "discovered"];
/**
 * Canonical attribute names of a discovered application. Connector-specific attributes should not reuse
 * these names with different spelling or casing.
 */
export declare const STD_DISCOVERED_APPLICATION_ATTRIBUTE_NAMES: readonly string[];
type ValidatedAttributeName = typeof stringAttributes[number] | typeof numberAttributes[number] | typeof booleanAttributes[number] | typeof stringArrayAttributes[number] | typeof otherValidatedAttributes[number];
type AssertNever<T extends never> = T;
export type StdDiscoveredApplicationUnvalidatedDiscoveryFields = AssertNever<Exclude<keyof Omit<StdApplicationDiscoveryListOutput, 'id' | 'attributes'>, ValidatedAttributeName>>;
/**
 * Returns true only for a discovered application: `resourceType === 'std:application'` and
 * `attributes.discovered === true`.
 *
 * Use this as the gate before any validation, so resources that are not discovered applications
 * (non-discovery `std:application` resources, `discovered: false`, accounts, agents, ...) are left alone.
 */
export declare function isDiscoveredApplicationResource(value: unknown): value is ResourceOutput & {
    resourceType: typeof STD_APPLICATION_RESOURCE_TYPE;
    attributes: {
        discovered: true;
    };
};
/**
 * Runtime validator for a discovered application returned by `std:resource:list`.
 *
 * Applies to discovered applications only and throws for any other value, including a `std:application`
 * without `attributes.discovered: true`. Gate calls with {@link isDiscoveredApplicationResource}.
 *
 * Returns the same object after validation so it can be used at command boundaries.
 */
export declare function validateStdDiscoveredApplicationResourceOutput(value: unknown): StdDiscoveredApplicationResourceOutput;
/**
 * Builds and validates a discovered application resource with the required discriminator.
 *
 * Throws a `ConnectorError` on the first invalid field. Inside a `std:resource:list` loop that fails the
 * whole command; to skip an invalid record instead, use `tryBuildStdDiscoveredApplicationResourceOutput`
 * or catch per record.
 *
 * The input is not mutated, and the returned `attributes` and `resourceLinks` are copies.
 */
export declare function buildStdDiscoveredApplicationResourceOutput(input: StdDiscoveredApplicationResourceBuilderInput): StdDiscoveredApplicationResourceOutput;
/**
 * Non-throwing variant of `buildStdDiscoveredApplicationResourceOutput` for connectors that prefer to log
 * and skip an invalid source record rather than fail the whole `std:resource:list` command.
 */
export declare function tryBuildStdDiscoveredApplicationResourceOutput(input: StdDiscoveredApplicationResourceBuilderInput): StdDiscoveredApplicationResourceBuildResult;
export {};
//# sourceMappingURL=std-discovered-application-resource.d.ts.map