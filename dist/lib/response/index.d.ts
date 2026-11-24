/// <reference types="node" />
import { Writable } from 'stream';
/**
 * Response interface
 */
export interface Response<T> {
    send(output: T): void;
    saveState(state: any): void;
    keepAlive(): void;
    patchConfig(patches: Patch[]): void;
}
/**
 * Response implementation for sending command output in chunks
 */
export declare class ResponseStream<T> implements Response<T> {
    protected readonly _writable: Writable;
    constructor(writable: Writable);
    /**
     * Send command output
     * @param chunk output chunk
     */
    send(chunk: T): void;
    /**
     * Save state for stateful command
     * @param state the end state of running the stateful command
     */
    saveState(state: any): void;
    /**
     * Indicates that the commands is still running.
     *
     * Can be used to avoid a timeout error in the case when a command
     * is unable to return responses in a timely manner but is still
     * actively processing the command.
     */
    keepAlive(): void;
    patchConfig(patches: Patch[]): void;
}
/**
 * Enum representing different types of responses
 */
export declare enum ResponseType {
    Output = "output",
    State = "state",
    KeepAlive = "keepAlive",
    Config = "config"
}
/**
 * RawResponse is the response that sdk sends out as command output
 */
export declare class RawResponse {
    type: ResponseType;
    data: string;
    constructor(data: any, type?: ResponseType);
}
/**
 * Enum PatchOp is the config patch operations
 */
export declare enum PatchOp {
    Add = "add",
    Replace = "replace",
    Remove = "remove"
}
/**
 * Patch is a JSON patch for source config
 */
export type Patch = {
    op: PatchOp;
    path: string;
    value?: any;
};
/**
 * Response implementation which transforms output from I to O.
 */
export declare class ResponseStreamTransform<I, O> implements Response<I> {
    protected readonly _inner: Response<O>;
    protected readonly _transform: (v: I) => O;
    constructor(inner: Response<O>, transform: (v: I) => O);
    /**
     * Send command output
     * @param chunk output chunk
     */
    send(chunk: I): void;
    /**
     * Save state for stateful command
     * @param state the end state of running the stateful command
     */
    saveState(state: any): void;
    /**
     * Indicates that the commands is still running.
     *
     * Can be used to avoid a timeout error in the case when a command
     * is unable to return responses in a timely manner but is still
     * actively processing the command.
     */
    keepAlive(): void;
    patchConfig(patches: Patch[]): void;
}
//# sourceMappingURL=index.d.ts.map