"use strict";
// Harvey Randall 2020-2022, Coge Generator to create the js codes
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGenerator = exports.clearcache = exports.FileDependencies = exports.modules = void 0;
var fs_1 = require("fs");
var compilerOtherFiles_1 = require("./compilerOtherFiles");
var logger_1 = require("../utils/logger");
var path_1 = require("path");
// [Tranverser] -> [Compiler] -> [Bundler/Minification]
var modules = [];
exports.modules = modules;
var FileDependencies = [];
exports.FileDependencies = FileDependencies;
var pluginDependecies = {};
function clearcache() {
    exports.modules = modules = [];
    exports.FileDependencies = FileDependencies = [];
    pluginDependecies = {};
}
exports.clearcache = clearcache;
function codeGenerator(node, InjectJS) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61;
    if (InjectJS === void 0) { InjectJS = false; }
    switch (node.type) {
        case 'Program':
            return node.body.map(function (e) { return codeGenerator(e); }).join('\n');
        case 'ExpressionStatement':
            return codeGenerator(node.expression);
        case 'CallExpression':
            switch ((_a = node === null || node === void 0 ? void 0 : node.callee) === null || _a === void 0 ? void 0 : _a.name) {
                case 'add':
                    return ((_c = (_b = node === null || node === void 0 ? void 0 : node.arguments) === null || _b === void 0 ? void 0 : _b.map(function (e) { return codeGenerator(e); })) === null || _c === void 0 ? void 0 : _c.join(' + ')) || '';
                case 'subtract':
                    return '(' + ((_e = (_d = node === null || node === void 0 ? void 0 : node.arguments) === null || _d === void 0 ? void 0 : _d.map(function (e) { return codeGenerator(e); })) === null || _e === void 0 ? void 0 : _e.join(' - ')) + ')';
                case 'mutiply':
                    return '(' + ((_g = (_f = node === null || node === void 0 ? void 0 : node.arguments) === null || _f === void 0 ? void 0 : _f.map(function (e) { return codeGenerator(e); })) === null || _g === void 0 ? void 0 : _g.join(' * ')) + ')';
                case 'divide':
                    return '(' + ((_j = (_h = node === null || node === void 0 ? void 0 : node.arguments) === null || _h === void 0 ? void 0 : _h.map(function (e) { return codeGenerator(e); })) === null || _j === void 0 ? void 0 : _j.join(' / ')) + ')';
                case 'if':
                    var ifStuff_1 = (_k = node === null || node === void 0 ? void 0 : node.arguments) === null || _k === void 0 ? void 0 : _k.map(function (e) { return codeGenerator(e); });
                    ifStuff_1 === null || ifStuff_1 === void 0 ? void 0 : ifStuff_1.splice(0, 1).join(',');
                    ifStuff_1 === null || ifStuff_1 === void 0 ? void 0 : ifStuff_1.forEach(function (e, i) {
                        if (i + 1 === (ifStuff_1 === null || ifStuff_1 === void 0 ? void 0 : ifStuff_1.length))
                            return;
                        ifStuff_1[i] = e.replace('"', '').replace('"', '');
                    });
                    var lasts = ifStuff_1[ifStuff_1.length - 1];
                    ifStuff_1.splice(ifStuff_1.length - 1, 1);
                    return "if(".concat(((_l = node === null || node === void 0 ? void 0 : node.arguments) === null || _l === void 0 ? void 0 : _l.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), "){").concat(lasts, "}");
                case 'call':
                    var propses = (_m = node === null || node === void 0 ? void 0 : node.arguments) === null || _m === void 0 ? void 0 : _m.map(function (e) { return codeGenerator(e); });
                    propses.splice(0, 1).join(',');
                    return "".concat(((_o = node === null || node === void 0 ? void 0 : node.arguments) === null || _o === void 0 ? void 0 : _o.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), "(").concat(propses, ")");
                case 'function':
                    var propss_1 = (_p = node === null || node === void 0 ? void 0 : node.arguments) === null || _p === void 0 ? void 0 : _p.map(function (e) { return codeGenerator(e); });
                    propss_1.splice(0, 1).join(',');
                    propss_1.forEach(function (e, i) {
                        if (i + 1 === propss_1.length)
                            return;
                        propss_1[i] = e.replace('"', '').replace('"', '');
                    });
                    var last = propss_1[propss_1.length - 1];
                    propss_1.splice(propss_1.length - 1, 1);
                    return "function ".concat(((_q = node === null || node === void 0 ? void 0 : node.arguments) === null || _q === void 0 ? void 0 : _q.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), "(").concat(propss_1.join(','), "){").concat(last, "}");
                case 'Arrowfunc':
                    var propsss_1 = (_r = node === null || node === void 0 ? void 0 : node.arguments) === null || _r === void 0 ? void 0 : _r.map(function (e) { return codeGenerator(e); });
                    propsss_1.forEach(function (e, i) {
                        propsss_1[i] = e.replace('"', '').replace('"', '');
                    });
                    propsss_1.splice(propsss_1.length - 1, 1);
                    return "(".concat(propsss_1.join(','), ") => {").concat((_s = node === null || node === void 0 ? void 0 : node.arguments) === null || _s === void 0 ? void 0 : _s.map(function (e) { return codeGenerator(e); })[((_u = (_t = node === null || node === void 0 ? void 0 : node.arguments) === null || _t === void 0 ? void 0 : _t.map(function (e) { return codeGenerator(e); })) === null || _u === void 0 ? void 0 : _u.length) - 1], "}");
                case 'selfCallingFunction':
                    var propssss_1 = (_v = node === null || node === void 0 ? void 0 : node.arguments) === null || _v === void 0 ? void 0 : _v.map(function (e) { return codeGenerator(e); });
                    propssss_1.forEach(function (e, i) {
                        propssss_1[i] = e.replace('"', '').replace('"', '');
                    });
                    propssss_1.splice(propssss_1.length - 1, 1);
                    return "((".concat(propssss_1.join(','), ") => {").concat((_w = node === null || node === void 0 ? void 0 : node.arguments) === null || _w === void 0 ? void 0 : _w.map(function (e) { return codeGenerator(e); })[((_y = (_x = node === null || node === void 0 ? void 0 : node.arguments) === null || _x === void 0 ? void 0 : _x.map(function (e) { return codeGenerator(e); })) === null || _y === void 0 ? void 0 : _y.length) - 1], "})(").concat(propssss_1.join(','), ");");
                case 'sendOut':
                    var inputs = (_z = node === null || node === void 0 ? void 0 : node.arguments) === null || _z === void 0 ? void 0 : _z.map(function (e) { return codeGenerator(e); })[0];
                    if (((_1 = (_0 = node === null || node === void 0 ? void 0 : node.arguments) === null || _0 === void 0 ? void 0 : _0.map(function (e) { return codeGenerator(e); })) === null || _1 === void 0 ? void 0 : _1.length) > 1) {
                        return "console.log(".concat((_3 = (_2 = node === null || node === void 0 ? void 0 : node.arguments) === null || _2 === void 0 ? void 0 : _2.map(function (e) { return codeGenerator(e); })) === null || _3 === void 0 ? void 0 : _3.join(','), ")");
                    }
                    else {
                        return "console.log(".concat(inputs, ")");
                    }
                case 'else':
                    return "else{".concat((_4 = node === null || node === void 0 ? void 0 : node.arguments) === null || _4 === void 0 ? void 0 : _4.map(function (e) { return codeGenerator(e); }), "}");
                case 'promise':
                    var promiseArray = (_5 = node === null || node === void 0 ? void 0 : node.arguments) === null || _5 === void 0 ? void 0 : _5.map(function (e) { return codeGenerator(e); });
                    promiseArray.splice(0, 2);
                    return "return(new Promise((".concat(((_6 = node === null || node === void 0 ? void 0 : node.arguments) === null || _6 === void 0 ? void 0 : _6.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), ", ").concat(((_7 = node === null || node === void 0 ? void 0 : node.arguments) === null || _7 === void 0 ? void 0 : _7.map(function (e) { return codeGenerator(e); })[1])
                        .replace('"', '')
                        .replace('"', ''), ") => {").concat(promiseArray.join(';'), "}))");
                case 'iNeed':
                    modules.push(((_8 = node === null || node === void 0 ? void 0 : node.arguments) === null || _8 === void 0 ? void 0 : _8.map(function (e) { return codeGenerator(e); })[0]).replace(/"/g, ""));
                    return "require(".concat((_9 = node === null || node === void 0 ? void 0 : node.arguments) === null || _9 === void 0 ? void 0 : _9.map(function (e) { return codeGenerator(e); }), ")");
                case 'iWant':
                    var data = (0, fs_1.readFileSync)(((_10 = node === null || node === void 0 ? void 0 : node.arguments) === null || _10 === void 0 ? void 0 : _10.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), 'utf-8');
                    var response = (0, compilerOtherFiles_1.CompiledOtherFiles)(data);
                    return response;
                case 'harvscript':
                    var dataInputMain = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../packages/harv-script/index.harvey'), 'utf-8');
                    return (0, compilerOtherFiles_1.CompiledOtherFiles)(dataInputMain);
                case 'async':
                    return "async ".concat((_11 = node === null || node === void 0 ? void 0 : node.arguments) === null || _11 === void 0 ? void 0 : _11.map(function (e) { return codeGenerator(e); }));
                case 'wait':
                    return "await ".concat((_12 = node === null || node === void 0 ? void 0 : node.arguments) === null || _12 === void 0 ? void 0 : _12.map(function (e) { return codeGenerator(e); }));
                case 'new':
                    return "new ".concat((_13 = node === null || node === void 0 ? void 0 : node.arguments) === null || _13 === void 0 ? void 0 : _13.map(function (e) { return codeGenerator(e); }));
                case 'letsmake':
                    var inputing = (_14 = node === null || node === void 0 ? void 0 : node.arguments) === null || _14 === void 0 ? void 0 : _14.map(function (e) { return codeGenerator(e); })[1];
                    return "let ".concat(((_15 = node === null || node === void 0 ? void 0 : node.arguments) === null || _15 === void 0 ? void 0 : _15.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', ''), " = ").concat(inputing);
                case 'object':
                    if (((_17 = (_16 = node === null || node === void 0 ? void 0 : node.arguments) === null || _16 === void 0 ? void 0 : _16.map(function (e) { return codeGenerator(e); })) === null || _17 === void 0 ? void 0 : _17.length) === 0) {
                        return "{}";
                    }
                    return "{".concat((_18 = node === null || node === void 0 ? void 0 : node.arguments) === null || _18 === void 0 ? void 0 : _18.map(function (e) { return codeGenerator(e); })[0], ": ").concat((_19 = node === null || node === void 0 ? void 0 : node.arguments) === null || _19 === void 0 ? void 0 : _19.map(function (e) { return codeGenerator(e); })[1], "}");
                case 'if':
                    return "if(".concat((_20 = node === null || node === void 0 ? void 0 : node.arguments) === null || _20 === void 0 ? void 0 : _20.map(function (e) { return codeGenerator(e); })[0], ")");
                case 'after':
                    return ".then(".concat((_21 = node === null || node === void 0 ? void 0 : node.arguments) === null || _21 === void 0 ? void 0 : _21.map(function (e) { return codeGenerator(e); })[0], ")");
                case 'error':
                    return ".catch(".concat((_22 = node === null || node === void 0 ? void 0 : node.arguments) === null || _22 === void 0 ? void 0 : _22.map(function (e) { return codeGenerator(e); })[0], ")");
                case 'reply':
                    return "return(".concat((_23 = node === null || node === void 0 ? void 0 : node.arguments) === null || _23 === void 0 ? void 0 : _23.map(function (e) { return codeGenerator(e); })[0], ")");
                case 'innerLoop':
                    return "{".concat((_25 = (_24 = node === null || node === void 0 ? void 0 : node.arguments) === null || _24 === void 0 ? void 0 : _24.map(function (e) { return codeGenerator(e); })) === null || _25 === void 0 ? void 0 : _25.join(';'), "}");
                case 'body':
                    return "".concat((_27 = (_26 = node === null || node === void 0 ? void 0 : node.arguments) === null || _26 === void 0 ? void 0 : _26.map(function (e) { return codeGenerator(e); })) === null || _27 === void 0 ? void 0 : _27.join(';'));
                case 'typeof':
                    return "typeof ".concat((_28 = node === null || node === void 0 ? void 0 : node.arguments) === null || _28 === void 0 ? void 0 : _28.map(function (e) { return codeGenerator(e); })[0]);
                case 'var':
                    return ((_29 = node === null || node === void 0 ? void 0 : node.arguments) === null || _29 === void 0 ? void 0 : _29.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', '');
                case 'return':
                    return 'return';
                case 'ToNumber':
                    return ((_30 = node === null || node === void 0 ? void 0 : node.arguments) === null || _30 === void 0 ? void 0 : _30.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', '');
                case 'equal':
                    return "".concat((_31 = node === null || node === void 0 ? void 0 : node.arguments) === null || _31 === void 0 ? void 0 : _31.map(function (e) { return codeGenerator(e); })[0], " === ").concat((_32 = node === null || node === void 0 ? void 0 : node.arguments) === null || _32 === void 0 ? void 0 : _32.map(function (e) { return codeGenerator(e); })[1]);
                case 'notequal':
                    return "!(".concat((_33 = node === null || node === void 0 ? void 0 : node.arguments) === null || _33 === void 0 ? void 0 : _33.map(function (e) { return codeGenerator(e); })[0], " === ").concat((_34 = node === null || node === void 0 ? void 0 : node.arguments) === null || _34 === void 0 ? void 0 : _34.map(function (e) { return codeGenerator(e); })[1], ")");
                case 'and':
                    return "".concat((_35 = node === null || node === void 0 ? void 0 : node.arguments) === null || _35 === void 0 ? void 0 : _35.map(function (e) { return codeGenerator(e); })[0], " && ").concat((_36 = node === null || node === void 0 ? void 0 : node.arguments) === null || _36 === void 0 ? void 0 : _36.map(function (e) { return codeGenerator(e); })[1]);
                case 'true':
                    return 'true';
                case 'false':
                    return 'false';
                case 'loop':
                    var using = (_37 = node === null || node === void 0 ? void 0 : node.arguments) === null || _37 === void 0 ? void 0 : _37.map(function (e) { return codeGenerator(e); });
                    var lastes = using[using.length - 1];
                    var variable = ((_38 = node === null || node === void 0 ? void 0 : node.arguments) === null || _38 === void 0 ? void 0 : _38.map(function (e) { return codeGenerator(e); })[0])
                        .replace('"', '')
                        .replace('"', '');
                    return "for(let ".concat(variable, "=0;").concat(variable, "<").concat((_39 = node === null || node === void 0 ? void 0 : node.arguments) === null || _39 === void 0 ? void 0 : _39.map(function (e) { return codeGenerator(e); })[1], ";").concat(variable, "=").concat(variable, "+").concat((_40 = node === null || node === void 0 ? void 0 : node.arguments) === null || _40 === void 0 ? void 0 : _40.map(function (e) { return codeGenerator(e); })[2], "){").concat(lastes, "}");
                case 'get':
                    return "document.getElementById(".concat((_41 = node === null || node === void 0 ? void 0 : node.arguments) === null || _41 === void 0 ? void 0 : _41.map(function (e) { return codeGenerator(e); }), ")");
                case 'assign':
                    return "".concat((_42 = node === null || node === void 0 ? void 0 : node.arguments) === null || _42 === void 0 ? void 0 : _42.map(function (e) { return codeGenerator(e); })[0], " = ").concat((_43 = node === null || node === void 0 ? void 0 : node.arguments) === null || _43 === void 0 ? void 0 : _43.map(function (e) { return codeGenerator(e); })[1]);
                case 'string':
                    return "'".concat((_45 = (_44 = node === null || node === void 0 ? void 0 : node.arguments) === null || _44 === void 0 ? void 0 : _44.map(function (e) { return codeGenerator(e); })) === null || _45 === void 0 ? void 0 : _45.map(function (e) {
                        return "".concat(e).replace('/\n/g', '').replace(/\s\s+/g, ' ');
                    }), "'");
                case 'toString':
                    return '`${' + ((_47 = (_46 = node === null || node === void 0 ? void 0 : node.arguments) === null || _46 === void 0 ? void 0 : _46.map(function (e) { return codeGenerator(e); })) === null || _47 === void 0 ? void 0 : _47.join('')) + '}`';
                case 'array':
                    return "[".concat((_49 = (_48 = node === null || node === void 0 ? void 0 : node.arguments) === null || _48 === void 0 ? void 0 : _48.map(function (e) { return codeGenerator(e); })) === null || _49 === void 0 ? void 0 : _49.join(','), "]");
                case 'itterate':
                    var original = (_50 = node === null || node === void 0 ? void 0 : node.arguments) === null || _50 === void 0 ? void 0 : _50.map(function (e) { return codeGenerator(e); })[0];
                    var arr = (_51 = node === null || node === void 0 ? void 0 : node.arguments) === null || _51 === void 0 ? void 0 : _51.map(function (e) { return codeGenerator(e); });
                    arr.shift();
                    return "".concat(original).concat(arr.map(function (e) { return "[".concat(e, "]"); }).join(""));
                case 'concat':
                    return "".concat((_53 = (_52 = node === null || node === void 0 ? void 0 : node.arguments) === null || _52 === void 0 ? void 0 : _52.map(function (e) { return codeGenerator(e); })) === null || _53 === void 0 ? void 0 : _53.join(''));
                case 'null':
                    return "null";
                case 'throwError':
                    return "throw new Error(".concat((_55 = (_54 = node === null || node === void 0 ? void 0 : node.arguments) === null || _54 === void 0 ? void 0 : _54.map(function (e) { return codeGenerator(e); })) === null || _55 === void 0 ? void 0 : _55.join(''), ")");
                case 'delete':
                    return "delete ".concat((_57 = (_56 = node === null || node === void 0 ? void 0 : node.arguments) === null || _56 === void 0 ? void 0 : _56.map(function (e) { return codeGenerator(e); })) === null || _57 === void 0 ? void 0 : _57.join(''));
                case 'package':
                    var dataIn = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../../packages/harv-script', '/', ((_58 = node === null || node === void 0 ? void 0 : node.arguments) === null || _58 === void 0 ? void 0 : _58.map(function (e) { return codeGenerator(e); })[0]).replace('"', '') +
                        '/index.harvey'.replace('"', '')), 'utf-8');
                    var response2 = (0, compilerOtherFiles_1.CompiledOtherFiles)(dataIn);
                    return response2;
                case 'pluginFetch':
                    var dataIn3 = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../packages/harv-script', '/', ((_59 = node === null || node === void 0 ? void 0 : node.arguments) === null || _59 === void 0 ? void 0 : _59.map(function (e) { return codeGenerator(e); })[0]).replace(/\"/g, '')), 'utf-8');
                    var response3 = (0, compilerOtherFiles_1.CompiledOtherFiles)(dataIn3);
                    return response3;
            }
        case 'Identifier':
            return node.name;
        case 'NameLiteral':
            return (_60 = "".concat(node.value)) !== null && _60 !== void 0 ? _60 : "";
        case 'NumberLiteral':
            return node.value;
        case 'StringLiteral':
            return "\"" + node.value + "\"";
        default:
            (_61 = (0, logger_1.fetchLogger)()) === null || _61 === void 0 ? void 0 : _61.log('error', node === null || node === void 0 ? void 0 : node.type);
            throw new Error(node === null || node === void 0 ? void 0 : node.type);
    }
}
exports.codeGenerator = codeGenerator;
