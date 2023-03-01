import { readFileSync, writeFileSync } from "fs";
import { parser } from "./compiler/Parse";
import { tokenizer } from "./compiler/Tokeniser";


let file = readFileSync("./input.gc", "utf-8");


let data = tokenizer(file)
let nextLevel = parser(data)
console.log(JSON.stringify(nextLevel))

writeFileSync("./output.json", JSON.stringify(nextLevel), "utf-8");