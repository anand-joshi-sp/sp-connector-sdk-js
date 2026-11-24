import { AccountSchema, Attributes, ObjectOutput, Result } from './command';
type AttributeValue = string | number | boolean;
/**
 * Object describing account attribute create
 */
export type CreateAttributeMetadata = {
    attribute: string;
    value: any;
    metadata?: Map<string, AttributeValue>;
};
/**
 * Input object of `std:account:create` command
 */
export type StdAccountCreateInput = {
    identity?: string;
    attributes: any;
    attributesWithMetadata?: CreateAttributeMetadata[];
    schema?: AccountSchema;
};
/**
 * Output object of `std:account:create` command
 */
export type StdAccountCreateOutput = ObjectOutput & {
    disabled?: boolean;
    locked?: boolean;
    attributes: Attributes;
    results?: Result[];
};
export {};
//# sourceMappingURL=std-account-create.d.ts.map