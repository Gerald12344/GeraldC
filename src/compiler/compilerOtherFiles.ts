import { codeGenerator } from './codeGenerators';
import { parser } from './Parse';
import { tokenizer } from './Tokeniser';

export function CompiledOtherFiles(input: string) {
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    //let newAst = transformer(ast);
    //let output = codeGenerator(newAst);
    //return output;
    return ""
}
