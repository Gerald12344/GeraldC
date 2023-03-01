"use strict";
// Harvey Randall 2020-2022, Parser to turn Tokens into AST
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
function parser(tokens) {
    var current = 0;
    console.log(tokens);
    function walk() {
        var _a, _b, _c, _d;
        var token = tokens[current];
        if (token.type === 'NUMBER') {
            current++;
            return {
                type: 'NUMBER',
                value: token.value,
            };
        }
        if (token.type === 'COMPARATOR') {
            current++;
            return {
                type: 'COMPARATOR',
                value: token.value,
            };
        }
        if (token.type === 'TYPE') {
            current++;
            return {
                type: 'TYPE',
                value: token.value,
            };
        }
        if (token.type === 'OPERATOR') {
            current++;
            return {
                type: 'OPERATOR',
                value: token.value,
            };
        }
        if (token.type === 'STRING') {
            current++;
            return {
                type: 'STRING',
                value: token.value,
            };
        }
        if (token.type === 'LINE' && token.value === 'START') {
            var node = {
                type: 'LINE',
                value: token.value,
                params: [],
            };
            token = tokens[++current];
            while (token.type !== 'LINE' || (token.type === 'LINE' && token.value !== 'END')) {
                var moved = walk();
                if (moved) {
                    (_a = node === null || node === void 0 ? void 0 : node.params) === null || _a === void 0 ? void 0 : _a.push(moved);
                }
                token = tokens[current];
            }
            current++;
            return node;
        }
        if (token.type === 'BLOCK_BLOCK' && token.value === 'START') {
            var node = {
                type: 'BLOCK_BLOCK',
                value: token.value,
                params: [],
            };
            token = tokens[++current];
            while (token.type !== 'BLOCK_BLOCK' || (token.type === 'BLOCK_BLOCK' && token.value !== 'END')) {
                var moved = walk();
                if (moved) {
                    (_b = node === null || node === void 0 ? void 0 : node.params) === null || _b === void 0 ? void 0 : _b.push(moved);
                }
                token = tokens[current];
            }
            current++;
            return node;
        }
        if (token.type === 'PAREN' && token.value === 'START') {
            var node = {
                type: 'RETURN_BLOCK',
                value: token.value,
                params: [],
            };
            console.log(token);
            token = tokens[++current];
            console.log(token);
            while (token.type !== 'PAREN' || (token.type === 'PAREN' && token.value !== 'END')) {
                var moved = walk();
                if (moved) {
                    (_c = node === null || node === void 0 ? void 0 : node.params) === null || _c === void 0 ? void 0 : _c.push(moved);
                }
                token = tokens[current];
            }
            current++;
            return node;
        }
        if (token.type === 'ASSIGN') {
            var node = {
                type: 'ASSIGN',
                name: token.value,
            };
            current++;
            return node;
        }
        if (token.type === 'BLOCK' && token.value === 'START') {
            token = tokens[++current];
            var node = {
                type: 'BLOCK',
                name: token.value,
                params: [],
            };
            while (token.type !== 'BLOCK' || (token.type === 'BLOCK' && token.value !== 'END')) {
                var moved = walk();
                if (moved) {
                    (_d = node === null || node === void 0 ? void 0 : node.params) === null || _d === void 0 ? void 0 : _d.push(moved);
                }
                token = tokens[current];
            }
            current++;
            return node;
        }
        current++;
        //fetchLogger()?.log('error', token.type);
        //throw new Error(token.type);
    }
    var ast = {
        type: 'Program',
        body: [],
    };
    while (current < tokens.length) {
        var moved = walk();
        if (moved) {
            ast.body.push(moved);
        }
    }
    return ast;
}
exports.parser = parser;
