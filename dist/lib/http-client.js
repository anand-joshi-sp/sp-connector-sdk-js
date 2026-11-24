"use strict";
/* Copyright (c) 2021. SailPoint Technologies, Inc. All rights reserved. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnectorHttpClient = exports.calculateRetryDelay = exports.parseRetryAfter = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("./logger");
const cache_1 = require("./cache");
/** Cache key prefix for auth tokens */
const AUTH_CACHE_PREFIX = `${cache_1.SDK_CACHE_PREFIX}auth:`;
/** Custom config property to track retry count */
const RETRY_COUNT_KEY = '__retryCount';
/** Default status codes that trigger a retry */
const DEFAULT_RETRYABLE_STATUS_CODES = [429, 500, 502, 503, 504];
/**
 * Builds a deterministic cache key from the auth config so that the same credentials
 * always resolve to the same cached token, even across multiple `createConnectorHttpClient` calls.
 */
function authCacheKey(auth) {
    switch (auth.type) {
        case 'oauth2ClientCredentials':
            return `${AUTH_CACHE_PREFIX}oauth2:${auth.tokenUrl}:${auth.clientId}`;
        default:
            return `${AUTH_CACHE_PREFIX}${auth.type}`;
    }
}
// Tracks in-flight token fetches to deduplicate concurrent requests
const inflightTokenRequests = new Map();
/**
 * Fetches an OAuth2 Client Credentials token, using the shared cache and deduplicating
 * concurrent requests.
 */
async function getOAuth2Token(config, cacheKey, log) {
    // Check the shared cache first
    const cached = cache_1.connectorCache.get(cacheKey);
    if (cached) {
        return cached;
    }
    // Deduplicate concurrent token requests
    const inflight = inflightTokenRequests.get(cacheKey);
    if (inflight) {
        return inflight;
    }
    const promise = fetchOAuth2Token(config, cacheKey, log);
    inflightTokenRequests.set(cacheKey, promise);
    try {
        return await promise;
    }
    finally {
        inflightTokenRequests.delete(cacheKey);
    }
}
async function fetchOAuth2Token(config, cacheKey, log) {
    log.debug({ tokenUrl: config.tokenUrl }, 'Fetching OAuth2 access token');
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    if (config.scope) {
        params.append('scope', config.scope);
    }
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (config.credentialPlacement === 'header') {
        const encoded = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
        headers['Authorization'] = `Basic ${encoded}`;
    }
    else {
        params.append('client_id', config.clientId);
        params.append('client_secret', config.clientSecret);
    }
    const response = await axios_1.default.post(config.tokenUrl, params.toString(), { headers });
    const { access_token, expires_in } = response.data;
    // Cache with TTL. Use a 30s buffer so the token is refreshed before it actually expires.
    const ttlSeconds = Math.max((expires_in || 3600) - 30, 0);
    cache_1.connectorCache.set(cacheKey, access_token, ttlSeconds);
    log.debug({ expiresIn: expires_in }, 'OAuth2 access token acquired');
    return access_token;
}
/**
 * Parses the Retry-After header value into milliseconds to wait.
 * Supports both seconds (integer) and HTTP-date formats.
 * Returns undefined if the header is missing or unparseable.
 */
function parseRetryAfter(headerValue) {
    if (!headerValue) {
        return undefined;
    }
    // Try parsing as integer seconds
    const seconds = Number(headerValue);
    if (!isNaN(seconds) && seconds >= 0) {
        return seconds * 1000;
    }
    // Try parsing as HTTP-date
    const date = new Date(headerValue);
    if (!isNaN(date.getTime())) {
        const delay = date.getTime() - Date.now();
        return Math.max(delay, 0);
    }
    return undefined;
}
exports.parseRetryAfter = parseRetryAfter;
/**
 * Calculates the delay for a retry attempt using exponential backoff with jitter.
 */
