import { Response } from './response';
import { Context } from './connector-handler';
/**
 * A persistent key-value data store backed by source config attributes.
 *
 * Provides a simple API to read and write values that persist across connector invocations.
 * Under the hood, changes are sent via `patchConfig` as JSON Patch operations targeting
 * `/<key>` directly. Only changed values are patched — if a value is set to the same thing
 * it was before, no patch is emitted.
 *
 * During long aggregations, call `reload(context)` to pick up config changes that occurred
 * mid-run (including values written by a previous `flush()` call in the same invocation).
 *
 * @example
 * ```typescript
 * import { createConnectorDataStore, readConfig } from '@sailpoint/connector-sdk'
 *
 * // Inside a command handler:
 * async (context, input, res) => {
 *     const config = await readConfig()
 *     const dataStore = createConnectorDataStore(config, res)
 *
 *     // Read a previously stored value
 *     const lastSync = dataStore.get<string>('lastSyncTimestamp')
 *
 *     // Fetch data since last sync...
 *     const data = await fetchDataSince(lastSync)
 *
 *     // Store the new timestamp (only patched if different)
 *     dataStore.set('lastSyncTimestamp', new Date().toISOString())
 *
 *     // Send all accumulated changes
 *     dataStore.flush()
 * }
 * ```
 */
export declare class ConnectorDataStore {
    private config;
    private readonly res;
    private readonly pending;
    constructor(config: Record<string, any>, res: Response<any>);
    /**
     * Get a value from the config.
     * Returns the pending value if one has been set, otherwise the original config value.
     * @param key Attribute key
     */
    get<T = any>(key: string): T | undefined;
    /**
     * Set a value in the config. The change is buffered until `flush()` is called.
     * If the value is identical to the current stored value, no patch will be emitted.
     * @param key Attribute key
     * @param value Value to store (must be JSON-serializable)
     */
    set(key: string, value: any): void;
    /**
     * Remove a key from the config. The change is buffered until `flush()` is called.
     * If the key doesn't exist, no patch will be emitted.
     * @param key Attribute key to remove
     */
    delete(key: string): void;
    /**
     * Returns true if there are pending changes that haven't been flushed yet.
     */
    get hasPendingChanges(): boolean;
    /**
     * Send all accumulated changes as a single `patchConfig` call.
     * Only emits patches for values that differ from the current config.
     * After flushing, the local config is updated to reflect the sent patches so that
     * subsequent `set()` calls in the same invocation use the correct baseline for
     * change detection.
     */
    flush(): void;
    /**
     * Reload the connector config from ISC via the command context and update the data
     * store's baseline. Call this during long aggregations to pick up config changes that
     * occurred mid-run — for example, values written by a previous `flush()` call or
     * updates made externally.
     *
     * Pending changes are preserved across a reload.
     *
     * @param context The command context passed to the handler
     *
     * @example
     * ```typescript
     * // Flush a batch of changes, then reload so the next batch uses the updated baseline
     * dataStore.set('cursor', nextCursor)
     * dataStore.flush()
     * await dataStore.reload(context)
     * ```
     */
    reload(context: Context): Promise<void>;
    private deepEqual;
}
/**
 * Creates a persistent data store backed by source config attributes.
 *
 * @param config The connector config object (from `readConfig()`)
 * @param res The response object from the current command handler
 * @returns A ConnectorDataStore instance
 */
export declare function createConnectorDataStore(config: Record<string, any>, res: Response<any>): ConnectorDataStore;
//# sourceMappingURL=data-store.d.ts.map