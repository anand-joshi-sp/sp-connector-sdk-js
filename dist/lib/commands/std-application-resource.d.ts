import { ResourceOutput } from './command';
import { RiskLevel } from './std-application-discovery-list';
export declare const STD_APPLICATION_RESOURCE_TYPE: "std:application";
/**
 * Well-known attributes of a discovered application returned through `std:resource:list`.
 *
 * This type intentionally has no index signature so that `Omit`/`Pick` keep working on it
 * (TypeScript collapses `Omit<T, K>` to `{ [x: string]: any }` when `T` has an index signature).
 */
type StdApplicationResourceKnownAttributes = {
    applicationName: string;
    primaryAppName: string;
    description: string;
    discovered: true;
    secondaryAppName?: string;
    status?: string;
    connectorCategory?: string;
    licenseCount?: number;
    isSanctioned?: boolean;
    logo?: string;
    appUrl?: string;
    groups?: Record<string, any>[];
    createdAt?: string;
    updatedAt?: string;
    usersCount?: string;
    applicationOwner?: string[];
    itApplicationOwner?: string[];
    businessCriticality?: string;
    dataClassification?: string;
    businessUnit?: string;
    installType?: string;
    environment?: string;
    riskScore?: number;
    riskLevel?: RiskLevel;
    isBusiness?: boolean;
    totalSigninsCount?: number;
    isPrivileged?: boolean;
    warrantyExpiration?: string;
    operationalStatus?: string;
};
/**
 * Attributes shared by discovered applications returned through `std:resource:list`.
 *
 * Connector-specific attributes are allowed, while common application fields retain
 * the same types used by `std:application-discovery:list`.
 */
export type StdApplicationResourceAttributes = StdApplicationResourceKnownAttributes & {
    [attribute: string]: any;
};
export type StdApplicationResourceLinkEndpoint = {
    id: string;
    resourceType: string;
    attributes?: Record<string, any>;
};
export type StdApplicationResourceLink = {
    type: string;
    from: StdApplicationResourceLinkEndpoint;
    to: StdApplicationResourceLinkEndpoint;
    attributes?: Record<string, any>;
};
/**
 * Typed Dataset 2.0 output for discovered applications.
 */
export type StdApplicationResourceOutput = ResourceOutput & {
    resourceType: typeof STD_APPLICATION_RESOURCE_TYPE;
    attributes: StdApplicationResourceAttributes;
    resourceLinks: StdApplicationResourceLink[];
};
/**
 * Input accepted by `buildStdApplicationResourceOutput`. `resourceType` and `discovered`
 * are set by the builder; `resourceLinks` defaults to an empty array.
 */
export type StdApplicationResourceBuilderInput = Omit<ResourceOutput, 'attributes'> & {
    attributes: Omit<StdApplicationResourceKnownAttributes, 'discovered'> & {
        discovered?: true;
        [attribute: string]: any;
    };
    resourceLinks?: StdApplicationResourceLink[];
};
/**
 * Runtime validator for a discovered application returned by `std:resource:list`.
 *
 * Returns the same object after validation so it can be used at command boundaries.
 */
export declare function validateStdApplicationResourceOutput(value: unknown): StdApplicationResourceOutput;
/**
 * Builds and validates a discovered application resource with the required discriminator.
 */
export declare function buildStdApplicationResourceOutput(input: StdApplicationResourceBuilderInput): StdApplicationResourceOutput;
export {};
//# sourceMappingURL=std-application-resource.d.ts.map