function calculateRetryDelay(attempt, baseDelay, maxDelay) {
    const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * baseDelay * 0.5;
    return Math.min(exponentialDelay + jitter, maxDelay);
}
exports.calculateRetryDelay = calculateRetryDelay;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Creates a pre-configured Axios HTTP client instance for use within connectors.
 *
 * The client includes:
 * - Configurable base URL, headers, and timeout
 * - Built-in authentication (basic, bearer, apiKey, oauth2ClientCredentials)
 * - Automatic retry with exponential backoff (429, 5xx, network errors)
 * - Token caching via the shared `connectorCache` (persists across warm invocations)
 * - Request/response logging via the SDK's pino logger
 * - Error logging for failed requests
 *
 * @example Basic auth
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     auth: { type: 'basic', username: config.username, password: config.password },
 * })
 * ```
 *
 * @example Bearer token
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     auth: { type: 'bearer', token: config.token },
 * })
 * ```
 *
 * @example API key
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     auth: { type: 'apiKey', in: 'header', name: 'X-API-Key', value: config.apiKey },
 * })
 * ```
 *
 * @example OAuth2 Client Credentials (automatic token management)
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     auth: {
 *         type: 'oauth2ClientCredentials',
 *         tokenUrl: config.tokenUrl,
 *         clientId: config.clientId,
 *         clientSecret: config.clientSecret,
 *         scope: 'read write',
 *     },
 * })
 * ```
 *
 * @example Custom retry configuration
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     retry: { maxRetries: 5, baseDelay: 2000 },
 * })
 * ```
 *
 * @example Disable retries
 * ```typescript
 * const httpClient = createConnectorHttpClient({
 *     baseURL: config.apiUrl,
 *     retry: false,
 * })
 * ```
 *
 * @param options Configuration options for the HTTP client
 * @returns A configured Axios instance
 */
function createConnectorHttpClient(options = {}) {
    const { baseURL, headers, timeout = 30000, auth, retry, axiosOptions = {} } = options;
    const client = axios_1.default.create({
        ...axiosOptions,
        baseURL,
        timeout,
        headers: {
            ...axiosOptions.headers,
            ...headers,
        },
    });
    const log = logger_1.logger.child({ component: 'http-client' });
    // Set up authentication interceptor
    if (auth) {
        switch (auth.type) {
            case 'basic': {
                const encoded = Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
                client.interceptors.request.use((config) => {
                    config.headers.set('Authorization', `Basic ${encoded}`);
                    return config;
                });
                break;
            }
            case 'bearer': {
                client.interceptors.request.use((config) => {
                    config.headers.set('Authorization', `Bearer ${auth.token}`);
                    return config;
                });
                break;
            }
            case 'apiKey': {
                client.interceptors.request.use((config) => {
                    if (auth.in === 'header') {
                        config.headers.set(auth.name, auth.value);
                    }
                    else {
                        config.params = { ...config.params, [auth.name]: auth.value };
                    }
                    return config;
                });
                break;
            }
            case 'oauth2ClientCredentials': {
                const cacheKey = authCacheKey(auth);
                client.interceptors.request.use(async (config) => {
                    const token = await getOAuth2Token(auth, cacheKey, log);
                    config.headers.set('Authorization', `Bearer ${token}`);
                    return config;
                });
                break;
            }
        }
    }
    // Logging interceptors
    client.interceptors.request.use((config) => {
        log.debug({ method: config.method?.toUpperCase(), url: config.url, baseURL: config.baseURL }, 'HTTP request');
        return config;
    }, (error) => {
        log.error({ error: error.message }, 'HTTP request error');
        return Promise.reject(error);
    });
    client.interceptors.response.use((response) => {
        log.debug({ method: response.config.method?.toUpperCase(), url: response.config.url, status: response.status }, 'HTTP response');
        return response;
    }, (error) => {
        if (error.response) {
            log.error({
                method: error.config?.method?.toUpperCase(),
                url: error.config?.url,
                status: error.response.status,
            }, 'HTTP response error');
        }
        else {
            log.error({ message: error.message }, 'HTTP request failed');
        }
        return Promise.reject(error);
    });
    // Retry interceptor (added after logging so retries are logged)
    if (retry !== false) {
        const retryConfig = {
            maxRetries: retry?.maxRetries ?? 3,
            baseDelay: retry?.baseDelay ?? 1000,
            maxDelay: retry?.maxDelay ?? 30000,
            retryableStatusCodes: retry?.retryableStatusCodes ?? DEFAULT_RETRYABLE_STATUS_CODES,
            retryOnNetworkError: retry?.retryOnNetworkError ?? true,
        };
        client.interceptors.response.use(undefined, async (error) => {
            const config = error.config;
            if (!config) {
                return Promise.reject(error);
            }
            const retryCount = config[RETRY_COUNT_KEY] || 0;
            if (retryCount >= retryConfig.maxRetries) {
                return Promise.reject(error);
            }
            const status = error.response?.status;
            const isRetryable = status
                ? retryConfig.retryableStatusCodes.includes(status)
                : retryConfig.retryOnNetworkError && !error.response;
            if (!isRetryable) {
                return Promise.reject(error);
            }
            const attempt = retryCount + 1;
            // For 429, prefer Retry-After header
            let delay;
            if (status === 429) {
                const retryAfterHeader = error.response?.headers?.['retry-after'];
                const retryAfterMs = parseRetryAfter(retryAfterHeader);
                delay = retryAfterMs ?? calculateRetryDelay(attempt, retryConfig.baseDelay, retryConfig.maxDelay);
            }
            else {
                delay = calculateRetryDelay(attempt, retryConfig.baseDelay, retryConfig.maxDelay);
            }
            log.info({
                attempt,
                maxRetries: retryConfig.maxRetries,
                status,
                delay: Math.round(delay),
                url: config.url,
            }, 'Retrying request');
            config[RETRY_COUNT_KEY] = attempt;
            await sleep(delay);
            return client.request(config);
        });
    }
    return client;
}
exports.createConnectorHttpClient = createConnectorHttpClient;
//# sourceMappingURL=http-client.js.map