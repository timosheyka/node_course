function multiline(strings, ...args) {
    const lines = strings.join('').split('\n');
    for (let i = 1; i < lines.length - 1; i++) {
        lines[i] = i + ' ' + lines[i] + '\n';
    }
    return lines.join('').replace(/\n$/, '');
}

const code = multiline`
function add(a, b) {
return a + b;
}
`;

console.log(code);
const text = "1 function add(a, b) {\n2 return a + b;\n3 }";
console.log(code === text);
