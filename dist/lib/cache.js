"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectorCache = exports.ConnectorCache = exports.SDK_CACHE_PREFIX = void 0;
/**
 * Key prefix reserved for internal SDK use. User keys must not start with this prefix.
 */
exports.SDK_CACHE_PREFIX = '__sdk:';
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
class ConnectorCache {
    constructor() {
        this.store = new Map();
        this.inflight = new Map();
    }
    /**
     * Get a value from the cache. Returns `undefined` if the key does not exist or has expired.
     * @param key Cache key
     */
    get(key) {
        const entry = this.store.get(key);
        if (!entry) {
            return undefined;
        }
        if (entry.expiresAt !== null && Date.now() >= entry.expiresAt) {
            this.store.delete(key);
            return undefined;
        }
        return entry.value;
    }
    /**
     * Store a value in the cache.
     * @param key Cache key (must not start with `__sdk:` — that prefix is reserved for internal use)
     * @param value Value to cache
     * @param ttlSeconds Time-to-live in seconds. If omitted, the entry never expires.
     */
    set(key, value, ttlSeconds) {
        if (!key.startsWith(exports.SDK_CACHE_PREFIX)) {
            this.validateUserKey(key);
        }
        const expiresAt = ttlSeconds != null ? Date.now() + ttlSeconds * 1000 : null;
        this.store.set(key, { value, expiresAt });
    }
    /**
     * Check whether a key exists and has not expired.
     * @param key Cache key
     */
    has(key) {
        return this.get(key) !== undefined;
    }
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
    async fetch(key, factory, ttlSeconds) {
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const existing = this.inflight.get(key);
        if (existing) {
            return existing;
        }
        const promise = factory().then((value) => {
            this.set(key, value, ttlSeconds);
            this.inflight.delete(key);
            return value;
        }).catch((err) => {
            this.inflight.delete(key);
            throw err;
        });
        this.inflight.set(key, promise);
        return promise;
    }
    /**
     * Remove a key from the cache.
     * @param key Cache key
     */
    delete(key) {
        return this.store.delete(key);
    }
    /**
     * Remove all entries from the cache. By default, only clears user entries and
     * preserves internal SDK entries. Pass `true` to clear everything.
     * @param includeInternal If true, also clears internal SDK cache entries
     */
    clear(includeInternal = false) {
        if (includeInternal) {
            this.store.clear();
            return;
        }
        for (const key of Array.from(this.store.keys())) {
            if (!key.startsWith(exports.SDK_CACHE_PREFIX)) {
                this.store.delete(key);
            }
        }
    }
    /**
     * Get the number of entries currently in the cache (including expired but not yet evicted).
     */
    get size() {
        return this.store.size;
    }
    validateUserKey(key) {
        if (key.startsWith(exports.SDK_CACHE_PREFIX)) {
            throw new Error(`Cache keys starting with "${exports.SDK_CACHE_PREFIX}" are reserved for internal SDK use`);
        }
    }
}
exports.ConnectorCache = ConnectorCache;
/**
 * Module-level singleton cache instance. Persists across warm invocations in Lambda-like environments.
 */
exports.connectorCache = new ConnectorCache();
//# sourceMappingURL=cache.js.map