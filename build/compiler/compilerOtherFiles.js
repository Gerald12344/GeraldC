"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompiledOtherFiles = void 0;
var Parse_1 = require("./Parse");
var Tokeniser_1 = require("./Tokeniser");
function CompiledOtherFiles(input) {
    var tokens = (0, Tokeniser_1.tokenizer)(input);
    var ast = (0, Parse_1.parser)(tokens);
    //let newAst = transformer(ast);
    //let output = codeGenerator(newAst);
    //return output;
    return "";
}
exports.CompiledOtherFiles = CompiledOtherFiles;
