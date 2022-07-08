interface LoggerStyle {
    debug: string;
    info: string;
    warn: string;
    error: string;
}
export declare class DefaultLoggerStyle implements LoggerStyle {
    debug: string;
    info: string;
    warn: string;
    error: string;
}
export declare class Logger {
    #private;
    constructor(name: string, loggerStyle?: LoggerStyle);
    info(message: string, debug?: boolean): void;
    debug(message: string): void;
    warn(message: string, debug?: boolean): void;
    error(message: string, debug?: boolean): void;
}
export {};
