// Harvey Randall 2020-2022, Parser to turn Tokens into AST

// [Tokeniser] -> [Paset (AST)] -> [Traverser]

import { astRoot, mainNode, outputTozenised } from '../types/maintypes';
import { fetchLogger } from '../utils/logger';


export function parser(tokens: outputTozenised[]): astRoot {
    let current = 0;
    console.log(tokens)


    function walk(): mainNode | undefined {
        let token = tokens[current];


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


            let node: mainNode = {
                type: 'LINE',
                value: token.value,
                params: [],
            };
            token = tokens[++current];



            while (token.type !== 'LINE' || (token.type === 'LINE' && token.value !== 'END')) {

                let moved = walk()
                if (moved) {
                    node?.params?.push(moved);
                }
                token = tokens[current];

            }
            current++;
            return node;
        }
        if (token.type === 'BLOCK_BLOCK' && token.value === 'START') {


            let node: mainNode = {
                type: 'BLOCK_BLOCK',
                value: token.value,
                params: [],
            };
            token = tokens[++current];


            while (token.type !== 'BLOCK_BLOCK' || (token.type === 'BLOCK_BLOCK' && token.value !== 'END')) {

                let moved = walk()
                if (moved) {
                    node?.params?.push(moved);
                }
                token = tokens[current];

            }
            current++;
            return node;
        }

        if (token.type === 'PAREN' && token.value === 'START') {


            let node: mainNode = {
                type: 'RETURN_BLOCK',
                value: token.value,
                params: [],
            };
            console.log(token)
            token = tokens[++current];


            console.log(token)
            while (token.type !== 'PAREN' || (token.type === 'PAREN' && token.value !== 'END')) {

                let moved = walk()
                if (moved) {
                    node?.params?.push(moved);
                }
                token = tokens[current];

            }
            current++;
            return node;

        }
        if (token.type === 'ASSIGN') {
            let node: mainNode = {
                type: 'ASSIGN',
                name: token.value,
            };
            current++

            return node
        }
        if (token.type === 'BLOCK' && token.value === 'START') {

            token = tokens[++current];
            let node: mainNode = {
                type: 'BLOCK',
                name: token.value,
                params: [],
            };


            while (token.type !== 'BLOCK' || (token.type === 'BLOCK' && token.value !== 'END')) {

                let moved = walk()
                if (moved) {
                    node?.params?.push(moved);
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
    let ast: astRoot = {
        type: 'Program',
        body: [],
    };

    while (current < tokens.length) {
        let moved = walk()
        if (moved) {
            ast.body.push(moved);
        }

    }
    return ast;
}
