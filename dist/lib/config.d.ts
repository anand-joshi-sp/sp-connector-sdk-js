/**
 * Reads in connector config
 */
export declare const readConfig: () => Promise<any>;
/**
 * _withConfig executes callback and ensures that all readConfig calls in
 * callback return cfg
 */
export declare const _withConfig: (cfg: any, callback: () => unknown) => Promise<void>;
//# sourceMappingURL=config.d.ts.map