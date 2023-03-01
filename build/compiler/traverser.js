"use strict";
// Harvey Randall 2020-2022, Traverse AST
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverser = void 0;
var logger_1 = require("../utils/logger");
function traverser(ast, visitor) {
    function traverseArray(array, parent) {
        array === null || array === void 0 ? void 0 : array.forEach(function (child) {
            traverseNode(child, parent);
        });
    }
    function traverseNode(node, parent) {
        var _a;
        var methods = visitor[node.type];
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }
        switch (node.type) {
            case 'Program':
                traverseArray(node.body, node);
                break;
            case 'CallExpression':
                traverseArray(node.params, node);
                break;
            case 'NameLiteral':
            case 'NumberLiteral':
            case 'StringLiteral':
                break;
            default:
                (_a = (0, logger_1.fetchLogger)()) === null || _a === void 0 ? void 0 : _a.log('error', node.type);
                throw new Error(node.type);
        }
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }
    traverseNode(ast, null);
}
exports.traverser = traverser;
