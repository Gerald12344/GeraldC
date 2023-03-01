"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileFile = exports.browserifyModules = void 0;
var browserify_1 = __importDefault(require("browserify"));
var fs_1 = require("fs");
var javascript_obfuscator_1 = require("javascript-obfuscator");
var path_1 = require("path");
var SSR_Utils_1 = require("../prod/SSR_Utils");
var createApp_1 = require("../utils/createApp");
var logger_1 = require("../utils/logger");
var pluginManager_1 = require("../utils/pluginManager");
var settings_1 = require("../utils/settings");
var codeGenerators_1 = require("./codeGenerators");
var Parse_1 = require("./Parse");
var Tokeniser_1 = require("./Tokeniser");
var Transformer_1 = require("./Transformer");
var headers = {
    headers: '/* \n* \n*          HHHHHHHHH     HHHHHHHHH \n*          H:::::::H     H:::::::H \n*          H:::::::H     H:::::::H \n*          HH::::::H     H::::::HH \n*            H:::::H     H:::::H    aaaaaaaaaaaaa  rrrrr   rrrrrrrrrvvvvvvv           vvvvvvv eeeeeeeeeeee  yyyyyyy           yyyyyyy \n*            H:::::H     H:::::H    a::::::::::::a r::::rrr:::::::::rv:::::v         v:::::vee::::::::::::ee y:::::y         y:::::y \n*            H::::::HHHHH::::::H    aaaaaaaaa:::::ar:::::::::::::::::rv:::::v       v:::::ve::::::eeeee:::::eey:::::y       y:::::y \n*            H:::::::::::::::::H             a::::arr::::::rrrrr::::::rv:::::v     v:::::ve::::::e     e:::::e y:::::y     y:::::y \n*            H:::::::::::::::::H      aaaaaaa:::::a r:::::r     r:::::r v:::::v   v:::::v e:::::::eeeee::::::e  y:::::y   y:::::y \n*            H::::::HHHHH::::::H    aa::::::::::::a r:::::r     rrrrrrr  v:::::v v:::::v  e:::::::::::::::::e    y:::::y y:::::y \n*            H:::::H     H:::::H   a::::aaaa::::::a r:::::r               v:::::v:::::v   e::::::eeeeeeeeeee      y:::::y:::::y \n*            H:::::H     H:::::H  a::::a    a:::::a r:::::r                v:::::::::v    e:::::::e                y:::::::::y \n*          HH::::::H     H::::::HHa::::a    a:::::a r:::::r                 v:::::::v     e::::::::e                y:::::::y \n*   ...... H:::::::H     H:::::::Ha:::::aaaa::::::a r:::::r                  v:::::v       e::::::::eeeeeeee         y:::::y \n*   .::::. H:::::::H     H:::::::H a::::::::::aa:::ar:::::r                   v:::v         ee:::::::::::::e        y:::::y \n*   ...... HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaarrrrrrr                    vvv            eeeeeeeeeeeeee       y:::::y \n*                                                                                                                 y:::::y \n*                                                                                                                y:::::y \n*                                                                                                               y:::::y \n*                                                                                                              y:::::y \n*                                                                                                             yyyyyyy \n* \n*        ',
};
function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
function browserifyModules() {
    var settings = (0, settings_1.fetchSettings)();
    if (settings.browserify) {
        var b = (0, browserify_1.default)();
        codeGenerators_1.modules.forEach(function (e) {
            b.require(e);
        });
        if (!(0, fs_1.existsSync)("".concat(settings.outputFolder, "/packages"))) {
            (0, fs_1.mkdirSync)("".concat(settings.outputFolder, "/packages"));
        }
        var file = require('fs').createWriteStream("".concat(settings.outputFolder, "/packages/HarvScript_Bundle_1.js"));
        file.write(headers.headers +
            "\n* \n*      * ____________________________________________________________________ *      \n*      *                     (c) Harvey Randall - 2021                        *\n*      *                   https://github.com/Gerald12344                     *\n*      * This final contains all the JS imports required to use the website   *\n*      * For lisencing and stuff check the github page, and start the project *\n*      * ____________________________________________________________________ *\n*  \n* \u201CA day may come when the courage of men fails, when we forsake our friends and break all bonds of fellowship, but it is not this day.\u201C \n* - Harvey Randall 2021\n*/\n");
        var stream_1 = b.bundle().pipe(file);
        return new Promise(function (resolve) {
            stream_1.on('finish', function () {
                resolve();
            });
        });
    }
}
exports.browserifyModules = browserifyModules;
function compileFile(fileDirec, direc, InjectJS) {
    if (direc === void 0) { direc = false; }
    if (InjectJS === void 0) { InjectJS = false; }
    return __awaiter(this, void 0, void 0, function () {
        var logger, input, settings, tokens, ast, newAst, output, Dependencies2, MainOut, code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = (0, logger_1.fetchLogger)();
                    input = '';
                    if (direc === false) {
                        try {
                            input = (0, fs_1.readFileSync)(fileDirec, 'utf8');
                        }
                        catch (_b) {
                            logger === null || logger === void 0 ? void 0 : logger.log('error', 'File not found');
                        }
                    }
                    else {
                        input = fileDirec;
                    }
                    (0, codeGenerators_1.clearcache)();
                    settings = (0, settings_1.fetchSettings)();
                    if (!(0, fs_1.existsSync)("".concat(settings.outputFolder))) {
                        (0, fs_1.mkdirSync)("".concat(settings.outputFolder));
                    }
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', 'Loading Plugins');
                    }
                    (0, pluginManager_1.loadPlugins)();
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', 'All Plugins loaded Successfully');
                    }
                    console.log('\x1b[34m', 'Compiling Code Stand by...', '\x1b[0m');
                    console.log('\x1b[36m', '[                       ]', '\x1b[0m');
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', 'Tokenizing please hang on...');
                    }
                    tokens = (0, Tokeniser_1.tokenizer)(input);
                    console.log('\x1b[34m', 'Compiling Code Stand by...', '\x1b[0m');
                    console.log('\x1b[36m', '[======                 ]', '\x1b[0m');
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', 'Parsing please hang on...');
                    }
                    ast = (0, Parse_1.parser)(tokens);
                    console.log('\x1b[34m', 'Compiling Code Stand by...', '\x1b[0m');
                    console.log('\x1b[36m', '[============           ]', '\x1b[0m');
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', "Transforming please hang on...");
                    }
                    newAst = (0, Transformer_1.transformer)(ast);
                    console.log('\x1b[34m', 'Compiling Code Stand by...', '\x1b[0m');
                    console.log('\x1b[36m', '[==================     ]', '\x1b[0m');
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', "Generating Code please hang on...");
                    }
                    output = (0, codeGenerators_1.codeGenerator)(newAst, InjectJS);
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', "Cleaning up Dependencies");
                    }
                    Dependencies2 = uniq(codeGenerators_1.FileDependencies);
                    output = Dependencies2.join(';') + output;
                    if (settings.debugFile === true) {
                        try {
                            (0, createApp_1.createFolder)((0, path_1.join)("./".concat(settings.outputFolder), "/".concat(settings.debugFileLocation)));
                            (0, fs_1.writeFileSync)((0, path_1.join)("./".concat(settings.outputFolder), "/".concat(settings.debugFileLocation), "/".concat(settings.debugFileName)), output);
                        }
                        catch (_c) {
                            logger === null || logger === void 0 ? void 0 : logger.log('error', 'Yikes, Error writing to debug file.');
                            process.exit(1);
                        }
                    }
                    MainOut = output;
                    if (settings.obuscateOutput) {
                        if (settings.debug) {
                            logger === null || logger === void 0 ? void 0 : logger.log('warn', "Obfuscating and minifying output!");
                        }
                        code = (0, SSR_Utils_1.removeServerSideStuff)(output, { noUseUpdate: false }).code;
                        MainOut = (0, javascript_obfuscator_1.obfuscate)(code, {});
                    }
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', "Writing to build file!");
                    }
                    try {
                        (0, fs_1.writeFileSync)("".concat(settings.outputFolder, "/").concat(settings.outputFileName), headers.headers +
                            '\n* Harvey Programming Compiled Stuff, you touch you break \n* For licensing and for copy right stuff please check the legal stuff below \n* This is the compiled file and is optimised and obuscated if you want to see the compiled source code look at CompiledJS.js \n* --[[Code will start soon I promise]]-- \n* Look away its hard to understand. \n*/\n' +
                            MainOut);
                    }
                    catch (err) {
                        logger === null || logger === void 0 ? void 0 : logger.log('error', 'Yikes, Error writing to output file.');
                        process.exit(1);
                    }
                    if (settings.debug) {
                        logger === null || logger === void 0 ? void 0 : logger.log('warn', "Bundling all external modules!");
                    }
                    return [4 /*yield*/, browserifyModules()];
                case 1:
                    _a.sent();
                    console.log('\x1b[34m', 'Code Compiled.', '\x1b[0m');
                    console.log('\x1b[36m', '[=======================]', '\x1b[0m');
                    return [2 /*return*/, output];
            }
        });
    });
}
exports.compileFile = compileFile;
