/**
 * Returns unique dataset IDs while preserving the order of first occurrence.
 * Connectors may receive duplicate dataset IDs when a spec defines multiple
 * dataset entries with the same id (for example machine-identity and resource links).
 */
export declare const uniqueDatasetIds: (datasetIds: string[]) => string[];
//# sourceMappingURL=dataset-ids.d.ts.map