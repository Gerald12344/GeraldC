import { createLogger, Logger } from 'winston';
import TransportStream from 'winston-transport';
const Transport = require('winston-transport');

// Levels to make it beautiful!!!
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const Colors: {
    [key: string]: string;
} = {
    info: '\x1b[36m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    debug: '\x1b[43m',
    text: '\x1b[0m',
};

interface loggerInfo {
    level: string;
    message: string;
    stack: string;
}

// My own transporter for hot colours ;)
class SimpleConsoleTransport extends Transport {
    constructor() {
        super();
    }
    log = (info: loggerInfo, callback: CallableFunction) => {
        const { level, message, stack } = info;
        console.log(`${Colors[level]}[${level}]${Colors.text} - ${message}`);
        if (callback) {
            callback();
        }
    };
}
let LoggerHandle: undefined | Logger;

export function fetchLogger() {
    return LoggerHandle;
}

export function CreateMainLogger() {
    LoggerHandle = createLogger({
        level: level(),
        levels,
        transports: [new SimpleConsoleTransport()] as unknown[] as TransportStream[],
    });

    return LoggerHandle;
}
