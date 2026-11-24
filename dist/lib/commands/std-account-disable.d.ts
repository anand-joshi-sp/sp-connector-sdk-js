import { AccountSchema, Attributes, ObjectInput, ObjectOutput } from './command';
/**
 * Input object of `std:account:disable` command
 */
export type StdAccountDisableInput = ObjectInput & {
    schema?: AccountSchema;
};
/**
 * Output object of `std:account:disable` command
 */
export type StdAccountDisableOutput = ObjectOutput & {
    disabled?: boolean;
    locked?: boolean;
    attributes: Attributes;
};
//# sourceMappingURL=std-account-disable.d.ts.map