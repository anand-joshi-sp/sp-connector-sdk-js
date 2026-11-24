import { ObjectInput, ResourceInput, ResourceOutput } from './command';
/**
 * Input object of `std:resource:disable` command
 */
export type StdResourceDisableInput = ObjectInput & ResourceInput & {
    resourceId: string;
};
/**
 * Output object of `std:resource:disable` command
 */
export type StdResourceDisableOutput = ResourceOutput;
//# sourceMappingURL=std-resource-disable.d.ts.map