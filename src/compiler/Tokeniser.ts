// Harvey Randall 2020-2022, Tokenizer to turn String into Tokens

// [String] -> [Tokeniser] -> [Parser]

import { outputTozenised } from '../types/maintypes';
import { fetchLogger } from '../utils/logger';


export function tokenizer(input: string): outputTozenised[] {
    let current = 0;
    let tokens: outputTozenised[] = [];


    let linedInput = input.replaceAll("\n", "").split(';');

    for (let i = 0; i < linedInput.length; i++) {
        let line = linedInput[i];

        tokens.push({
            type: 'LINE',
            value: 'START',
        });

        const LETTERS = /[a-z]/i;
        const NUMBERS = /[0-9]/i;

        const splitUp = line.split("")
        console.log(splitUp)
        for (let m = 0; m < splitUp.length; m++) {
            let k = splitUp[m];
            console.log(k)

            if (k === '') continue;

            if (k === '{') {
                tokens.push({
                    type: 'BLOCK',
                    value: 'START',
                });
                tokens.push({
                    type: 'LINE',
                    value: 'START',
                });
            } else if (k === '}') {
                tokens.push({
                    type: 'LINE',
                    value: 'END',
                });
                tokens.push({
                    type: 'BLOCK',
                    value: 'END',
                });

            } else if (k === '(') {
                tokens.push({
                    type: 'PAREN',
                    value: 'START',
                });
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'START',
                });
            } else if (k === ',') {
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'END',
                });
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'START',
                });

            } else if (k === ')') {
                tokens.push({
                    type: 'BLOCK_BLOCK',
                    value: 'END',
                });
                tokens.push({
                    type: 'PAREN',
                    value: 'END',
                });
            } else if (k === '=') {
                tokens.push({
                    type: 'ASSIGN',
                    value: k,
                });
            } else if (k.match(/(==|>|<|>=|<=)/)) {
                tokens.push({
                    type: 'COMPARATOR',
                    value: k,
                });
            } else if (k.match(NUMBERS)) {
                let val = "";
                let workingVal = m;
                while (NUMBERS.test(k)) {
                    val += k;
                    k = splitUp[++workingVal];
                }
                m = workingVal - 1;
                tokens.push({
                    type: 'NUMBER',
                    value: val,
                });
            } else if (k.match(/[+\-*/]/)) {
                tokens.push({
                    type: 'OPERATOR',
                    value: k,
                });
            } else if (k.match(/[a-zA-Z]/)) {
                let val = "";
                let workingVal = m;
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
                } else {
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
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'ASSIGN' && tokens[i + 1]?.type === 'ASSIGN') {
            tokens[i].type = 'COMPARATOR';
            tokens[i].value = '==';
            tokens.splice(i + 1, 1);

        }
    }



    return tokens;
}
