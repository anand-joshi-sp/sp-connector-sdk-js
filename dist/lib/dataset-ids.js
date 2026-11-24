"use strict";
/* Copyright (c) 2026. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueDatasetIds = void 0;
/**
 * Returns unique dataset IDs while preserving the order of first occurrence.
 * Connectors may receive duplicate dataset IDs when a spec defines multiple
 * dataset entries with the same id (for example machine-identity and resource links).
 */
const uniqueDatasetIds = (datasetIds) => {
    const seen = new Set();
    const uniqueIds = [];
    for (const datasetId of datasetIds) {
        const normalizedId = String(datasetId);
        if (seen.has(normalizedId)) {
            continue;
        }
        seen.add(normalizedId);
        uniqueIds.push(normalizedId);
    }
    return uniqueIds;
};
exports.uniqueDatasetIds = uniqueDatasetIds;
//# sourceMappingURL=dataset-ids.js.map