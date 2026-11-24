/**
 * Key prefix reserved for internal SDK use. User keys must not start with this prefix.
 */
export declare const SDK_CACHE_PREFIX = "__sdk:";
/**
 * A general-purpose in-memory cache with TTL support.
 *
 * Because connectors run in a Lambda-like environment where module-level state persists
 * across warm invocations, values stored in the cache remain available between requests
 * as long as the container stays warm.
 *
 * The SDK uses this cache internally for auth token storage (with reserved keys prefixed
 * by `__sdk:`). Connector developers can use it to cache any data that is expensive to
 * fetch on every invocation.
 *
 * @example
 * ```typescript
 * import { connectorCache } from '@sailpoint/connector-sdk'
 *
 * // Cache an API response for 5 minutes using fetch()
 * const users = await connectorCache.fetch('all-users', () => myClient.getUsers(), 300)
 * ```
 */
export declare class ConnectorCache {
    private readonly store;
    private readonly inflight;
    /**
     * Get a value from the cache. Returns `undefined` if the key does not exist or has expired.
     * @param key Cache key
     */
    get<T = any>(key: string): T | undefined;
    /**
     * Store a value in the cache.
     * @param key Cache key (must not start with `__sdk:` — that prefix is reserved for internal use)
     * @param value Value to cache
     * @param ttlSeconds Time-to-live in seconds. If omitted, the entry never expires.
     */
    set<T = any>(key: string, value: T, ttlSeconds?: number): void;
    /**
     * Check whether a key exists and has not expired.
     * @param key Cache key
     */
    has(key: string): boolean;
    /**
     * Return the cached value for `key`, or compute and store it if absent.
     *
     * If the key is not in the cache (or has expired), `factory` is called once to produce
     * the value, which is then stored with the given TTL. Concurrent calls with the same key
     * are deduplicated — only one `factory` invocation runs, and all callers receive the
     * same result.
     *
     * @param key Cache key
     * @param factory Async function that produces the value when the cache is empty
     * @param ttlSeconds Time-to-live in seconds. If omitted, the entry never expires.
     *
     * @example
     * ```typescript
     * const entitlementMap = await connectorCache.fetch(
     *     'entitlement-map',
     *     async () => {
     *         const entitlements = await client.listEntitlements()
     *         return new Map(entitlements.map(e => [e.id, e.name]))
     *     },
     *     600,
     * )
     * ```
     */
    fetch<T = any>(key: string, factory: () => Promise<T>, ttlSeconds?: number): Promise<T>;
    /**
     * Remove a key from the cache.
     * @param key Cache key
     */
    delete(key: string): boolean;
    /**
     * Remove all entries from the cache. By default, only clears user entries and
     * preserves internal SDK entries. Pass `true` to clear everything.
     * @param includeInternal If true, also clears internal SDK cache entries
     */
    clear(includeInternal?: boolean): void;
    /**
     * Get the number of entries currently in the cache (including expired but not yet evicted).
     */
    get size(): number;
    private validateUserKey;
}
/**
 * Module-level singleton cache instance. Persists across warm invocations in Lambda-like environments.
 */
export declare const connectorCache: ConnectorCache;
//# sourceMappingURL=cache.d.ts.map