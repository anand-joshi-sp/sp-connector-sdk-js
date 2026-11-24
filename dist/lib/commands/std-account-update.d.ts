import { AccountSchema, Attributes, ObjectInput, ObjectOutput, Result } from './command';
export declare enum AttributeChangeOp {
    Add = "Add",
    Set = "Set",
    Remove = "Remove"
}
type AttributeValue = string | number | boolean;
/**
 * Object describing account attribute change
 */
export type AttributeChange = {
    op: AttributeChangeOp;
    attribute: string;
    value: any;
    metadata?: Map<string, AttributeValue>;
};
/**
 * Input object of `std:account:update` command
 */
export type StdAccountUpdateInput = ObjectInput & {
    changes: AttributeChange[];
    schema?: AccountSchema;
};
/**
 * Output object of `std:account:update` command
 *
 * All properties are optional for this output
 */
export type StdAccountUpdateOutput = ObjectOutput & {
    disabled?: boolean;
    locked?: boolean;
    attributes?: Attributes;
    results?: Result[];
};
export {};
//# sourceMappingURL=std-account-update.d.ts.map