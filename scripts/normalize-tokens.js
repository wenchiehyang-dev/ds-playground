import fs from 'node:fs';

const raw = fs.readFileSync('tokens/figma/semantic-brand-a.tokens.json', 'utf8');
const tokens = JSON.parse(raw);

const aliasName = 
    tokens.space.control.x. $extensions['com.figma.aliasData'].targetVariableName;   // 4b 的結果：'space/16'

console.log(aliasName);

const dotted = aliasName.replaceAll("/", ".");   // 想要 'space.16'
const reference = '{' + dotted + '}';            // 想要 '{space.16}'
console.log(reference);

const token = tokens.space.control.x;   // 給這個 token 取個短名字

token.$value = reference;   // 放進你算好的 '{space.16}'（提示：你已經有一個盒子裝著它）
token.$type = 'dimension';    // 放進 'dimension'

console.log(token);