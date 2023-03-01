// Harvey Randall 2020-2022, Coge Generator to create the js codes

import { readFileSync } from 'fs';
import { finalAST } from '../types/maintypes';
import { CompiledOtherFiles } from './compilerOtherFiles';
import { fetchLogger } from '../utils/logger';
import { join } from 'path';

// [Tranverser] -> [Compiler] -> [Bundler/Minification]

let modules: string[] = [];
let FileDependencies: string[] = [];
let pluginDependecies: { [key: string]: boolean } = {};

export { modules, FileDependencies };

export function clearcache() {
    modules = [];
    FileDependencies = [];
    pluginDependecies = {};
}

export function codeGenerator(node: finalAST, InjectJS = false): string | finalAST | string[] {

    switch (node.type) {
        case 'Program':
            return node.body.map((e) => codeGenerator(e as finalAST)).join('\n');
        case 'ExpressionStatement':
            return codeGenerator(node.expression as finalAST);

        case 'CallExpression':
            switch (node?.callee?.name) {
                case 'add':
                    return node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(' + ') || '';
                case 'subtract':
                    return '(' + node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(' - ') + ')';
                case 'mutiply':
                    return '(' + node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(' * ') + ')';
                case 'divide':
                    return '(' + node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(' / ') + ')';
                case 'if':
                    let ifStuff = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    ifStuff?.splice(0, 1).join(',');
                    ifStuff?.forEach((e, i) => {
                        if (i + 1 === ifStuff?.length) return;
                        ifStuff[i] = e.replace('"', '').replace('"', '');
                    });
                    let lasts = ifStuff[ifStuff.length - 1];
                    ifStuff.splice(ifStuff.length - 1, 1);

                    return `if(${(node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '')}){${lasts}}`;
                case 'call':
                    let propses = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    propses.splice(0, 1).join(',');

                    return `${(node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '')}(${propses})`;
                case 'function':
                    let propss = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    propss.splice(0, 1).join(',');
                    propss.forEach((e, i) => {
                        if (i + 1 === propss.length) return;
                        propss[i] = e.replace('"', '').replace('"', '');
                    });
                    let last = propss[propss.length - 1];
                    propss.splice(propss.length - 1, 1);
                    return `function ${(node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '')}(${propss.join(',')}){${last}}`;
                case 'Arrowfunc':
                    let propsss = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    propsss.forEach((e, i) => {
                        propsss[i] = e.replace('"', '').replace('"', '');
                    });
                    propsss.splice(propsss.length - 1, 1);
                    return `(${propsss.join(',')}) => {${node?.arguments?.map((e) => codeGenerator(e as finalAST))[
                        node?.arguments?.map((e) => codeGenerator(e as finalAST))?.length - 1
                    ]
                        }}`;
                case 'selfCallingFunction':
                    let propssss = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    propssss.forEach((e, i) => {
                        propssss[i] = e.replace('"', '').replace('"', '');
                    });
                    propssss.splice(propssss.length - 1, 1);
                    return `((${propssss.join(',')}) => {${node?.arguments?.map((e) => codeGenerator(e as finalAST))[
                        node?.arguments?.map((e) => codeGenerator(e as finalAST))?.length - 1
                    ]
                        }})(${propssss.join(',')});`;
                case 'sendOut':
                    let inputs = node?.arguments?.map((e) => codeGenerator(e as finalAST))[0];
                    if ((node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[])?.length > 1) {
                        return `console.log(${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(',')})`;
                    } else {
                        return `console.log(${inputs})`;
                    }
                case 'else':
                    return `else{${node?.arguments?.map((e) => codeGenerator(e as finalAST))}}`;
                case 'promise':
                    let promiseArray = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    promiseArray.splice(0, 2);
                    return `return(new Promise((${(
                        node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string
                    )
                        .replace('"', '')
                        .replace('"', '')}, ${(node?.arguments?.map((e) => codeGenerator(e as finalAST))[1] as string)
                            .replace('"', '')
                            .replace('"', '')}) => {${promiseArray.join(';')}}))`;

                case 'iNeed':
                    modules.push((node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as unknown as string).replace(/"/g, ""));
                    return `require(${node?.arguments?.map((e) => codeGenerator(e as finalAST))})`;
                case 'iWant':
                    let data = readFileSync(
                        (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                            .replace('"', '')
                            .replace('"', ''),
                        'utf-8',
                    );
                    let response = CompiledOtherFiles(data);
                    return response;
                case 'harvscript':
                    let dataInputMain = readFileSync(
                        join(__dirname, '../../packages/harv-script/index.harvey'),
                        'utf-8',
                    );
                    return CompiledOtherFiles(dataInputMain);
                case 'async':
                    return `async ${node?.arguments?.map((e) => codeGenerator(e as finalAST))}`;
                case 'wait':
                    return `await ${node?.arguments?.map((e) => codeGenerator(e as finalAST))}`;
                case 'new':
                    return `new ${node?.arguments?.map((e) => codeGenerator(e as finalAST))}`;

                case 'letsmake':
                    let inputing = node?.arguments?.map((e) => codeGenerator(e as finalAST))[1];
                    return `let ${(node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '')} = ${inputing}`;

                case 'object':
                    if (node?.arguments?.map((e) => codeGenerator(e as finalAST))?.length === 0) {
                        return `{}`;
                    }
                    return `{${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]}: ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        }}`;
                case 'if':
                    return `if(${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]})`;
                case 'after':
                    return `.then(${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]})`;
                case 'error':
                    return `.catch(${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]})`;
                case 'reply':
                    return `return(${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]})`;
                case 'innerLoop':
                    return `{${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(';')}}`;
                case 'body':
                    return `${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(';')}`;
                case 'typeof':
                    return `typeof ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]}`;
                case 'var':
                    return (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '');
                case 'return':
                    return 'return';
                case 'ToNumber':
                    return (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '');
                case 'equal':
                    return `${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]} === ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        }`;
                case 'notequal':
                    return `!(${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]} === ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        })`;
                case 'and':
                    return `${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]} && ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        }`;
                case 'true':
                    return 'true';
                case 'false':
                    return 'false';
                case 'loop':
                    let using = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    let lastes = using[using.length - 1];
                    let variable = (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string)
                        .replace('"', '')
                        .replace('"', '');
                    return `for(let ${variable}=0;${variable}<${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        };${variable}=${variable}+${node?.arguments?.map((e) => codeGenerator(e as finalAST))[2]
                        }){${lastes}}`;
                case 'get':
                    return `document.getElementById(${node?.arguments?.map((e) => codeGenerator(e as finalAST))})`;
                case 'assign':
                    return `${node?.arguments?.map((e) => codeGenerator(e as finalAST))[0]} = ${node?.arguments?.map((e) => codeGenerator(e as finalAST))[1]
                        }`;
                case 'string':
                    return `'${node?.arguments
                        ?.map((e) => codeGenerator(e as finalAST))
                        ?.map((e) => {
                            return `${e}`.replace('/\n/g', '').replace(/\s\s+/g, ' ');
                        })}'`;
                case 'toString':
                    return '`${' + node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join('') + '}`';
                case 'array':
                    return `[${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join(',')}]`;
                case 'itterate':
                    let original = node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string;
                    let arr = node?.arguments?.map((e) => codeGenerator(e as finalAST)) as string[];
                    arr.shift();

                    return `${original}${arr.map(e => `[${e}]`).join("")}`;
                case 'concat':
                    return `${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join('')}`;
                case 'null':
                    return `null`;
                case 'throwError':
                    return `throw new Error(${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join('')})`;
                case 'delete':
                    return `delete ${node?.arguments?.map((e) => codeGenerator(e as finalAST))?.join('')}`;
                case 'package':
                    let dataIn = readFileSync(
                        join(
                            __dirname,
                            '../../../packages/harv-script',
                            '/',
                            (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string).replace('"', '') +
                            '/index.harvey'.replace('"', ''),
                        ),
                        'utf-8',
                    );
                    let response2 = CompiledOtherFiles(dataIn);
                    return response2;
                case 'pluginFetch':
                    let dataIn3 = readFileSync(
                        join(
                            __dirname,
                            '../../packages/harv-script',
                            '/',
                            (node?.arguments?.map((e) => codeGenerator(e as finalAST))[0] as string).replace(/\"/g, ''),
                        ),
                        'utf-8',
                    );
                    let response3 = CompiledOtherFiles(dataIn3);
                    return response3;
            }


        case 'Identifier':
            return node.name as string;

        case 'NameLiteral':
            return `${node.value}` as string ?? "";

        case 'NumberLiteral':
            return node.value as string;
        case 'StringLiteral':
            return "\"" + node.value as string + "\"";

        default:
            fetchLogger()?.log('error', node?.type);
            throw new Error(node?.type);
    }
}
