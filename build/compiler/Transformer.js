"use strict";
// Harvey Randall 2020-2022, Transfomer
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformer = void 0;
var traverser_1 = require("./traverser");
function transformer(ast) {
    var newAst = {
        type: 'Program',
        body: [],
    };
    ast._context = newAst.body;
    (0, traverser_1.traverser)(ast, {
        NumberLiteral: {
            enter: function (node, parent) {
                var _a;
                (_a = parent === null || parent === void 0 ? void 0 : parent._context) === null || _a === void 0 ? void 0 : _a.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },
        StringLiteral: {
            enter: function (node, parent) {
                var _a;
                (_a = parent === null || parent === void 0 ? void 0 : parent._context) === null || _a === void 0 ? void 0 : _a.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },
        NameLiteral: {
            enter: function (node, parent) {
                var _a;
                (_a = parent === null || parent === void 0 ? void 0 : parent._context) === null || _a === void 0 ? void 0 : _a.push({
                    type: 'NameLiteral',
                    value: node.value,
                });
            },
        },
        CallExpression: {
            enter: function (node, parent) {
                var _a;
                var expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                };
                node._context = expression.arguments;
                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression,
                    };
                }
                (_a = parent === null || parent === void 0 ? void 0 : parent._context) === null || _a === void 0 ? void 0 : _a.push(expression);
            },
        },
    });
    return newAst;
}
exports.transformer = transformer;
