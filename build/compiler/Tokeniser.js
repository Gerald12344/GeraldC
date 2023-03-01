"use strict";
// Harvey Randall 2020-2022, Tokenizer to turn String into Tokens
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = void 0;
function tokenizer(input) {
    var _a;
    var current = 0;
    var tokens = [];
    var linedInput = input.replaceAll("\n", "").split(';');
    for (var i = 0; i < linedInput.length; i++) {
        var line = linedInput[i];
        tokens.push({
            type: 'LINE',
            value: 'START',
        });
        var LETTERS = /[a-z]/i;
        var NUMBERS = /[0-9]/i;
        var splitUp = line.split("");
        console.log(splitUp);
        for (var m = 0; m < splitUp.length; m++) {
            var k = splitUp[m];
            console.log(k);
            if (k === '')
                continue;
            if (k === '{') {
                tokens.push({
                    type: 'BLOCK',
                    value: 'START',
                });
                tokens.push({
                    type: 'LINE',
                    value: 'START',
                });
            }
            else if (k === '}') {
                tokens.push({
                    type: 'LINE',
                    value: 'END',
                });
                tokens.push({
                    type: 'BLOCK',
                    value: 'END',
                });
            }
            else if (k === '(') {
                tokens.push({
                    type: 'PAREN',
                    value: 'START',
                });
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'START',
                });
            }
            else if (k === ',') {
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'END',
                });
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'START',
                });
            }
            else if (k === ')') {
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'END',
                });
                tokens.push({
                    type: 'PAREN',
                    value: 'END',
                });
            }
            else if (k === '=') {
                tokens.push({
                    type: 'ASSIGN',
                    value: k,
                });
            }
            else if (k.match(/(==|>|<|>=|<=)/)) {
                tokens.push({
                    type: 'COMPARATOR',
                    value: k,
                });
            }
            else if (k.match(NUMBERS)) {
                var val = "";
                var workingVal = m;
                while (NUMBERS.test(k)) {
                    val += k;
                    k = splitUp[++workingVal];
                }
                m = workingVal - 1;
                tokens.push({
                    type: 'NUMBER',
                    value: val,
                });
            }
            else if (k.match(/[+\-*/]/)) {
                tokens.push({
                    type: 'OPERATOR',
                    value: k,
                });
            }
            else if (k.match(/[a-zA-Z]/)) {
                var val = "";
                var workingVal = m;
                while (LETTERS.test(k)) {
                    val += k;
                    k = splitUp[++workingVal];
                }
                m = workingVal - 1;
                if (val === 'int') {
                    tokens.push({
                        type: 'TYPE',
                        value: val,
                    });
                }
                else {
                    tokens.push({
                        type: 'STRING',
                        value: val,
                    });
                }
            }
        }
        tokens.push({
            type: 'LINE',
            value: 'END',
        });
    }
    // remove double equals
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'ASSIGN' && ((_a = tokens[i + 1]) === null || _a === void 0 ? void 0 : _a.type) === 'ASSIGN') {
            tokens[i].type = 'COMPARATOR';
            tokens[i].value = '==';
            tokens.splice(i + 1, 1);
        }
    }
    return tokens;
}
exports.tokenizer = tokenizer;
