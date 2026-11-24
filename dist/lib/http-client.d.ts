import { AxiosInstance, CreateAxiosDefaults } from 'axios';
export type { AxiosInstance } from 'axios';
/**
 * Basic authentication using username and password
 */
export interface BasicAuth {
    type: 'basic';
    username: string;
    password: string;
}
/**
 * Bearer token authentication using a static token
 */
export interface BearerTokenAuth {
    type: 'bearer';
    token: string;
}
/**
 * API key authentication sent as a header or query parameter
 */
export interface ApiKeyAuth {
    type: 'apiKey';
    /**
     * Where to send the API key: 'header' or 'query'
     */
    in: 'header' | 'query';
    /**
     * Name of the header or query parameter (e.g. 'X-API-Key', 'api_key')
     */
    name: string;
    value: string;
}
/**
 * OAuth2 Client Credentials grant. Automatically fetches and refreshes access tokens.
 */
export interface OAuth2ClientCredentialsAuth {
    type: 'oauth2ClientCredentials';
    /**
     * Token endpoint URL (e.g. 'https://auth.example.com/oauth/token')
     */
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    /**
     * Optional scopes to request
     */
    scope?: string;
    /**
     * How to send credentials: 'body' (form post) or 'header' (Basic auth header).
     * Defaults to 'body'.
     */
    credentialPlacement?: 'body' | 'header';
}
export type AuthConfig = BasicAuth | BearerTokenAuth | ApiKeyAuth | OAuth2ClientCredentialsAuth;
/**
 * Configuration for automatic request retry with exponential backoff.
 */
export interface RetryConfig {
    /**
     * Maximum number of retry attempts. Set to 0 to disable retries.
     * Default: 3
     */
    maxRetries?: number;
    /**
     * Base delay in milliseconds for exponential backoff. The actual delay is
     * `baseDelay * 2^(attempt - 1)` plus jitter.
     * Default: 1000
     */
    baseDelay?: number;
    /**
     * Maximum delay in milliseconds between retries.
     * Default: 30000
     */
    maxDelay?: number;
    /**
     * HTTP status codes that should trigger a retry.
     * Default: [429, 500, 502, 503, 504]
     */
    retryableStatusCodes?: number[];
    /**
     * Whether to retry on network errors (no response received).
     * Default: true
     */
    retryOnNetworkError?: boolean;
}
/**
 * Options for creating a connector HTTP client
 */
export interface HttpClientOptions {
    /**
     * Base URL for all requests (e.g. 'https://api.example.com/v1')
     */
    baseURL?: string;
    /**
     * Default headers to include on every request
     */
    headers?: Record<string, string>;
    /**
     * Request timeout in milliseconds (default: 30000)
     */
    timeout?: number;
    /**
     * Authentication configuration. Supports basic, bearer, apiKey, and oauth2ClientCredentials.
     */
    auth?: AuthConfig;
    /**
     * Retry configuration. Enabled by default with 3 retries and exponential backoff.
     * Set to `false` to disable retries entirely.
     */
    retry?: RetryConfig | false;
    /**
     * Additional Axios configuration options
     */
    axiosOptions?: CreateAxiosDefaults;
}
/**
 * Parses the Retry-After header value into milliseconds to wait.
 * Supports both seconds (integer) and HTTP-date formats.
 * Returns undefined if the header is missing or unparseable.
 */
export declare function parseRetryAfter(headerValue: string | undefined | null): number | undefined;
/**
 * Calculates the delay for a retry attempt using exponential backoff with jitter.
 */
export declare function calculateRetryDelay(attempt: number, baseDelay: number, maxDelay: number): number;
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
export declare function createConnectorHttpClient(options?: HttpClientOptions): AxiosInstance;
//# sourceMappingURL=http-client.d.ts.map