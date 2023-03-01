"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMainLogger = exports.fetchLogger = void 0;
var winston_1 = require("winston");
var Transport = require('winston-transport');
// Levels to make it beautiful!!!
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
var level = function () {
    var env = process.env.NODE_ENV || 'development';
    var isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
var Colors = {
    info: '\x1b[36m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    debug: '\x1b[43m',
    text: '\x1b[0m',
};
// My own transporter for hot colours ;)
var SimpleConsoleTransport = /** @class */ (function (_super) {
    __extends(SimpleConsoleTransport, _super);
    function SimpleConsoleTransport() {
        var _this = _super.call(this) || this;
        _this.log = function (info, callback) {
            var level = info.level, message = info.message, stack = info.stack;
            console.log("".concat(Colors[level], "[").concat(level, "]").concat(Colors.text, " - ").concat(message));
            if (callback) {
                callback();
            }
        };
        return _this;
    }
    return SimpleConsoleTransport;
}(Transport));
var LoggerHandle;
function fetchLogger() {
    return LoggerHandle;
}
exports.fetchLogger = fetchLogger;
function CreateMainLogger() {
    LoggerHandle = (0, winston_1.createLogger)({
        level: level(),
        levels: levels,
        transports: [new SimpleConsoleTransport()],
    });
    return LoggerHandle;
}
exports.CreateMainLogger = CreateMainLogger;
