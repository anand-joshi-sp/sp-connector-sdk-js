import { AccountSchema, Attributes, ObjectInput, ObjectOutput } from './command';
/**
 * Input object of `std:account:unlock` command
 */
export type StdAccountUnlockInput = ObjectInput & {
    schema?: AccountSchema;
};
/**
 * Output object of `std:account:unlock` command
 */
export type StdAccountUnlockOutput = ObjectOutput & {
    disabled?: boolean;
    locked?: boolean;
    attributes: Attributes;
};
//# sourceMappingURL=std-account-unlock.d.ts.map