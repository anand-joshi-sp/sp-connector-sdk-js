/**
 * Connector error types
 */
export declare enum ConnectorErrorType {
    Generic = "generic",
    NotFound = "notFound"
}
/**
 * Connector error types
 */
export declare class ConnectorError extends Error {
    type: ConnectorErrorType;
    constructor(message: string, type?: ConnectorErrorType);
}
//# sourceMappingURL=error.d.ts.map