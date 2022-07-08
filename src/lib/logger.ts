interface LoggerStyle {
  debug: string;
  info: string;
  warn: string;
  error: string;
}

export class DefaultLoggerStyle implements LoggerStyle {
  debug = "color: #059669;";
  info = "color: #3b82f6;";
  warn = "color: #ca8a04;";
  error = "color: #ff0000;";
}

export class Logger {
  #name: string;
  #loggerStyle: LoggerStyle;

  constructor(name: string, loggerStyle?: LoggerStyle) {
    this.#name = name;
    this.#loggerStyle = loggerStyle ?? new DefaultLoggerStyle();
  }

  get #isDebug() {
    return document.getElementsByTagName("tnt-debug").length > 0;
  }

  info(message: string, debug = false) {
    if (debug && !this.#isDebug) return;
    console.log(`%c${debug ? "[DEBUG]" : ""}[${this.#name}] ${message}`, this.#loggerStyle.info);
  }

  debug(message: string) {
    if (!this.#isDebug) return;
    console.log(`%c[${this.#name}] ${message}`, this.#loggerStyle.debug);
  }

  warn(message: string, debug = false) {
    if (debug && !this.#isDebug) return;
    console.warn(`%c${debug ? "[DEBUG]" : ""}[${this.#name}] WARNING: ${message}`, this.#loggerStyle.warn);
  }

  error(message: string, debug = false) {
    if (debug && !this.#isDebug) return;
    console.error(`%c${debug ? "[DEBUG]" : ""}[${this.#name}] ERROR: ${message}`, this.#loggerStyle.error);
  }
}