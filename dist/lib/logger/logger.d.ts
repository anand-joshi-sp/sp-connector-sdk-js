export declare const logLevel: () => string;
export declare const logger: import("pino").Logger<{
    timestamp: () => string;
    messageKey: string;
    level: string;
    base: undefined;
    formatters: {
        level: (label: string) => {
            level: string;
        };
    };
    mixin(): {
        id?: undefined;
        version?: undefined;
        invocationId?: undefined;
        requestId?: undefined;
        commandType?: undefined;
    } | {
        id: string | undefined;
        version: number | undefined;
        invocationId: string | undefined;
        requestId: string | undefined;
        commandType: string | undefined;
    };
    mixinMergeStrategy(mergeObject: any, mixinObject: any): any;
}>;
//# sourceMappingURL=logger.d.ts.map